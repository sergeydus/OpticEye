import { StrictMode } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import CurvatureBlindness from './CurvatureBlindness'

const proof = 'The same smooth geometry is shown on a different background. The line shapes, positions and colors did not change.'

describe('curvature blindness experience', () => {
  it('paints exactly eight smooth rows from one master with the two specified phase clips and opaque colors', () => {
    render(<CurvatureBlindness />)
    const svg = screen.getByRole('img', { name: 'Curvature blindness illusion' })
    expect(svg).toHaveAccessibleDescription(/12 rows of identical smooth waves/)
    expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
    expect([...svg.children].map((node) => node.tagName)).toEqual(['title', 'desc', 'defs', 'rect', ...Array(12).fill('g')])
    expect(svg.querySelectorAll('path')).toHaveLength(1)
    expect(svg.querySelectorAll('clipPath')).toHaveLength(2)
    expect(svg.querySelectorAll('clipPath rect')).toHaveLength(24)
    const master = svg.querySelector('defs path')!, clips = [...svg.querySelectorAll('clipPath')]
    expect(master.getAttribute('d')!.match(/C/g)).toHaveLength(48)
    for (const [row, group] of [...svg.querySelectorAll('[data-row]')].entries()) {
      expect(group).toHaveAttribute('transform', `translate(0,${240 + (row - 11 / 2) * 48 * (2 / 3)})`)
      const uses = group.querySelectorAll('use')
      expect(uses).toHaveLength(2)
      for (const use of uses) {
        expect(use).toHaveAttribute('href', `#${master.id}`)
        expect(use).toHaveAttribute('fill', 'none')
        expect(use).toHaveAttribute('stroke-width', '4')
        expect(use).toHaveAttribute('stroke-linecap', 'butt')
        expect(use).toHaveAttribute('opacity', '1')
      }
      expect(uses[0]).toHaveAttribute('stroke', '#202020')
      expect(uses[0]).not.toHaveAttribute('clip-path')
      expect(uses[1]).toHaveAttribute('stroke', '#E0E0E0')
      expect(uses[1]).toHaveAttribute('clip-path', `url(#${clips[row % 2].id})`)
    }
    expect(svg.querySelector('polygon,polyline,line,filter,animate,mask,image,linearGradient')).toBeNull()
    expect(screen.queryByRole('slider')).toBeNull()
    expect(screen.getByRole('button', { name: 'Compare on white' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('combobox', { name: 'Curvature image size' })).toHaveValue('540')
    expect(screen.getByRole('combobox', { name: 'Wave detail' })).toHaveValue('smaller')
    expect(screen.getByText(proof)).not.toBeVisible()
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('repeated keyboard comparison changes only the same surface fill, retaining every SVG node and attribute', async () => {
    const user = userEvent.setup()
    render(<StrictMode><CurvatureBlindness /></StrictMode>)
    const svg = screen.getByRole('img'), nodes = [...svg.querySelectorAll('*')], initial = svg.outerHTML
    const toggle = screen.getByRole('button', { name: 'Compare on white' })
    for (let iteration = 0; iteration < 3; iteration++) {
      toggle.focus()
      await user.keyboard(' ')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(svg.outerHTML).toBe(initial.replace('fill="#808080"', 'fill="#FFFFFF"'))
      expect([...svg.querySelectorAll('*')].every((node, i) => node === nodes[i])).toBe(true)
      expect(screen.getAllByText(proof).some((node) => !node.hidden)).toBe(true)
      await user.keyboard('{Enter}')
      expect(toggle).toHaveAttribute('aria-pressed', 'false')
      expect(svg.outerHTML).toBe(initial)
    }
  })

  it('lets the owner compare three bounded patterns in the same frame while preserving background/disclosure state', async () => {
    const user = userEvent.setup()
    render(<CurvatureBlindness />)
    const svg = screen.getByRole('img'), surface = svg.querySelector('[data-layer="surface"]')!
    const detail = screen.getByRole('combobox', { name: 'Wave detail' })
    const toggle = screen.getByRole('button', { name: 'Compare on white' })
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    const paths = new Set<string>()
    for (const [value, count, stroke] of [['original', 8, 6], ['smaller', 12, 4], ['fine', 18, 8 / 3]] as const) {
      await user.selectOptions(detail, value)
      expect(svg.querySelectorAll('[data-row]')).toHaveLength(count)
      expect(svg.querySelectorAll('use')).toHaveLength(2 * count)
      expect(svg.querySelectorAll('clipPath rect')).toHaveLength(2 * count)
      expect(svg.querySelector('path')!.getAttribute('d')!.match(/C/g)).toHaveLength(4 * count)
      expect(svg.querySelector('use')).toHaveAttribute('stroke-width', String(stroke))
      paths.add(svg.querySelector('path')!.getAttribute('d')!)
      const before = svg.outerHTML, nodes = [...svg.querySelectorAll('*')]
      await user.click(toggle)
      expect(svg.outerHTML).toBe(before.replace('fill="#808080"', 'fill="#FFFFFF"'))
      expect([...svg.querySelectorAll('*')].every((node, i) => node === nodes[i])).toBe(true)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      await user.click(toggle)
      expect(svg.outerHTML).toBe(before)
      expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    }
    expect(paths.size).toBe(3)
    await user.click(toggle)
    await user.selectOptions(detail, 'fine')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(surface).toHaveAttribute('fill', '#FFFFFF')
    const reset = screen.getByRole('button', { name: 'Reset curvature blindness' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(detail).toHaveValue('smaller')
    expect(screen.getByRole('combobox', { name: 'Curvature image size' })).toHaveValue('540')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(svg.querySelectorAll('[data-row]')).toHaveLength(12)
  })

  it('keeps comparison independent of size/disclosure and resets every default while retaining keyboard focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<CurvatureBlindness />)
    const svg = screen.getByRole('img'), geometry = svg.querySelector('defs')!.outerHTML
    const size = screen.getByRole('combobox', { name: 'Curvature image size' })
    const toggle = screen.getByRole('button', { name: 'Compare on white' })
    const disclosure = screen.getByRole('button', { name: 'Why it happens' })
    await user.click(toggle)
    await user.click(disclosure)
    expect(screen.getByRole('link', { name: 'Kohske Takahashi — Curvature Blindness Illusion (2017)' })).toHaveAttribute('href', 'https://journals.sagepub.com/doi/10.1177/2041669517742178')
    expect(screen.getByText(/Original OpticEye drawing after/)).toBeVisible()
    expect(screen.getByText(/not a diagnostic test/)).toBeVisible()
    for (const width of ['240', '720', '540', '240']) {
      await user.selectOptions(size, width)
      expect(container.querySelector('[data-curvature-viewing-frame]')).toHaveStyle({ maxWidth: `${width}px` })
      expect(svg.querySelector('defs')!.outerHTML).toBe(geometry)
      expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(disclosure).toHaveAttribute('aria-expanded', 'true')
    }
    const reset = screen.getByRole('button', { name: 'Reset curvature blindness' })
    reset.focus()
    await user.keyboard('{Enter}')
    expect(reset).toHaveFocus()
    expect(size).toHaveValue('540')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(disclosure).toHaveAttribute('aria-expanded', 'false')
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#808080')
    expect(svg.querySelector('defs')!.outerHTML).toBe(geometry)
    expect(screen.getByText('Curvature blindness reset.')).toBeVisible()
    expect(screen.getByText(proof)).not.toBeVisible()
  })

  it('gives two instances unique local path, clip, label and description references with independent state', async () => {
    const user = userEvent.setup()
    render(<><CurvatureBlindness /><CurvatureBlindness /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Curvature blindness illusion' })
    const ids = [...document.querySelectorAll('[id]')].map((node) => node.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img')
      for (const attr of ['aria-labelledby', 'aria-describedby']) expect(article.querySelector(`[id="${svg.getAttribute(attr)}"]`)).not.toBeNull()
      for (const use of svg.querySelectorAll('use')) {
        expect(svg.querySelector(`[id="${use.getAttribute('href')!.slice(1)}"]`)).toBe(svg.querySelector('path'))
        if (use.hasAttribute('clip-path')) expect(svg.querySelector(`[id="${use.getAttribute('clip-path')!.slice(5, -1)}"]`)!.tagName).toBe('clipPath')
      }
    }
    await user.click(within(first).getByRole('button', { name: 'Compare on white' }))
    await user.selectOptions(within(first).getByRole('combobox', { name: 'Curvature image size' }), '720')
    await user.selectOptions(within(first).getByRole('combobox', { name: 'Wave detail' }), 'original')
    expect(second.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#808080')
    expect(within(second).getByRole('button', { name: 'Compare on white' })).toHaveAttribute('aria-pressed', 'false')
    expect(within(second).getByRole('combobox', { name: 'Curvature image size' })).toHaveValue('540')
    expect(within(second).getByRole('combobox', { name: 'Wave detail' })).toHaveValue('smaller')
    expect(second.querySelectorAll('use')).toHaveLength(24)
  })
})
