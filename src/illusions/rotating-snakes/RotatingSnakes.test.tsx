import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import RotatingSnakes from './RotatingSnakes'
import RotatingSnakesStimulus from './RotatingSnakesStimulus'

const ovals = (svg: Element) => [...svg.querySelectorAll<SVGEllipseElement>('[data-oval]')]
const sectors = (svg: Element) => [...svg.querySelectorAll<SVGPathElement>('[data-sector]')]
const primitives = (svg: Element) => [...svg.querySelectorAll('[data-sector],[data-oval],[data-ground],[data-layer="surface"]')]
const signature = (node: Element) => JSON.stringify([...node.attributes].filter(({ name }) => name !== 'fill').map(({ name, value }) => [name, value]))
const fills = (nodes: Element[]) => nodes.map((node) => node.getAttribute('fill'))
const change = (label: string, value: string) => fireEvent.change(screen.getByRole('combobox', { name: label }), { target: { value } })

describe('refined Rotating snakes experience', () => {
  it('starts with the accepted static field, revised defaults, paint order and visible comfort note', () => {
    const { container } = render(<RotatingSnakes />), svg = screen.getByRole('img', { name: 'Rotating snakes' })
    expect(svg).toHaveAccessibleDescription(/Fourteen stationary overlapping wheels.*eighteen concentric rings.*static drawing/)
    expect(svg).toHaveAttribute('viewBox', '0 0 720 720')
    expect(svg.querySelectorAll('[data-wheel]')).toHaveLength(14)
    expect(svg.querySelectorAll('[data-band]')).toHaveLength(252)
    expect(ovals(svg)).toHaveLength(7056)
    expect(sectors(svg)).toHaveLength(7056)
    expect(fills(ovals(svg)).slice(0, 4)).toEqual(['#0066FF','#D2D200','#0066FF','#D2D200'])
    for (const wheel of svg.querySelectorAll('[data-wheel]')) expect(wheel.firstElementChild).toHaveAttribute('data-ground')
    for (const band of svg.querySelectorAll('[data-band]')) expect([...band.children].map((node) => node.tagName)).toEqual([...Array(28).fill('path'), ...Array(28).fill('ellipse')])
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    expect(screen.getByRole('combobox', { name: 'Cycles per ring' })).toHaveValue('14')
    expect(screen.getByRole('combobox', { name: 'Pattern palette' })).toHaveValue('color')
    expect(screen.getByRole('combobox', { name: 'Snakes image size' })).toHaveValue('800')
    expect(container.querySelector('[data-snakes-viewing-frame]')).toHaveStyle({ maxWidth: '800px' })
    expect(screen.getByText('If the pattern feels uncomfortable, look away.')).toBeVisible()
    expect(screen.getByText(/The two intermediate oval colors now match/)).not.toBeVisible()
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(svg.querySelector('filter,linearGradient,radialGradient,animate,animateTransform,image')).toBeNull()
  })

  it('changes only oval fills, retaining every primitive node, non-fill attribute and fixed surface through keyboard comparison', async () => {
    const user = userEvent.setup(), { container } = render(<RotatingSnakes />), svg = screen.getByRole('img')
    const nodes = primitives(svg), geometry = nodes.map(signature), original = fills(nodes), originalOvals = ovals(svg)
    const surface = svg.querySelector('[data-layer="surface"]')!, surfaceData = surface.outerHTML
    const frame = container.querySelector('[data-snakes-viewing-frame]')!, style = frame.getAttribute('style')
    const toggle = screen.getByRole('button', { name: 'Use symmetric pattern' })
    toggle.focus(); await user.keyboard(' ')
    expect(toggle).toHaveFocus()
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(primitives(svg).every((node, i) => node === nodes[i] && signature(node) === geometry[i])).toBe(true)
    expect(ovals(svg).every((node, i) => node === originalOvals[i] && node.getAttribute('fill') === '#808080')).toBe(true)
    expect(fills(sectors(svg)).every((fill, i) => fill === (i % 2 ? '#000000' : '#FFFFFF'))).toBe(true)
    expect(surface.outerHTML).toBe(surfaceData)
    expect(frame.getAttribute('style')).toBe(style)
    expect(screen.getByText('If the pattern feels uncomfortable, look away.')).toBeVisible()
    expect(svg).toHaveAccessibleDescription(/intermediate oval classes now use matching gray/)
    await user.keyboard('{Enter}')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(fills(primitives(svg))).toEqual(original)
  }, 20000)

  it('retains hidden palette/reversal choices, and keeps count/size/disclosure independent of comparison', () => {
    const { container } = render(<RotatingSnakes />), svg = screen.getByRole('img')
    fireEvent.click(screen.getByRole('button', { name: 'Use symmetric pattern' }))
    const geometry = primitives(svg).map(signature)
    change('Pattern palette', 'gray')
    fireEvent.click(screen.getByRole('checkbox', { name: 'Reverse sequence' }))
    expect(primitives(svg).every((node, i) => signature(node) === geometry[i])).toBe(true)
    expect(ovals(svg).every((n) => n.getAttribute('fill') === '#808080')).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('link', { name: 'Michael Bach — Rotating Snakes' })).toHaveAttribute('href', 'https://michaelbach.de/ot/mot-snakes/')
    expect(screen.getByText(/not a measure of stress/)).toBeVisible()
    change('Cycles per ring', '12')
    expect(ovals(svg)).toHaveLength(6048)
    expect(sectors(svg)).toHaveLength(6048)
    expect(ovals(svg).every((n) => n.getAttribute('fill') === '#808080')).toBe(true)
    for (const size of ['240', '540', '800']) {
      change('Snakes image size', size)
      expect(container.querySelector('[data-snakes-viewing-frame]')).toHaveStyle({ maxWidth: `${size}px` })
    }
    expect(screen.getByRole('button', { name: 'Use symmetric pattern' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Use symmetric pattern' }))
    expect(fills(ovals(svg)).slice(0, 4)).toEqual(['#CCCCCC','#666666','#CCCCCC','#666666'])
    expect(svg).toHaveAccessibleDescription(/inward-facing gray ovals/)
  }, 20000)

  it('restores all local defaults and retains keyboard focus on Reset', async () => {
    const user = userEvent.setup(), { container } = render(<RotatingSnakes />)
    change('Cycles per ring', '12'); change('Pattern palette', 'gray'); change('Snakes image size', '240')
    fireEvent.click(screen.getByRole('checkbox', { name: 'Reverse sequence' }))
    fireEvent.click(screen.getByRole('button', { name: 'Use symmetric pattern' }))
    fireEvent.click(screen.getByRole('button', { name: 'Why it happens' }))
    const reset = screen.getByRole('button', { name: 'Reset rotating snakes' }); reset.focus(); await user.keyboard('{Enter}')
    expect(reset).toHaveFocus()
    expect(screen.getByRole('combobox', { name: 'Cycles per ring' })).toHaveValue('14')
    expect(screen.getByRole('combobox', { name: 'Pattern palette' })).toHaveValue('color')
    expect(screen.getByRole('combobox', { name: 'Snakes image size' })).toHaveValue('800')
    expect(screen.getByRole('checkbox', { name: 'Reverse sequence' })).not.toBeChecked()
    expect(screen.getByRole('button', { name: 'Use symmetric pattern' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(container.querySelector('[data-snakes-viewing-frame]')).toHaveStyle({ maxWidth: '800px' })
    expect(fills(ovals(screen.getByRole('img'))).slice(0, 2)).toEqual(['#0066FF','#D2D200'])
    expect(screen.getByText('Rotating snakes reset.')).toBeVisible()
  }, 20000)

  it('keeps two experiences independent and SVG/control IDs unique', () => {
    render(<><RotatingSnakes /><RotatingSnakes /></>)
    const [a, b] = screen.getAllByRole('article').map((article) => within(article))
    const ids = [...document.querySelectorAll('[id]')].map((node) => node.id)
    expect(new Set(ids).size).toBe(ids.length)
    fireEvent.click(a.getByRole('button', { name: 'Use symmetric pattern' }))
    fireEvent.change(a.getByRole('combobox', { name: 'Cycles per ring' }), { target: { value: '12' } })
    expect(ovals(a.getByRole('img'))).toHaveLength(6048)
    expect(ovals(b.getByRole('img'))).toHaveLength(7056)
    expect(b.getByRole('img')).toHaveAccessibleName('Rotating snakes')
    expect(b.getByRole('button', { name: 'Use symmetric pattern' })).toHaveAttribute('aria-pressed', 'false')
    expect(fills(ovals(b.getByRole('img'))).slice(0, 2)).toEqual(['#0066FF','#D2D200'])
  }, 20000)

  it('does not schedule application timers or animation frames while rendering or comparing', () => {
    const timeout = vi.spyOn(window, 'setTimeout'), interval = vi.spyOn(window, 'setInterval'), raf = vi.spyOn(window, 'requestAnimationFrame')
    try {
      const { unmount } = render(<RotatingSnakes />)
      fireEvent.click(screen.getByRole('button', { name: 'Use symmetric pattern' }))
      fireEvent.change(screen.getByRole('combobox', { name: 'Cycles per ring' }), { target: { value: '12' } })
      fireEvent.click(screen.getByRole('button', { name: 'Reset rotating snakes' })); unmount()
      expect(timeout).not.toHaveBeenCalled(); expect(interval).not.toHaveBeenCalled(); expect(raf).not.toHaveBeenCalled()
    } finally { timeout.mockRestore(); interval.mockRestore(); raf.mockRestore() }
  }, 20000)

  it('bounds invalid runtime props without invalid geometry or colors', () => {
    render(<RotatingSnakesStimulus cycles={NaN as never} palette={'invalid' as never} reverse={false} symmetric={false} />)
    const svg = screen.getByRole('img')
    expect(ovals(svg)).toHaveLength(7056)
    expect(fills(ovals(svg)).slice(0, 2)).toEqual(['#0066FF','#D2D200'])
    expect(svg.outerHTML).not.toMatch(/NaN|Infinity|undefined/)
  })
})
