import { StrictMode } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ShepardTables from './ShepardTables'

const proof = 'The tabletop drawings are the same 2D shape. One was rotated and moved onto the other without resizing.'
const tops = (svg: Element) => [...svg.querySelectorAll('[data-tabletop]')]
const attributes = (node: Element) => [...node.attributes].filter((a) => a.name !== 'transform').map((a) => [a.name, a.value])

describe('Shepard’s tables experience', () => {
  it('starts with two shared-shape tops above twelve original context pieces, with explicit opaque styles', () => {
    render(<ShepardTables />)
    const svg = screen.getByRole('img', { name: 'Shepard’s tables' })
    expect(svg).toHaveAccessibleDescription(/Two table drawings/)
    expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
    expect([...svg.children].map((node) => node.tagName)).toEqual(['title', 'desc', 'rect', 'g', 'g'])
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    expect(svg.querySelectorAll('[data-leg]')).toHaveLength(8)
    expect(svg.querySelectorAll('[data-face]')).toHaveLength(4)
    expect(svg.querySelectorAll('path')).toHaveLength(2)
    const pair = tops(svg)
    expect(pair).toHaveLength(2)
    expect(pair[0].getAttribute('d')).toBe(pair[1].getAttribute('d'))
    for (const top of pair) {
      expect(top).toHaveAttribute('d', 'M -20 -120 L 80 -120 L 20 120 L -80 120 Z')
      expect(top).toHaveAttribute('fill', '#D9A04C')
      expect(top).toHaveAttribute('stroke', '#2C2118')
      expect(top).toHaveAttribute('stroke-width', '2')
      expect(top).toHaveAttribute('stroke-linejoin', 'miter')
      expect(top).toHaveAttribute('stroke-miterlimit', '4')
      expect(top).toHaveAttribute('opacity', '1')
    }
    expect(pair[0]).toHaveAttribute('transform', 'translate(190,195)')
    expect(pair[1].getAttribute('transform')).toMatch(/^translate\(520,220\) rotate\(-104\.036/)
    expect(svg.querySelector('filter,animate,animateTransform,mask,clipPath,linearGradient,image,use')).toBeNull()
    expect(screen.getByRole('combobox', { name: 'Shepard’s tables image size' })).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Overlay tabletops' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.queryByRole('slider')).toBeNull()
    expect(screen.getByText(proof)).not.toBeVisible()
  })

  it('statically moves only the existing left top onto the fixed right and removes context through repeated keyboard comparisons', async () => {
    const user = userEvent.setup()
    render(<StrictMode><ShepardTables /></StrictMode>)
    const svg = screen.getByRole('img'), pair = tops(svg), local = pair.map(attributes)
    const original = pair.map((n) => n.outerHTML)
    const surface = svg.querySelector('[data-layer="surface"]')!, surfaceData = surface.outerHTML
    const context = svg.querySelector('[data-layer="context"]')!.outerHTML
    const toggle = screen.getByRole('button', { name: 'Overlay tabletops' })
    for (let i = 0; i < 3; i++) {
      toggle.focus(); await user.keyboard(' ')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(svg.querySelector('[data-layer="context"]')).toBeNull()
      expect(tops(svg)).toEqual(pair)
      expect(tops(svg).every((node, j) => node === pair[j])).toBe(true)
      expect(pair.map(attributes)).toEqual(local)
      expect(pair[0].getAttribute('transform')).toBe(pair[1].getAttribute('transform'))
      expect(pair[1].outerHTML).toBe(original[1])
      expect(svg.querySelectorAll('path')).toHaveLength(2)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceData)
      expect(svg).toHaveAccessibleDescription(/same left tabletop path has been rotated and moved/)
      await user.keyboard('{Enter}')
      expect(toggle).toHaveAttribute('aria-pressed', 'false')
      expect(pair.map((n) => n.outerHTML)).toEqual(original)
      expect(svg.querySelector('[data-layer="context"]')!.outerHTML).toBe(context)
    }
  })

  it('keeps size/disclosure independent and resets the initial context and both placements without moving focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<ShepardTables />)
    const svg = screen.getByRole('img'), pair = tops(svg), original = pair.map((n) => n.outerHTML)
    const size = screen.getByRole('combobox', { name: 'Shepard’s tables image size' })
    const toggle = screen.getByRole('button', { name: 'Overlay tabletops' })
    await user.click(toggle)
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('link', { name: 'Michael Bach’s rotated-tables demonstration' })).toHaveAttribute('href', 'https://michaelbach.de/ot/sze-ShepardTables/index.html')
    for (const width of ['240', '720', '540']) {
      await user.selectOptions(size, width)
      expect(container.querySelector('[data-shepard-viewing-frame]')).toHaveStyle({ maxWidth: `${width}px` })
      expect(svg.querySelector('[data-layer="context"]')).toBeNull()
      expect(pair[0].getAttribute('transform')).toBe(pair[1].getAttribute('transform'))
      expect(pair[1].outerHTML).toBe(original[1])
      expect(pair).toEqual(tops(svg))
    }
    await user.selectOptions(size, '240')
    const reset = screen.getByRole('button', { name: 'Reset Shepard’s tables' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(size).toHaveValue('540')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(pair.map((n) => n.outerHTML)).toEqual(original)
    expect(svg.querySelectorAll('[data-leg]')).toHaveLength(8)
    expect(svg.querySelectorAll('[data-face]')).toHaveLength(4)
    expect(screen.getByText('Shepard’s tables reset.')).toBeVisible()
  })

  it('keeps instances independent with unique names, descriptions and label references', async () => {
    const user = userEvent.setup()
    render(<><ShepardTables /><ShepardTables /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Shepard’s tables' })
    const ids = [...document.querySelectorAll('[id]')].map((node) => node.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img')
      for (const key of ['aria-labelledby', 'aria-describedby']) expect(document.getElementById(svg.getAttribute(key)!)).not.toBeNull()
      expect(within(article).getByRole('combobox')).toHaveAccessibleName('Shepard’s tables image size')
    }
    await user.click(within(first).getByRole('button', { name: 'Overlay tabletops' }))
    await user.selectOptions(within(first).getByRole('combobox'), '240')
    expect(second.querySelectorAll('[data-leg]')).toHaveLength(8)
    expect(within(second).getByRole('button', { name: 'Overlay tabletops' })).toHaveAttribute('aria-pressed', 'false')
    expect(within(second).getByRole('combobox')).toHaveValue('540')
    expect(tops(second)[0]).toHaveAttribute('transform', 'translate(190,195)')
  })
})
