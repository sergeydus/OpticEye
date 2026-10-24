import { StrictMode } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import VanishingDots from './VanishingDots'

const proof = 'Twelve black dots are drawn in both states. Only the gray lattice was removed.'

describe('vanishing dots experience', () => {
  it('starts with exactly188 gray segments and twelve white-rim/black-dot pairs on white', () => {
    render(<VanishingDots />)
    const svg = screen.getByRole('img', { name: 'Vanishing dots' })
    expect(svg).toHaveAttribute('viewBox', '0 0 720 540')
    expect(svg).toHaveAccessibleDescription(/Twelve black dots with white rims at plus-crossings/)
    expect([...svg.children].map((node) => node.tagName)).toEqual(['title', 'desc', 'rect', 'g', 'g'])
    const lattice = svg.querySelector('[data-layer="lattice"]')!
    expect(lattice).toHaveAttribute('stroke', '#808080')
    expect(lattice).toHaveAttribute('stroke-width', '8')
    expect(lattice).toHaveAttribute('stroke-linecap', 'butt')
    expect(lattice.querySelectorAll('line')).toHaveLength(188)
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    expect(svg.querySelectorAll('circle')).toHaveLength(24)
    for (const group of svg.querySelectorAll('[data-dot]')) {
      const [rim, dot] = group.querySelectorAll('circle')
      expect(rim).toHaveAttribute('r', '5.75')
      expect(rim).toHaveAttribute('fill', '#FFFFFF')
      expect(dot).toHaveAttribute('r', '4')
      expect(dot).toHaveAttribute('fill', '#000000')
      for (const circle of [rim, dot]) {
        expect(circle).toHaveAttribute('cx', rim.getAttribute('cx'))
        expect(circle).toHaveAttribute('cy', rim.getAttribute('cy'))
        expect(circle).toHaveAttribute('stroke', 'none')
        expect(circle).not.toHaveAttribute('opacity')
        expect(circle).not.toHaveAttribute('transform')
      }
    }
    expect(svg.querySelector('path,polyline,polygon,filter,animate,mask,clipPath,image,linearGradient,[transform]')).toBeNull()
    expect(screen.getByRole('button', { name: 'Hide lattice' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('combobox', { name: 'Vanishing dots image size' })).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText(proof)).not.toBeVisible()
    expect(screen.queryByRole('slider')).toBeNull()
  })

  it('repeated keyboard reveal removes only the lattice and retains every circle and surface node/attribute', async () => {
    const user = userEvent.setup()
    render(<StrictMode><VanishingDots /></StrictMode>)
    const svg = screen.getByRole('img'), toggle = screen.getByRole('button', { name: 'Hide lattice' })
    const circles = [...svg.querySelectorAll('circle')], data = circles.map((circle) => circle.outerHTML)
    const surface = svg.querySelector('[data-layer="surface"]')!, surfaceData = surface.outerHTML
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
      expect(svg).toHaveAttribute('viewBox', '0 0 720 540')
      expect(svg).toHaveAccessibleDescription(/same twelve black dots and white rims remain/)
      expect(screen.getAllByText(proof).some((node) => !node.hidden)).toBe(true)
      await user.keyboard('{Enter}')
      expect(toggle).toHaveAttribute('aria-pressed', 'false')
      expect(svg.querySelector('[data-layer="lattice"]')!.outerHTML).toBe(lattice)
    }
  })

  it('keeps size/disclosure independent of comparison and resets all defaults while retaining focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<VanishingDots />)
    const svg = screen.getByRole('img'), targets = svg.querySelector('[data-layer="dots"]')!.outerHTML
    const toggle = screen.getByRole('button', { name: 'Hide lattice' }), size = screen.getByRole('combobox')
    await user.click(toggle)
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('link', { name: 'Michael Bach — Vanishing Dots' })).toHaveAttribute('href', 'https://michaelbach.de/ot/lum-NinioDots/')
    expect(screen.getByRole('link', { name: /Ninio & Stevens/ })).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/11220212/')
    expect(screen.getByText(/Original OpticEye lattice for the extinction illusion/)).toBeVisible()
    expect(screen.getByText(/not a measure of visual ability/)).toBeVisible()
    for (const width of ['240', '720', '540', '240']) {
      await user.selectOptions(size, width)
      expect(container.querySelector('[data-vanishing-dots-viewing-frame]')).toHaveStyle({ maxWidth: `${width}px` })
      expect(svg.querySelector('[data-layer="dots"]')!.outerHTML).toBe(targets)
      expect(svg.querySelector('[data-layer="lattice"]')).toBeNull()
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    }
    const reset = screen.getByRole('button', { name: 'Reset vanishing dots' })
    reset.focus()
    await user.keyboard('{Enter}')
    expect(reset).toHaveFocus()
    expect(size).toHaveValue('540')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(svg.querySelectorAll('line')).toHaveLength(188)
    expect(svg.querySelector('[data-layer="dots"]')!.outerHTML).toBe(targets)
    expect(screen.getByText('Vanishing dots reset.')).toBeVisible()
    expect(screen.getByText(proof)).not.toBeVisible()
  })

  it('keeps two instances independent with unique labels/descriptions and local controls', async () => {
    const user = userEvent.setup()
    render(<><VanishingDots /><VanishingDots /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Vanishing dots' })
    const ids = [...document.querySelectorAll('[id]')].map((node) => node.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img')
      for (const attr of ['aria-labelledby', 'aria-describedby']) expect(article.querySelector(`[id="${svg.getAttribute(attr)}"]`)).not.toBeNull()
      expect(within(article).getByRole('combobox')).toHaveAccessibleName('Vanishing dots image size')
    }
    await user.click(within(first).getByRole('button', { name: 'Hide lattice' }))
    await user.selectOptions(within(first).getByRole('combobox'), '240')
    expect(second.querySelectorAll('line')).toHaveLength(188)
    expect(within(second).getByRole('button', { name: 'Hide lattice' })).toHaveAttribute('aria-pressed', 'false')
    expect(within(second).getByRole('combobox')).toHaveValue('540')
  })
})
