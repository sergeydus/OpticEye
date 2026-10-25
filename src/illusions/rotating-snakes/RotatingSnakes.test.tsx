import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import RotatingSnakes from './RotatingSnakes'
import RotatingSnakesStimulus from './RotatingSnakesStimulus'

const paths = (svg: Element) => [...svg.querySelectorAll<SVGPathElement>('[data-sector]')]
const geometry = (svg: Element) => paths(svg).map((path) => [...path.attributes].filter(({ name }) => name !== 'fill').map(({ name, value }) => [name, value]))
const colors = (svg: Element) => paths(svg).map((path) => path.getAttribute('fill'))

describe('Rotating snakes experience', () => {
  it('starts static with four color wheels, Large size, a visible comfort note and no revealed answer', () => {
    const { container } = render(<RotatingSnakes />)
    const svg = screen.getByRole('img', { name: 'Rotating snakes' })
    expect(svg).toHaveAttribute('viewBox', '0 0 720 720')
    expect(svg).toHaveAccessibleDescription(/stationary wheels.*static drawing/)
    expect(paths(svg)).toHaveLength(576)
    expect(colors(svg).slice(0, 4)).toEqual(['#000000', '#0000FF', '#FFFFFF', '#FFFF00'])
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#808080')
    expect(screen.getByRole('combobox', { name: 'Cycles per ring' })).toHaveValue('12')
    expect(screen.getByRole('combobox', { name: 'Pattern palette' })).toHaveValue('color')
    expect(screen.getByRole('combobox', { name: 'Snakes image size' })).toHaveValue('720')
    expect(container.querySelector('[data-snakes-viewing-frame]')).toHaveStyle({ maxWidth: '720px' })
    expect(screen.getByRole('checkbox', { name: 'Reverse sequence' })).not.toBeChecked()
    expect(screen.getByRole('button', { name: 'Use symmetric pattern' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('If the pattern feels uncomfortable, look away.')).toBeVisible()
    expect(screen.getByText(/The two intermediate segment colors now match/)).not.toBeVisible()
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(svg.querySelector('filter,linearGradient,radialGradient,animate,animateTransform,image')).toBeNull()
  })

  it('changes only intermediate fills during keyboard comparisons and retains every original node and geometry attribute', async () => {
    const user = userEvent.setup(), { container } = render(<RotatingSnakes />)
    const svg = screen.getByRole('img'), originalNodes = paths(svg), originalGeometry = geometry(svg), originalColors = colors(svg)
    const surface = svg.querySelector('[data-layer="surface"]')!, surfaceData = surface.outerHTML
    const frame = container.querySelector('[data-snakes-viewing-frame]')!, frameStyle = frame.getAttribute('style')
    const toggle = screen.getByRole('button', { name: 'Use symmetric pattern' })
    for (let iteration = 0; iteration < 3; iteration++) {
      toggle.focus(); await user.keyboard(' ')
      expect(toggle).toHaveFocus()
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(paths(svg).every((path, i) => path === originalNodes[i])).toBe(true)
      expect(geometry(svg)).toEqual(originalGeometry)
      expect(colors(svg).every((fill, i) => i % 2 === 0 ? fill === originalColors[i] : fill === '#808080')).toBe(true)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceData)
      expect(frame.getAttribute('style')).toBe(frameStyle)
      expect(screen.getByText('If the pattern feels uncomfortable, look away.')).toBeVisible()
      expect(svg).toHaveAccessibleDescription(/two intermediate segment classes now use matching gray/)
      await user.keyboard('{Enter}')
      expect(toggle).toHaveAttribute('aria-pressed', 'false')
      expect(colors(svg)).toEqual(originalColors)
    }
  })

  it('retains palette/reversal choices in symmetric mode and keeps comparison independent of count, size and explanation', async () => {
    const user = userEvent.setup(), { container } = render(<RotatingSnakes />), svg = screen.getByRole('img')
    await user.click(screen.getByRole('button', { name: 'Use symmetric pattern' }))
    const balanced = colors(svg), originalGeometry = geometry(svg)
    await user.selectOptions(screen.getByRole('combobox', { name: 'Pattern palette' }), 'gray')
    await user.click(screen.getByRole('checkbox', { name: 'Reverse sequence' }))
    expect(colors(svg)).toEqual(balanced)
    expect(geometry(svg)).toEqual(originalGeometry)
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('link', { name: 'Michael Bach — Rotating Snakes' })).toHaveAttribute('href', 'https://michaelbach.de/ot/mot-snakes/')
    expect(screen.getByText(/not a measure of stress/)).toBeVisible()
    for (const [count, total] of [['8', 384], ['16', 768], ['12', 576]] as const) {
      await user.selectOptions(screen.getByRole('combobox', { name: 'Cycles per ring' }), count)
      expect(paths(svg)).toHaveLength(total)
      expect(new Set(colors(svg))).toEqual(new Set(['#000000', '#808080', '#FFFFFF']))
    }
    for (const size of ['240', '540', '720']) {
      await user.selectOptions(screen.getByRole('combobox', { name: 'Snakes image size' }), size)
      expect(container.querySelector('[data-snakes-viewing-frame]')).toHaveStyle({ maxWidth: `${size}px` })
      expect(screen.getByRole('button', { name: 'Use symmetric pattern' })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    }
    await user.click(screen.getByRole('button', { name: 'Use symmetric pattern' }))
    expect(colors(svg).slice(0, 4)).toEqual(['#000000', '#CCCCCC', '#FFFFFF', '#666666'])
  })

  it('restores every documented default and retains keyboard focus on Reset', async () => {
    const user = userEvent.setup(), { container } = render(<RotatingSnakes />)
    await user.selectOptions(screen.getByRole('combobox', { name: 'Cycles per ring' }), '16')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Pattern palette' }), 'gray')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Snakes image size' }), '240')
    await user.click(screen.getByRole('checkbox', { name: 'Reverse sequence' }))
    await user.click(screen.getByRole('button', { name: 'Use symmetric pattern' }))
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    const reset = screen.getByRole('button', { name: 'Reset rotating snakes' }); reset.focus(); await user.keyboard('{Enter}')
    expect(reset).toHaveFocus()
    expect(screen.getByRole('combobox', { name: 'Cycles per ring' })).toHaveValue('12')
    expect(screen.getByRole('combobox', { name: 'Pattern palette' })).toHaveValue('color')
    expect(screen.getByRole('combobox', { name: 'Snakes image size' })).toHaveValue('720')
    expect(screen.getByRole('checkbox', { name: 'Reverse sequence' })).not.toBeChecked()
    expect(screen.getByRole('button', { name: 'Use symmetric pattern' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(container.querySelector('[data-snakes-viewing-frame]')).toHaveStyle({ maxWidth: '720px' })
    expect(colors(screen.getByRole('img')).slice(0, 4)).toEqual(['#000000', '#0000FF', '#FFFFFF', '#FFFF00'])
    expect(screen.getByText('Rotating snakes reset.')).toBeVisible()
  })

  it('keeps two mounted experiences independent with unique accessible IDs', async () => {
    const user = userEvent.setup(); render(<><RotatingSnakes /><RotatingSnakes /></>)
    const articles = screen.getAllByRole('article'), first = within(articles[0]), second = within(articles[1])
    const ids = [...document.querySelectorAll('[id]')].map((node) => node.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const svg of screen.getAllByRole('img')) {
      expect(svg).toHaveAccessibleName('Rotating snakes')
      expect(svg).toHaveAccessibleDescription(/stationary wheels/)
    }
    await user.click(first.getByRole('button', { name: 'Use symmetric pattern' }))
    await user.selectOptions(first.getByRole('combobox', { name: 'Cycles per ring' }), '8')
    expect(paths(first.getByRole('img'))).toHaveLength(384)
    expect(paths(second.getByRole('img'))).toHaveLength(576)
    expect(second.getByRole('button', { name: 'Use symmetric pattern' })).toHaveAttribute('aria-pressed', 'false')
    expect(colors(second.getByRole('img')).slice(0, 4)).toEqual(['#000000', '#0000FF', '#FFFFFF', '#FFFF00'])
  })

  it('uses no application timers or animation scheduling while rendering or comparing', () => {
    const timeout = vi.spyOn(window, 'setTimeout'), interval = vi.spyOn(window, 'setInterval'), raf = vi.spyOn(window, 'requestAnimationFrame')
    try {
      const { unmount } = render(<RotatingSnakes />)
      fireEvent.click(screen.getByRole('button', { name: 'Use symmetric pattern' }))
      fireEvent.change(screen.getByRole('combobox', { name: 'Cycles per ring' }), { target: { value: '16' } })
      fireEvent.click(screen.getByRole('button', { name: 'Reset rotating snakes' }))
      unmount()
      expect(timeout).not.toHaveBeenCalled()
      expect(interval).not.toHaveBeenCalled()
      expect(raf).not.toHaveBeenCalled()
    } finally { timeout.mockRestore(); interval.mockRestore(); raf.mockRestore() }
  })

  it('bounds unsupported runtime presets without producing invalid geometry or colors', () => {
    render(<RotatingSnakesStimulus cycles={NaN as never} palette={'invalid' as never} reverse={false} symmetric={false} />)
    const svg = screen.getByRole('img')
    expect(paths(svg)).toHaveLength(576)
    expect(colors(svg).slice(0, 4)).toEqual(['#000000', '#0000FF', '#FFFFFF', '#FFFF00'])
    expect(svg.outerHTML).not.toMatch(/NaN|Infinity|undefined/)
  })
})
