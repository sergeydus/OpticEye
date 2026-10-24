import { StrictMode } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import VanishingDots from './VanishingDots'

const proof = 'Twelve black dots are drawn in both states. Only the gray lattice was removed.'

function getLatticeClip(svg: Element) {
  const lattice = svg.querySelector('[data-layer="lattice"]')!
  const clipReference = lattice.getAttribute('clip-path')
  expect(clipReference).toMatch(/^url\(#[^)]+\)$/)
  const clipId = clipReference!.slice(5, -1)
  const clip = [...svg.querySelectorAll('clipPath')].find((node) => node.id === clipId)!
  expect(clip).toBeDefined()
  expect(clip).toHaveAttribute('clipPathUnits', 'userSpaceOnUse')
  expect(clip.children).toHaveLength(1)
  const rect = clip.querySelector('rect')!
  for (const [attribute, value] of Object.entries({ x: '0', y: '0', width: '784', height: '560' })) expect(rect).toHaveAttribute(attribute, value)
  return clip
}

describe('vanishing dots experience', () => {
  it('starts with 166 clipped gray segments and twelve unchanged white-rim/black-dot pairs on a slightly gray surface', () => {
    render(<VanishingDots />)
    const svg = screen.getByRole('img', { name: 'Vanishing dots' })
    expect(svg).toHaveAttribute('viewBox', '0 0 784 560')
    expect(svg).toHaveAccessibleDescription(/Twelve black dots with white rims at plus-crossings/)
    const lattice = svg.querySelector('[data-layer="lattice"]')!
    expect(lattice).toHaveAttribute('stroke', '#808080')
    expect(lattice).toHaveAttribute('stroke-width', '8')
    expect(lattice).toHaveAttribute('stroke-linecap', 'butt')
    expect(lattice.querySelectorAll('line')).toHaveLength(166)
    expect(svg.querySelectorAll('line')).toHaveLength(166)
    expect(svg.querySelectorAll('clipPath')).toHaveLength(1)
    getLatticeClip(svg)
    expect([...svg.querySelectorAll('[clip-path]')]).toEqual([lattice])
    const surface = svg.querySelector('[data-layer="surface"]')!
    expect(surface).toHaveAttribute('fill', '#F2F2F2')
    expect(surface).not.toHaveAttribute('clip-path')
    const dots = svg.querySelector('[data-layer="dots"]')!
    expect(dots).not.toHaveAttribute('clip-path')
    expect(svg.querySelectorAll('circle')).toHaveLength(24)
    expect([...svg.querySelectorAll('[data-part="dot"]')].map((dot) => [dot.getAttribute('cx'), dot.getAttribute('cy')]))
      .toEqual(['56', '280', '504'].flatMap((cy) => ['56', '280', '504', '728'].map((cx) => [cx, cy])))
    for (const group of svg.querySelectorAll('[data-dot]')) {
      const [rim, dot] = group.querySelectorAll('circle')
      expect(rim).toHaveAttribute('r', '6.75')
      expect(rim).toHaveAttribute('fill', '#FFFFFF')
      expect(dot).toHaveAttribute('r', '5.5')
      expect(dot).toHaveAttribute('fill', '#000000')
      for (const circle of [rim, dot]) {
        expect(circle).toHaveAttribute('cx', rim.getAttribute('cx'))
        expect(circle).toHaveAttribute('cy', rim.getAttribute('cy'))
        expect(circle).toHaveAttribute('stroke', 'none')
        expect(circle).not.toHaveAttribute('opacity')
        expect(circle).not.toHaveAttribute('transform')
        expect(circle).not.toHaveAttribute('clip-path')
      }
    }
    expect(svg.querySelector('path,polyline,polygon,filter,animate,mask,image,linearGradient,[transform]')).toBeNull()
    expect(screen.getByRole('button', { name: 'Hide lattice' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('combobox', { name: 'Vanishing dots image size' })).toHaveValue('784')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText(proof)).not.toBeVisible()
    expect(screen.queryByRole('slider')).toBeNull()
  })

  it('repeated keyboard reveal removes only the lattice and retains every circle, surface, clip and frame', async () => {
    const user = userEvent.setup()
    const { container } = render(<StrictMode><VanishingDots /></StrictMode>)
    const svg = screen.getByRole('img'), toggle = screen.getByRole('button', { name: 'Hide lattice' })
    const frame = container.querySelector('[data-vanishing-dots-viewing-frame]')!, frameStyle = frame.getAttribute('style')
    const circles = [...svg.querySelectorAll('circle')], data = circles.map((circle) => circle.outerHTML)
    const surface = svg.querySelector('[data-layer="surface"]')!, surfaceData = surface.outerHTML
    const clip = getLatticeClip(svg), clipData = clip.outerHTML
    const lattice = svg.querySelector('[data-layer="lattice"]')!.outerHTML
    for (let iteration = 0; iteration < 3; iteration++) {
      toggle.focus()
      await user.keyboard(' ')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(svg.querySelector('[data-layer="lattice"]')).toBeNull()
      expect([...svg.querySelectorAll('circle')].every((circle, i) => circle === circles[i])).toBe(true)
      expect([...svg.querySelectorAll('circle')].map((circle) => circle.outerHTML)).toEqual(data)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceData)
      expect(svg.querySelector('clipPath')).toBe(clip)
      expect(clip.outerHTML).toBe(clipData)
      expect(container.querySelector('[data-vanishing-dots-viewing-frame]')).toBe(frame)
      expect(frame.getAttribute('style')).toBe(frameStyle)
      expect(svg).toHaveAttribute('viewBox', '0 0 784 560')
      expect(svg).toHaveAccessibleDescription(/same twelve black dots and white rims remain/)
      expect(screen.getAllByText(proof).some((node) => !node.hidden)).toBe(true)
      expect(toggle).toHaveFocus()
      await user.keyboard('{Enter}')
      expect(toggle).toHaveAttribute('aria-pressed', 'false')
      expect(svg.querySelector('[data-layer="lattice"]')!.outerHTML).toBe(lattice)
      expect(getLatticeClip(svg)).toBe(clip)
    }
  })

  it('offers neutral size guidance, keeps controls after the stimulus, and resets local defaults without moving focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<VanishingDots />)
    const svg = screen.getByRole('img'), targets = svg.querySelector('[data-layer="dots"]')!.outerHTML
    const frame = container.querySelector('[data-vanishing-dots-viewing-frame]')!
    const controls = screen.getByRole('region', { name: '02 / Explore' })
    expect(frame.compareDocumentPosition(controls) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(controls.contains(frame)).toBe(false)
    const toggle = screen.getByRole('button', { name: 'Hide lattice' }), size = screen.getByRole('combobox')
    expect(size).toHaveAccessibleDescription(/Compare image sizes.*Medium and Large may look the same on narrow screens.*Larger is not necessarily stronger/)
    await user.click(toggle)
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('link', { name: 'Michael Bach — Vanishing Dots' })).toHaveAttribute('href', 'https://michaelbach.de/ot/lum-NinioDots/')
    expect(screen.getByRole('link', { name: /Ninio & Stevens/ })).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/11220212/')
    expect(screen.getByText(/Original OpticEye lattice for the extinction illusion/)).toBeVisible()
    expect(screen.getByText(/not a measure of visual ability/)).toBeVisible()
    for (const width of ['392', '1000', '784', '392']) {
      await user.selectOptions(size, width)
      expect(frame).toHaveStyle({ maxWidth: `${width}px` })
      expect(svg.querySelector('[data-layer="dots"]')!.outerHTML).toBe(targets)
      expect(svg.querySelector('[data-layer="lattice"]')).toBeNull()
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    }
    const reset = screen.getByRole('button', { name: 'Reset vanishing dots' })
    reset.focus()
    await user.keyboard('{Enter}')
    expect(reset).toHaveFocus()
    expect(size).toHaveValue('784')
    expect(frame).toHaveStyle({ maxWidth: '784px' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(svg.querySelectorAll('line')).toHaveLength(166)
    expect(svg.querySelector('[data-layer="dots"]')!.outerHTML).toBe(targets)
    expect(screen.getByText('Vanishing dots reset.')).toBeVisible()
    expect(screen.getByText(proof)).not.toBeVisible()
  })

  it('keeps two instances independent with unique labels, descriptions, lattice clips and local controls', async () => {
    const user = userEvent.setup()
    render(<><VanishingDots /><VanishingDots /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Vanishing dots' })
    const ids = [...document.querySelectorAll('[id]')].map((node) => node.id)
    expect(new Set(ids).size).toBe(ids.length)
    const clips = []
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img')
      for (const attr of ['aria-labelledby', 'aria-describedby']) expect(article.querySelector(`[id="${svg.getAttribute(attr)}"]`)).not.toBeNull()
      clips.push(getLatticeClip(svg))
      expect(within(article).getByRole('combobox')).toHaveAccessibleName('Vanishing dots image size')
    }
    expect(clips[0].id).not.toBe(clips[1].id)
    await user.click(within(first).getByRole('button', { name: 'Hide lattice' }))
    await user.selectOptions(within(first).getByRole('combobox'), '392')
    expect(second.querySelectorAll('line')).toHaveLength(166)
    expect(getLatticeClip(within(second).getByRole('img'))).toBe(clips[1])
    expect(within(second).getByRole('button', { name: 'Hide lattice' })).toHaveAttribute('aria-pressed', 'false')
    expect(within(second).getByRole('combobox')).toHaveValue('784')
  })
})
