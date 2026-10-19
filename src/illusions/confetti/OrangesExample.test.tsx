import orangesSource from '../../assets/oranges.svg?raw'
import licenseSource from '../../assets/oranges.LICENSE.txt?raw'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Confetti from './Confetti'
import ProduceNetting from './ProduceNetting'
import { createNetLines, FRUIT_BODY_PATH, FRUIT_TRANSFORMS, NET_COLOR, NET_LINE_WIDTH, NET_MESH_SPACING, NET_MIN_STROKE_CSS_PX, normalizeOrangesViewingWidth, ORANGES_IMAGE } from './orangesModel'

function images() {
  return within(screen.getByRole('region', { name: 'At the produce aisle' })).getAllByRole('img')
}

function attributes(element: Element) {
  return Object.fromEntries(Array.from(element.attributes, (attribute) => [attribute.name, attribute.value]))
}

describe('Produce-netting construction', () => {
  it('generates the same bounded, evenly spaced diamond mesh on repeated calls', () => {
    const lines = createNetLines()
    expect(lines).toEqual(createNetLines())
    expect(lines).toHaveLength(128)
    expect(new Set(lines.map((line) => line.id)).size).toBe(lines.length)
    for (const line of lines) {
      expect(line.y1).toBe(0)
      expect(line.y2).toBe(400)
      expect(Math.abs(line.x2 - line.x1)).toBe(400)
      expect([line.x1, line.x2].every(Number.isFinite)).toBe(true)
      expect(Math.min(line.x1, line.x2)).toBeGreaterThanOrEqual(-400)
      expect(Math.max(line.x1, line.x2)).toBeLessThanOrEqual(1024)
    }
    const ascending = lines.filter((line) => line.x2 > line.x1)
    for (let index = 1; index < ascending.length; index++) {
      expect(ascending[index].x1 - ascending[index - 1].x1).toBe(16)
    }
  })

  it('bundles a small original SVG without embedded netting, scripts, filters, or external assets', () => {
    expect(new Blob([orangesSource]).size).toBeLessThanOrEqual(8192)
    const document = new DOMParser().parseFromString(orangesSource, 'image/svg+xml')
    expect(document.querySelector('parsererror')).toBeNull()
    expect(document.documentElement.getAttribute('viewBox')).toBe('0 0 600 400')
    expect(document.querySelector('image, script, filter, line')).toBeNull()
    expect(document.querySelector(`[stroke="${NET_COLOR}"]`)).toBeNull()
    for (const reference of document.querySelectorAll('[href]')) {
      expect(reference.getAttribute('href')).toMatch(/^#/)
    }
    expect(licenseSource).toContain('License status: No separate public license chosen.')
    expect(licenseSource).not.toContain('SPDX-License-Identifier: CC0-1.0')
    expect(licenseSource).toContain('Original SVG illustration authored for OpticEye')
  })

  it('keeps visible strokes and open cells at the supported display sizes', () => {
    for (const width of [138, 240, 360, 538, 720]) {
      const scale = width / 600
      const strokeWidth = Math.max(NET_MIN_STROKE_CSS_PX, NET_LINE_WIDTH * scale)
      const clearOpening = NET_MESH_SPACING * scale / Math.sqrt(2) - strokeWidth
      expect(strokeWidth).toBeGreaterThanOrEqual(1.5)
      expect(clearOpening).toBeGreaterThanOrEqual(1)
    }
  })

  it('accepts only supported orange viewing sizes and falls back to Compact', () => {
    for (const width of [240, 360, 720]) expect(normalizeOrangesViewingWidth(width)).toBe(width)
    for (const width of [0, -1, 500, Infinity, NaN]) expect(normalizeOrangesViewingWidth(width)).toBe(240)
  })

  it('clips every instance to the exact fruit bodies and transforms of the shared illustration', () => {
    const source = new DOMParser().parseFromString(orangesSource, 'image/svg+xml')
    expect(source.querySelector('#orange > path')!.getAttribute('d')).toBe(FRUIT_BODY_PATH)
    expect(Array.from(source.querySelectorAll('use'), (node) => node.getAttribute('transform'))).toEqual([...FRUIT_TRANSFORMS])
    const { container } = render(<><ProduceNetting /><ProduceNetting /></>)
    const clips = Array.from(container.querySelectorAll('clipPath'))
    expect(clips).toHaveLength(2)
    expect(clips[0].id).not.toBe(clips[1].id)
    for (const overlay of container.querySelectorAll('[data-layer="produce-netting"]')) {
      const clip = overlay.querySelector('clipPath')!
      expect(overlay.querySelector('g')).toHaveAttribute('clip-path', `url(#${clip.id})`)
      const paths = Array.from(clip.querySelectorAll('path'))
      expect(paths).toHaveLength(6)
      expect(paths.map((path) => path.getAttribute('transform'))).toEqual([...FRUIT_TRANSFORMS])
      expect(paths.every((path) => path.getAttribute('d') === FRUIT_BODY_PATH)).toBe(true)
    }
  })
})

describe('Everyday oranges comparison', () => {
  it('uses the identical local image in both named views and puts the separate mesh on the left only', () => {
    render(<Confetti />)
    const [leftImage, rightImage] = images()
    expect(leftImage).toHaveAttribute('src', ORANGES_IMAGE)
    expect(rightImage).toHaveAttribute('src', leftImage.getAttribute('src'))
    expect(leftImage).toHaveAttribute('width', '600')
    expect(rightImage).toHaveAttribute('height', '400')
    expect(leftImage).toHaveAccessibleDescription('Orange fine mesh')
    expect(rightImage).toHaveAccessibleDescription('No netting')
    const left = screen.getByRole('figure', { name: 'Greenish oranges with removable orange netting' })
    const right = screen.getByRole('figure', { name: 'Greenish oranges without netting' })
    const overlay = left.querySelector('[data-layer="produce-netting"]')!
    expect(overlay).toHaveAttribute('stroke', '#F27A18')
    expect(overlay).toHaveAttribute('stroke-width', '3')
    expect(overlay.getAttribute('style')).toContain('max(1.5px,')
    expect(overlay).toHaveAttribute('aria-hidden', 'true')
    expect(overlay.querySelectorAll('line')).toHaveLength(128)
    expect(Array.from(overlay.querySelectorAll('line')).every((line) => line.getAttribute('vector-effect') === 'non-scaling-stroke')).toBe(true)
    expect(right.querySelector('svg')).toBeNull()
    expect(screen.getByText('Both copies use the identical image file.')).toBeVisible()
    expect(screen.queryByRole('combobox', { name: 'Pattern' })).toBeNull()
  })

  it('removes only the overlay with keyboard input and preserves every image attribute through repeated toggles', async () => {
    const user = userEvent.setup()
    const { container } = render(<Confetti />)
    const before = images().map(attributes)
    const toggle = screen.getByRole('button', { name: 'Hide netting' })
    toggle.focus()
    await user.keyboard(' ')
    expect(toggle).toHaveFocus()
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(container.querySelector('[data-layer="produce-netting"]')).toBeNull()
    expect(images().map(attributes)).toEqual(before)
    expect(images()[0]).toHaveAccessibleDescription('Netting hidden')
    expect(container.querySelector('[data-layer="background-stripes"]')).toBeInTheDocument()
    for (let index = 0; index < 3; index++) {
      await user.click(toggle)
      expect(images().map(attributes)).toEqual(before)
    }
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(container.querySelector('[data-layer="produce-netting"]')).toBeInTheDocument()
  })

  it('keeps both reveals independent and restores both demos through the shared Reset', async () => {
    const user = userEvent.setup()
    const { container } = render(<Confetti />)
    const hideNetting = screen.getByRole('button', { name: 'Hide netting' })
    const revealColors = screen.getByRole('button', { name: 'Show base colors' })
    await user.click(revealColors)
    expect(container.querySelector('[data-layer="produce-netting"]')).toBeInTheDocument()
    await user.click(hideNetting)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '8' } })
    await user.selectOptions(screen.getByRole('combobox', { name: 'Image size' }), '240')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Oranges image size' }), '720')
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(revealColors).toHaveAttribute('aria-pressed', 'true')
    const reset = screen.getByRole('button', { name: 'Reset' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(hideNetting).toHaveAttribute('aria-pressed', 'false')
    expect(revealColors).toHaveAttribute('aria-pressed', 'false')
    expect(container.querySelector('[data-layer="produce-netting"]')).toBeInTheDocument()
    expect(container.querySelector('[data-layer="background-stripes"]')).toBeInTheDocument()
    expect(screen.getByRole('slider')).toHaveValue('3')
    expect(screen.getByRole('combobox', { name: 'Image size' })).toHaveValue('360')
    expect(screen.getByRole('combobox', { name: 'Oranges image size' })).toHaveValue('240')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens the existing explanation through its in-page link and includes source/license information', async () => {
    const user = userEvent.setup()
    render(<Confetti />)
    const explanation = screen.getByRole('button', { name: 'Why it happens' })
    const link = screen.getByRole('link', { name: 'Back to the Confetti explanation' })
    expect(link).toHaveAttribute('href', `#${explanation.id}`)
    await user.click(link)
    expect(explanation).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: /Study: Perceptual/ })).toHaveAttribute('href', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11297507/')
    expect(screen.queryByRole('link', { name: /CC0/ })).toBeNull()
    expect(screen.getByText(/deliberately illustrated as greenish and unripe/)).toBeVisible()
    expect(screen.getByText(/varies with display and viewer/)).toBeVisible()
  })

  it('sizes both views together while retaining hidden state, image attributes, and circle settings', async () => {
    const user = userEvent.setup()
    const { container } = render(<Confetti />)
    const before = images().map(attributes)
    const selector = screen.getByRole('combobox', { name: 'Oranges image size' })
    const toggle = screen.getByRole('button', { name: 'Hide netting' })
    await user.click(toggle)
    for (const width of [720, 360, 240]) {
      await user.selectOptions(selector, String(width))
      expect(container.querySelector('[data-orange-comparison]')).toHaveStyle({ maxWidth: `${2 * width + 12}px` })
      expect(container.querySelector('[data-layer="produce-netting"]')).toBeNull()
      expect(images().map(attributes)).toEqual(before)
      expect(screen.getByRole('combobox', { name: 'Image size' })).toHaveValue('360')
      await user.click(toggle)
      expect(container.querySelector('[data-layer="produce-netting"]')!.querySelectorAll('line')).toHaveLength(128)
      expect(selector).toHaveValue(String(width))
      expect(images().map(attributes)).toEqual(before)
      await user.click(toggle)
    }
  })
})
