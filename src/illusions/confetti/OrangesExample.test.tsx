import orangesSource from '../../assets/oranges.svg?raw'
import licenseSource from '../../assets/oranges.LICENSE.txt?raw'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Confetti from './Confetti'
import { getOrangesImage, NET_BLEND_MODE, NET_CELL_SIZE_CSS_PX, NET_COLOR, NET_LINE_WIDTH_CSS_PX, normalizeOrangesViewingWidth, ORANGES_IMAGE, ORANGES_PHOTO_URL } from './orangesModel'

function section() {
  return screen.getByRole('region', { name: 'At the produce aisle' })
}
function image() {
  return within(section()).getByRole('img')
}
function attributes(element: Element) {
  return Object.fromEntries(Array.from(element.attributes, (attribute) => [attribute.name, attribute.value]))
}

describe('Oranges source and grid construction', () => {
  it('bundles the original self-contained illustration with provenance and no baked net', () => {
    expect(new Blob([orangesSource]).size).toBeLessThanOrEqual(8192)
    const source = new DOMParser().parseFromString(orangesSource, 'image/svg+xml')
    expect(source.querySelector('parsererror, image, script, filter, line')).toBeNull()
    expect(source.documentElement.getAttribute('viewBox')).toBe('0 0 600 400')
    expect(source.querySelectorAll('use[href="#orange"]').length).toBeGreaterThanOrEqual(30)
    expect(source.querySelector('pattern circle')).not.toBeNull()
    const middle = source.querySelector('#skin stop[offset=".55"]')!.getAttribute('stop-color')!
    const [red, green, blue] = [1, 3, 5].map((offset) => parseInt(middle.slice(offset, offset + 2), 16))
    expect(green).toBeGreaterThan(red)
    expect(green).toBeGreaterThan(blue)
    expect(Math.max(red, green, blue)).toBeLessThan(180)
    for (const reference of source.querySelectorAll('[href]')) expect(reference.getAttribute('href')).toMatch(/^#/)
    expect(licenseSource).toContain('Original SVG illustration authored for OpticEye')
    expect(licenseSource).toContain('License status: No separate public license chosen.')
  })

  it('normalizes viewing sizes and falls back to Medium at the reference width', () => {
    for (const width of [240, 450, 720]) expect(normalizeOrangesViewingWidth(width)).toBe(width)
    for (const width of [0, -1, 360, 500, Infinity, NaN]) expect(normalizeOrangesViewingWidth(width)).toBe(450)
  })

  it('keeps illustration as default and safely resolves an optional local photo', () => {
    expect(getOrangesImage('illustration').src).toBe(ORANGES_IMAGE)
    expect(getOrangesImage('photo', '').id).toBe('illustration')
    expect(getOrangesImage('invalid', '/owner-photo.jpg').id).toBe('illustration')
    expect(getOrangesImage('photo', '/owner-photo.jpg')).toMatchObject({ id: 'photo', src: '/owner-photo.jpg', width: undefined, height: undefined })
  })

  it('uses one full-image square grid with fixed CSS cells and blending only on its strands', () => {
    const { container } = render(<Confetti />)
    const grid = section().querySelector('[data-layer="produce-netting"]') as HTMLElement
    expect(NET_CELL_SIZE_CSS_PX).toBe(6)
    expect(NET_LINE_WIDTH_CSS_PX).toBe(1)
    expect(NET_COLOR).toBe('rgba(245, 90, 0, 0.95)')
    expect(NET_BLEND_MODE).toBe('overlay')
    expect(grid).toHaveStyle({ backgroundSize: '6px 6px', mixBlendMode: 'overlay' })
    expect(grid.style.backgroundPosition).toBe('0px 0px')
    expect(grid.style.backgroundImage).toContain('1px')
    expect(grid.style.backgroundImage).toContain('transparent 1px')
    expect(grid.style.backgroundImage).toContain('90deg')
    expect(grid).toHaveAttribute('aria-hidden', 'true')
    expect(grid).toHaveClass('absolute', 'inset-0', 'pointer-events-none')
    expect(grid.querySelector('svg, clipPath, line')).toBeNull()
    expect(section().querySelector('[data-orange-frame]')).toHaveClass('isolate')
    expect(container.querySelectorAll('[style*="mix-blend-mode"]')).toHaveLength(1)
    expect(image().style.filter).toBe('')
    expect(image().style.mixBlendMode).toBe('')
    expect(grid.style.filter).toBe('')
    expect(grid.style.transition).toBe('')
  })
})

describe('Single-image oranges comparison', () => {
  it('starts with the illustration, one named figure and the same-image proof', () => {
    render(<Confetti />)
    expect(within(section()).getAllByRole('img')).toHaveLength(1)
    expect(screen.getByRole('figure', { name: 'Oranges with removable orange netting' })).toBeVisible()
    expect(image()).toHaveAttribute('src', ORANGES_IMAGE)
    expect(image()).toHaveAttribute('width', '600')
    expect(image()).toHaveAttribute('height', '400')
    expect(image()).toHaveAccessibleDescription('Orange netting')
    expect(screen.getByText('Both states use the same image file.')).toBeVisible()
    expect(screen.queryByRole('combobox', { name: 'Pattern' })).toBeNull()
    expect(Boolean(screen.queryByRole('combobox', { name: 'Image source' }))).toBe(Boolean(ORANGES_PHOTO_URL))
  })

  it('removes only the grid by keyboard without changing or replacing the image', async () => {
    const user = userEvent.setup()
    const { container } = render(<Confetti />)
    const original = image()
    const before = attributes(original)
    const toggle = screen.getByRole('button', { name: 'Hide netting' })
    toggle.focus()
    await user.keyboard(' ')
    expect(toggle).toHaveFocus()
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(section().querySelector('[data-layer="produce-netting"]')).toBeNull()
    expect(image()).toBe(original)
    expect(attributes(image())).toEqual(before)
    expect(image()).toHaveAccessibleDescription('Netting hidden')
    expect(container.querySelector('[data-layer="background-stripes"]')).toBeInTheDocument()
    for (let index = 0; index < 3; index++) {
      await user.click(toggle)
      expect(image()).toBe(original)
      expect(attributes(image())).toEqual(before)
    }
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(section().querySelector('[data-layer="produce-netting"]')).toBeInTheDocument()
  })

  it('resets both independent demos and retains focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<Confetti />)
    const reveal = screen.getByRole('button', { name: 'Show base colors' })
    const hide = screen.getByRole('button', { name: 'Hide netting' })
    await user.click(reveal)
    expect(section().querySelector('[data-layer="produce-netting"]')).toBeInTheDocument()
    await user.click(hide)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '8' } })
    await user.selectOptions(screen.getByRole('combobox', { name: 'Image size' }), '240')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Oranges image size' }), '720')
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    const reset = screen.getByRole('button', { name: 'Reset' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(hide).toHaveAttribute('aria-pressed', 'false')
    expect(reveal).toHaveAttribute('aria-pressed', 'false')
    expect(container.querySelector('[data-layer="background-stripes"]')).toBeInTheDocument()
    expect(section().querySelector('[data-layer="produce-netting"]')).toBeInTheDocument()
    expect(screen.getByRole('slider')).toHaveValue('3')
    expect(screen.getByRole('combobox', { name: 'Image size' })).toHaveValue('360')
    expect(screen.getByRole('combobox', { name: 'Oranges image size' })).toHaveValue('450')
    expect(image()).toHaveAttribute('src', ORANGES_IMAGE)
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps the chosen size while hidden and restores the same fixed grid on re-show', async () => {
    const user = userEvent.setup()
    render(<Confetti />)
    const before = attributes(image())
    const size = screen.getByRole('combobox', { name: 'Oranges image size' })
    const toggle = screen.getByRole('button', { name: 'Hide netting' })
    await user.click(toggle)
    for (const width of [720, 450, 240]) {
      await user.selectOptions(size, String(width))
      expect(section().querySelector('[data-orange-viewing-frame]')).toHaveStyle({ maxWidth: width + 'px' })
      expect(section().querySelector('[data-layer="produce-netting"]')).toBeNull()
      expect(attributes(image())).toEqual(before)
      expect(screen.getByRole('combobox', { name: 'Image size' })).toHaveValue('360')
      await user.click(toggle)
      expect(section().querySelector('[data-layer="produce-netting"]')).toHaveStyle({ backgroundSize: '6px 6px', mixBlendMode: 'overlay' })
      expect(attributes(image())).toEqual(before)
      expect(size).toHaveValue(String(width))
      await user.click(toggle)
    }
  })

  it('explains the strand blend honestly and opens the existing Confetti explanation', async () => {
    const user = userEvent.setup()
    render(<Confetti />)
    const explanation = screen.getByRole('button', { name: 'Why it happens' })
    const link = screen.getByRole('link', { name: 'Back to the Confetti explanation' })
    expect(link).toHaveAttribute('href', '#' + explanation.id)
    await user.click(link)
    expect(explanation).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: /Study: Perceptual/ })).toHaveAttribute('href', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11297507/')
    expect(screen.getByText(/skin between the strands is untouched/)).toBeVisible()
    expect(screen.getByText(/visual approximation, not a physical simulation/)).toBeVisible()
    expect(screen.getByText(/varies with display, size and viewer/)).toBeVisible()
  })
})
