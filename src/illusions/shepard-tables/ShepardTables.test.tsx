import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ShepardTables from './ShepardTables'

const proof = 'The tabletop drawings are the same 2D shape. One was rotated and moved onto the other without resizing.'
const tops = (svg: Element) => [...svg.querySelectorAll('[data-tabletop]')]
const attributes = (node: Element) => [...node.attributes].filter(a => a.name !== 'transform').map(a => [a.name, a.value])
const scrub = (value: number) => fireEvent.change(screen.getByRole('slider', { name: 'Comparison progress' }), { target: { value } })

beforeEach(() => {
  vi.stubGlobal('requestAnimationFrame', vi.fn(() => 1))
  vi.stubGlobal('cancelAnimationFrame', vi.fn())
})
afterEach(() => vi.unstubAllGlobals())

describe('Shepard’s tables guided comparison', () => {
  it('starts static with two opaque common-shape paths, fixed right first, above twelve furniture pieces', () => {
    render(<ShepardTables />)
    const svg = screen.getByRole('img', { name: 'Shepard’s tables' })
    expect(svg).toHaveAccessibleDescription(/Two table drawings/)
    expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
    expect([...svg.children].map(n => n.tagName)).toEqual(['title', 'desc', 'rect', 'g', 'g'])
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    expect(svg.querySelectorAll('[data-leg]')).toHaveLength(8)
    expect(svg.querySelectorAll('[data-face]')).toHaveLength(4)
    const pair = tops(svg)
    expect(pair.map(n => n.getAttribute('data-tabletop'))).toEqual(['right', 'left'])
    for (const top of pair) {
      expect(top).toHaveAttribute('d', 'M -20 -120 L 80 -120 L 20 120 L -80 120 Z')
      expect(top).toHaveAttribute('fill', '#D9A04C')
      expect(top).toHaveAttribute('stroke', '#2C2118')
      expect(top).toHaveAttribute('stroke-width', '2')
      expect(top).toHaveAttribute('stroke-linejoin', 'miter')
      expect(top).toHaveAttribute('stroke-miterlimit', '4')
      expect(top).toHaveAttribute('opacity', '1')
    }
    expect(pair[1]).toHaveAttribute('transform', 'translate(190,195)')
    expect(pair[0].getAttribute('transform')).toMatch(/^translate\(520,220\) rotate\(-104\.036/)
    expect(svg.querySelector('filter,animate,animateTransform,mask,clipPath,linearGradient,image,use')).toBeNull()
    expect(screen.getByRole('combobox')).toHaveValue('540')
    expect(screen.getByRole('slider', { name: 'Comparison progress' })).toHaveValue('0')
    expect(screen.getByRole('button', { name: 'Play comparison' })).toBeEnabled()
    expect(screen.getByText(proof)).not.toBeVisible()
    expect(requestAnimationFrame).not.toHaveBeenCalled()
  })

  it('scrubs both ways through the same paths, preserving styles, right placement, surface and frame', () => {
    render(<StrictMode><ShepardTables /></StrictMode>)
    const svg = screen.getByRole('img'), pair = tops(svg), local = pair.map(attributes)
    const right = pair[0].outerHTML, surface = svg.querySelector('[data-layer="surface"]')!
    const surfaceData = surface.outerHTML
    const context = svg.querySelector('[data-layer="context"]')!
    const contextNodes = [...context.querySelectorAll('[data-leg], [data-face]')]
    const contextData = context.outerHTML
    for (const p of [25, 50, 75, 100, 75, 50, 0, 100]) {
      scrub(p)
      expect(svg.querySelectorAll('[data-leg]')).toHaveLength(8)
      expect(svg.querySelectorAll('[data-face]')).toHaveLength(4)
      expect(tops(svg).every((node, i) => node === pair[i])).toBe(true)
      expect(pair.map(attributes)).toEqual(local)
      expect(pair[0].outerHTML).toBe(right)
      expect(svg.querySelector('[data-layer="context"]')).toBe(context)
      expect(context.outerHTML).toBe(contextData)
      expect([...context.querySelectorAll('[data-leg], [data-face]')].every((node, i) => node === contextNodes[i])).toBe(true)
      expect(svg.querySelectorAll('path')).toHaveLength(2)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceData)
      expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', `${p}% — ${p === 100 ? 'Exact fit' : p < 50 ? 'Rotate' : 'Slide'}`)
      if (p === 50) expect(pair[1].getAttribute('transform')).toBe(pair[0].getAttribute('transform')!.replace('520,220', '190,195'))
      if (p === 100) expect(pair[1].getAttribute('transform')).toBe(pair[0].getAttribute('transform'))
    }
    expect(svg).toHaveAccessibleDescription(/outlines now coincide without resizing/)
    expect(screen.getByRole('status')).toHaveTextContent(proof)
    expect(requestAnimationFrame).not.toHaveBeenCalled()
  })

  it('supports keyboard Play/Pause and stage-only live status', async () => {
    const user = userEvent.setup()
    render(<ShepardTables />)
    const play = screen.getByRole('button', { name: 'Play comparison' })
    play.focus(); await user.keyboard(' ')
    expect(play).toHaveAccessibleName('Pause comparison')
    expect(screen.getByRole('img').querySelectorAll('[data-leg]')).toHaveLength(8)
    await user.keyboard('{Enter}')
    expect(play).toHaveAccessibleName('Play comparison')
    scrub(25)
    const announcement = screen.getByRole('status').textContent
    scrub(40)
    expect(screen.getByRole('status')).toHaveTextContent(announcement!)
    scrub(60)
    expect(screen.getByRole('status')).toHaveTextContent('Slide:')
    expect(screen.getByRole('status').textContent).not.toBe(announcement)
  })

  it('Back preserves size/disclosure; size pauses without progress loss; Reset restores defaults and focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<ShepardTables />)
    const svg = screen.getByRole('img'), original = tops(svg).map(n => n.outerHTML)
    const context = svg.querySelector('[data-layer="context"]')!.outerHTML
    const size = screen.getByRole('combobox')
    scrub(75)
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('link', { name: 'Michael Bach’s rotated-tables demonstration' })).toHaveAttribute('href', 'https://michaelbach.de/ot/sze-ShepardTables/index.html')
    await user.click(screen.getByRole('button', { name: 'Continue comparison' }))
    await user.selectOptions(size, '240')
    expect(screen.getByRole('button', { name: 'Continue comparison' })).toBeEnabled()
    expect(screen.getByRole('slider')).toHaveValue('75')
    expect(container.querySelector('[data-shepard-viewing-frame]')).toHaveStyle({ maxWidth: '240px' })
    await user.click(screen.getByRole('button', { name: 'Back to tables' }))
    expect(size).toHaveValue('240')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    expect(tops(svg).map(n => n.outerHTML)).toEqual(original)
    expect(svg.querySelector('[data-layer="context"]')!.outerHTML).toBe(context)
    scrub(100)
    const reset = screen.getByRole('button', { name: 'Reset Shepard’s tables' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(size).toHaveValue('540')
    expect(screen.getByRole('slider')).toHaveValue('0')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(tops(svg).map(n => n.outerHTML)).toEqual(original)
    expect(screen.getByRole('status')).toHaveTextContent('Shepard’s tables reset.')
  })

  it('keeps instances independent with unique names, descriptions and control references', async () => {
    const user = userEvent.setup()
    render(<><ShepardTables /><ShepardTables /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Shepard’s tables' })
    const ids = [...document.querySelectorAll('[id]')].map(n => n.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img')
      for (const key of ['aria-labelledby', 'aria-describedby']) expect(document.getElementById(svg.getAttribute(key)!)).not.toBeNull()
      expect(within(article).getByRole('slider')).toHaveAccessibleName('Comparison progress')
    }
    fireEvent.change(within(first).getByRole('slider'), { target: { value: 100 } })
    await user.selectOptions(within(first).getByRole('combobox'), '240')
    expect(second.querySelectorAll('[data-leg]')).toHaveLength(8)
    expect(within(second).getByRole('slider')).toHaveValue('0')
    expect(within(second).getByRole('combobox')).toHaveValue('540')
    expect(tops(second)[1]).toHaveAttribute('transform', 'translate(190,195)')
  })

  it('replaces playback with keyboard-operable immediate match/separate under reduced motion', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    const user = userEvent.setup()
    render(<ShepardTables />)
    const svg = screen.getByRole('img'), pair = tops(svg)
    const action = screen.getByRole('button', { name: 'Match instantly' })
    action.focus(); await user.keyboard('{Enter}')
    expect(pair[1].getAttribute('transform')).toBe(pair[0].getAttribute('transform'))
    expect(action).toHaveAccessibleName('Separate tops')
    expect(screen.getByRole('slider')).toHaveValue('100')
    await user.keyboard(' ')
    expect(pair[1]).toHaveAttribute('transform', 'translate(190,195)')
    expect(svg.querySelectorAll('[data-leg]')).toHaveLength(8)
    expect(svg.querySelectorAll('[data-face]')).toHaveLength(4)
    scrub(50)
    expect(screen.getByRole('slider')).toHaveValue('50')
    expect(requestAnimationFrame).not.toHaveBeenCalled()
  })
})
