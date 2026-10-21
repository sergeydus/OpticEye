import { StrictMode } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import CheckerShadow from './CheckerShadow'

const targets = (svg: Element) => [...svg.querySelectorAll('[data-layer="targets"] polygon')]
const markup = (nodes: Element[]) => nodes.map((node) => node.outerHTML)
const proof = 'A and B use the same RGB value: #707070. Only the scene was removed.'

describe('checker-shadow experience', () => {
  it('starts with a complete original scene, flat equal target fills and an undisclosed answer', () => {
    render(<CheckerShadow />)
    const svg = screen.getByRole('img', { name: 'Checker-shadow illusion' })
    expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
    expect(svg).toHaveAccessibleDescription(/Compare their apparent shades/)
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#B8B8B8')
    expect(svg.querySelectorAll('[data-layer="context-tiles"] polygon')).toHaveLength(23)
    expect(svg.querySelector('[data-tile="0-0"], [data-tile="2-3"]')).toBeNull()
    expect(svg.querySelectorAll('[data-layer="board-faces"] polygon')).toHaveLength(2)
    expect(svg.querySelector('[data-layer="cylinder"] path')).toHaveAttribute('d', 'M435.2 89.6 L435.2 181.6 A30 12 0 0 0 495.2 181.6 L495.2 89.6 Z')
    expect(svg.querySelector('[data-layer="cylinder"] ellipse')).toHaveAttribute('cy', '89.6')
    const pair = targets(svg)
    expect(pair).toHaveLength(2)
    expect(pair.map((n) => n.getAttribute('points'))).toEqual(['90,120 170,120 198,164 118,164', '334,252 414,252 442,296 362,296'])
    for (const target of pair) expect(target).toHaveAttribute('fill', '#707070')
    expect(svg.querySelector('[data-layer="targets"]')).toHaveAttribute('opacity', '1')
    expect(svg.querySelector('[data-layer="targets"]')).toHaveAttribute('stroke', 'none')
    expect([...svg.querySelectorAll('[data-layer="labels"] text')].map((n) => [n.textContent, n.getAttribute('x'), n.getAttribute('y')])).toEqual([['A', '80', '149'], ['B', '324', '281']])
    expect(screen.getByRole('combobox', { name: 'Checker-shadow image size' })).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Isolate tiles' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText(proof)).not.toBeVisible()
    expect(screen.queryByRole('slider')).toBeNull()
  })

  it('confines opaque gradients to the removable context, with the specified transforms and stops', () => {
    render(<CheckerShadow />)
    const svg = screen.getByRole('img'), context = svg.querySelector('[data-layer="context"]')!
    const gradients = [...context.querySelectorAll('radialGradient')]
    expect(gradients).toHaveLength(2)
    for (const gradient of gradients) {
      expect(gradient).toHaveAttribute('gradientUnits', 'userSpaceOnUse')
      expect(gradient).toHaveAttribute('gradientTransform', 'matrix(192 0 53.2 83.6 440.8 256.4)')
      expect(gradient).toHaveAttribute('color-interpolation', 'sRGB')
      expect([...gradient.children].map((n) => n.getAttribute('offset'))).toEqual(['0', '0.8', '1'])
    }
    expect(gradients.map((g) => [...g.children].map((n) => n.getAttribute('stop-color')))).toEqual([['#383838', '#383838', '#707070'], ['#707070', '#707070', '#E0E0E0']])
    expect(context.querySelectorAll('linearGradient')).toHaveLength(1)
    for (const stop of context.querySelectorAll('stop')) expect(stop).toHaveAttribute('stop-opacity', '1')
    for (const node of svg.querySelectorAll('[fill^="url("]')) expect(context.contains(node)).toBe(true)
    expect(svg.querySelector('filter,mask,clipPath,image,animate,[transform],[style]')).toBeNull()
  })

  it('isolates only context through repeated keyboard toggles, retaining targets, labels and surface nodes', async () => {
    const user = userEvent.setup()
    render(<StrictMode><CheckerShadow /></StrictMode>)
    const svg = screen.getByRole('img'), pair = targets(svg), original = markup(pair)
    const surface = svg.querySelector('[data-layer="surface"]')!, labels = svg.querySelector('[data-layer="labels"]')!, labelData = labels.outerHTML
    const contextData = svg.querySelector('[data-layer="context"]')!.outerHTML
    const toggle = screen.getByRole('button', { name: 'Isolate tiles' })
    for (let k = 0; k < 3; k++) {
      toggle.focus()
      await user.keyboard(' ')
      expect(toggle).toHaveFocus()
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(svg.querySelector('[data-layer="context"]')).toBeNull()
      expect(svg.querySelector('defs,radialGradient,linearGradient,path,ellipse')).toBeNull()
      expect(targets(svg).every((node, j) => node === pair[j])).toBe(true)
      expect(markup(targets(svg))).toEqual(original)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(svg.querySelector('[data-layer="labels"]')).toBe(labels)
      expect(labels.outerHTML).toBe(labelData)
      expect(svg).toHaveAccessibleDescription(/both flat #707070/)
      await user.keyboard('{Enter}')
      expect(svg.querySelector('[data-layer="context"]')!.outerHTML).toBe(contextData)
    }
  })

  it('scales uniformly, keeps disclosure independent and restores all defaults without moving Reset focus', async () => {
    const user = userEvent.setup(), { container } = render(<CheckerShadow />)
    const svg = screen.getByRole('img'), original = svg.outerHTML
    const size = screen.getByRole('combobox'), toggle = screen.getByRole('button', { name: 'Isolate tiles' })
    for (const width of ['240', '720']) {
      await user.selectOptions(size, width)
      expect(container.querySelector('[data-checker-shadow-viewing-frame]')).toHaveStyle({ maxWidth: `${width}px` })
      expect(svg.outerHTML).toBe(original)
    }
    await user.click(toggle)
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: "Michael Bach's checker-shadow demonstration" })).toHaveAttribute('href', 'https://michaelbach.de/ot/lum-adelsonCheckShadow/index.html')
    expect(screen.getByRole('link', { name: 'Adelson (1993)' })).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/8266102/')
    expect(screen.getByText(/not a physical lighting simulation/)).toBeVisible()
    const reset = screen.getByRole('button', { name: 'Reset checker-shadow' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(size).toHaveValue('540')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(svg.outerHTML).toBe(original)
    expect(screen.getByText('Checker-shadow experiment reset.')).toBeVisible()
  })

  it('keeps multiple instances independent with unique gradient/name/control references', async () => {
    const user = userEvent.setup()
    render(<><CheckerShadow /><CheckerShadow /></>)
    const [first, second] = screen.getAllByRole('article'), ids = [...document.querySelectorAll('[id]')].map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img')
      for (const attr of ['aria-labelledby', 'aria-describedby']) expect(document.getElementById(svg.getAttribute(attr)!)).not.toBeNull()
      for (const node of svg.querySelectorAll('[fill^="url("]')) {
        const ref = node.getAttribute('fill')!.slice(5, -1)
        expect(svg.querySelectorAll('[id]').length).toBeGreaterThan(0)
        expect(svg.contains(document.getElementById(ref))).toBe(true)
      }
    }
    await user.click(within(first).getByRole('button', { name: 'Isolate tiles' }))
    await user.selectOptions(within(first).getByRole('combobox'), '240')
    expect(second.querySelectorAll('[data-layer="context-tiles"] polygon')).toHaveLength(23)
    expect(within(second).getByRole('combobox')).toHaveValue('540')
  })
})
