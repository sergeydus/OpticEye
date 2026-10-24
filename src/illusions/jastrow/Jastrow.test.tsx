import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Jastrow from './Jastrow'

const bands = (svg: Element) => [...svg.querySelectorAll('[data-band]')]
const localAttributes = (node: Element) => [...node.attributes].filter(a => a.name !== 'transform').map(a => [a.name, a.value])
const scrub = (value: number) => fireEvent.change(screen.getByRole('slider', { name: 'Comparison progress' }), { target: { value } })
beforeEach(() => { vi.stubGlobal('requestAnimationFrame', vi.fn(() => 1)); vi.stubGlobal('cancelAnimationFrame', vi.fn()) })
afterEach(() => vi.unstubAllGlobals())

describe('Jastrow guided comparison', () => {
  it('starts static with two opaque copies of one sector, no extra proof drawing or initial answer', () => {
    render(<Jastrow />)
    const svg = screen.getByRole('img', { name: 'Jastrow illusion' }), pair = bands(svg)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Jastrow illusion')
    expect(screen.getByText('Which curved band looks larger?')).toBeVisible()
    expect(svg).toHaveAccessibleDescription(/Two golden-orange curved bands/)
    expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
    expect(pair.map(n => n.getAttribute('data-band'))).toEqual(['upper', 'lower'])
    expect(pair[0].getAttribute('d')).toBe(pair[1].getAttribute('d'))
    for (const band of pair) { expect(band).toHaveAttribute('fill', '#E6A547'); expect(band).toHaveAttribute('stroke', 'none'); expect(band).toHaveAttribute('opacity', '1') }
    expect(pair[0]).toHaveAttribute('transform', 'translate(315,410)')
    expect(pair[1].getAttribute('transform')).toMatch(/^translate\(366\.423008774923/)
    expect(svg.querySelectorAll('path')).toHaveLength(2)
    expect(svg.querySelectorAll('rect')).toHaveLength(1)
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    expect(svg.querySelector('filter,animate,animateTransform,mask,clipPath,linearGradient,image,use,line,polygon')).toBeNull()
    expect(screen.getByRole('combobox')).toHaveValue('540')
    expect(screen.getByRole('slider')).toHaveValue('0')
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    expect(requestAnimationFrame).not.toHaveBeenCalled()
  })

  it('scrubs forward/backward without changing local shapes, colors, fixed upper path, surface or frame', () => {
    render(<StrictMode><Jastrow /></StrictMode>)
    const svg = screen.getByRole('img'), pair = bands(svg), local = pair.map(localAttributes)
    const upper = pair[0].outerHTML, surface = svg.querySelector('[data-layer="surface"]')!, surfaceData = surface.outerHTML
    for (const progress of [1, 25, 50, 75, 100, 50, 0, 100]) {
      scrub(progress)
      expect(bands(svg).every((node, i) => node === pair[i])).toBe(true)
      expect(pair.map(localAttributes)).toEqual(local)
      expect(pair[0].outerHTML).toBe(upper)
      expect(pair[1].getAttribute('transform')).toMatch(/^translate\([^,]+,[^)]+\)$/)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceData)
      expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
      expect(svg.querySelectorAll('path')).toHaveLength(2)
      if (progress === 100) expect(pair[1].getAttribute('transform')).toBe(pair[0].getAttribute('transform'))
      if (progress === 50) expect(pair[1]).toHaveAttribute('transform', `translate(${315 + 40 * Math.sin(40 * Math.PI / 180)},472)`)
    }
    expect(svg).toHaveAccessibleDescription(/outlines coincide exactly without rotation or resizing/)
    expect(screen.getByRole('status')).toHaveTextContent('The lower band was moved onto the upper one without resizing.')
    expect(requestAnimationFrame).not.toHaveBeenCalled()
  })

  it('supports keyboard Play/Pause and announces only the slide and exact-fit stages', async () => {
    const user = userEvent.setup(); render(<Jastrow />)
    const play = screen.getByRole('button', { name: 'Play comparison' })
    play.focus(); await user.keyboard(' ')
    expect(play).toHaveAccessibleName('Pause comparison')
    await user.keyboard('{Enter}')
    expect(play).toHaveAccessibleName('Play comparison')
    scrub(25); const message = screen.getByRole('status').textContent
    scrub(75); expect(screen.getByRole('status').textContent).toBe(message)
    scrub(100); expect(screen.getByRole('status').textContent).not.toBe(message)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '100% — Exact fit')
  })

  it('preserves size/disclosure on Back, pauses on size change, and resets during playback with focus retained', async () => {
    const user = userEvent.setup(); const { container } = render(<Jastrow />)
    const svg = screen.getByRole('img'), pair = bands(svg), original = pair.map(n => n.outerHTML)
    const size = screen.getByRole('combobox'), disclosure = screen.getByRole('button', { name: 'Why it happens' })
    scrub(60); await user.click(disclosure)
    expect(screen.getByRole('link', { name: 'Michael Bach’s Jastrow demonstration' })).toHaveAttribute('href', 'https://michaelbach.de/ot/geom-Jastrow/index.html')
    await user.click(screen.getByRole('button', { name: 'Continue comparison' }))
    await user.selectOptions(size, '240')
    expect(screen.getByRole('button', { name: 'Continue comparison' })).toBeEnabled()
    expect(screen.getByRole('slider')).toHaveValue('60')
    expect(container.querySelector('[data-jastrow-viewing-frame]')).toHaveStyle({ maxWidth: '240px' })
    await user.click(screen.getByRole('button', { name: 'Back to bands' }))
    expect(size).toHaveValue('240'); expect(disclosure).toHaveAttribute('aria-expanded', 'true')
    expect(pair.map(n => n.outerHTML)).toEqual(original)
    await user.click(screen.getByRole('button', { name: 'Play comparison' }))
    const reset = screen.getByRole('button', { name: 'Reset Jastrow' }); await user.click(reset)
    expect(reset).toHaveFocus(); expect(size).toHaveValue('540'); expect(disclosure).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('slider')).toHaveValue('0'); expect(pair.map(n => n.outerHTML)).toEqual(original)
    expect(screen.getByRole('status')).toHaveTextContent('Jastrow reset.')
    expect(cancelAnimationFrame).toHaveBeenCalled()
  })

  it('uses instant match/separate with reduced motion while retaining manual progress', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    const user = userEvent.setup(); render(<Jastrow />)
    const pair = bands(screen.getByRole('img')), action = screen.getByRole('button', { name: 'Match instantly' })
    action.focus(); await user.keyboard('{Enter}')
    expect(pair[1].getAttribute('transform')).toBe(pair[0].getAttribute('transform'))
    expect(action).toHaveAccessibleName('Separate bands')
    await user.keyboard(' '); expect(screen.getByRole('slider')).toHaveValue('0')
    scrub(40); expect(screen.getByRole('slider')).toHaveValue('40')
    expect(requestAnimationFrame).not.toHaveBeenCalled()
  })

  it('keeps local state independent and every label/name/description ID unique across two instances', async () => {
    const user = userEvent.setup(); render(<><Jastrow /><Jastrow /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Jastrow illusion' })
    const ids = [...document.querySelectorAll('[id]')].map(n => n.id); expect(new Set(ids).size).toBe(ids.length)
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img')
      for (const key of ['aria-labelledby', 'aria-describedby']) expect(document.getElementById(svg.getAttribute(key)!)).not.toBeNull()
      expect(within(article).getByRole('slider')).toHaveAccessibleName('Comparison progress')
    }
    fireEvent.change(within(first).getByRole('slider'), { target: { value: 100 } })
    await user.selectOptions(within(first).getByRole('combobox'), '240')
    expect(within(second).getByRole('slider')).toHaveValue('0')
    expect(within(second).getByRole('combobox')).toHaveValue('540')
    expect(bands(second)[1].getAttribute('transform')).not.toBe(bands(second)[0].getAttribute('transform'))
  })
})
