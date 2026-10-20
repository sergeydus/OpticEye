import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Munker from './Munker'
import MunkerStimulus from './MunkerStimulus'
import { createBands, normalizeStripeWidth, normalizeViewingWidth } from './munkerModel'

function targets(root: Element) {
  return Array.from(root.querySelectorAll('[data-layer="targets"] rect')).map((node) => node.outerHTML)
}

describe('Munker construction', () => {
  it('normalizes invalid values before generating bounded geometry', () => {
    for (const [input, expected] of [[-1, 3], [3, 3], [6.4, 6], [6.5, 7], [12, 12], [100, 12], [NaN, 6], [Infinity, 6]]) {
      expect(normalizeStripeWidth(input)).toBe(expected)
      expect(createBands(input)).toEqual(createBands(expected))
    }
    expect([240, 360, 720].map(normalizeViewingWidth)).toEqual([240, 360, 720])
    expect([0, -1, 450, NaN, Infinity].map(normalizeViewingWidth)).toEqual([360, 360, 360, 360, 360])
  })

  it.each([3, 6, 7, 12])('covers the surface without gaps and aligns opposite foreground colors at width %i', (width) => {
    const { container } = render(<MunkerStimulus contextVisible stripeWidth={width} />)
    const bars = Array.from(container.querySelectorAll('[data-layer="targets"] rect'))
    expect(bars.map((bar) => ['x', 'y', 'width', 'height', 'fill'].map((attribute) => bar.getAttribute(attribute)))).toEqual([
      ['150', '60', '120', '360', '#00FF00'], ['450', '60', '120', '360', '#00FF00'],
    ])
    const background = Array.from(container.querySelectorAll('[data-layer="background-bands"] rect'))
    let edge = 0
    let lastColor = ''
    for (const band of background) {
      expect(Number(band.getAttribute('y'))).toBe(edge)
      const height = Number(band.getAttribute('height'))
      expect(height).toBeGreaterThan(0)
      expect(height).toBeLessThanOrEqual(width)
      expect(band).toHaveAttribute('x', '0')
      expect(band).toHaveAttribute('width', '720')
      const color = band.getAttribute('fill')!
      expect(['#FF00FF', '#0000FF']).toContain(color)
      expect(color).not.toBe(lastColor)
      lastColor = color
      edge += height
      expect(edge).toBeLessThanOrEqual(480)
    }
    expect(background[0]).toHaveAttribute('fill', '#FF00FF')
    expect(edge).toBe(480)
    const foreground = Array.from(container.querySelectorAll('[data-layer="foreground-bands"] > g'))
    expect(foreground).toHaveLength(2)
    foreground.forEach((group, index) => {
      const clip = document.getElementById(group.getAttribute('clip-path')!.slice(5, -1))!
      const clippedTarget = clip.querySelector('rect')!
      for (const attribute of ['x', 'y', 'width', 'height']) expect(clippedTarget.getAttribute(attribute)).toBe(bars[index].getAttribute(attribute))
      const color = index === 0 ? '#FF00FF' : '#0000FF'
      const expectedBands = background.filter((band) => band.getAttribute('fill') === color && Number(band.getAttribute('y')) < 420 && Number(band.getAttribute('y')) + Number(band.getAttribute('height')) > 60)
      expect(Array.from(group.children).map((band) => band.outerHTML)).toEqual(expectedBands.map((band) => band.outerHTML))
      expect(expectedBands.length).toBeGreaterThan(0)
    })
    expect(container.querySelector('filter, linearGradient, [style*="blend"], [style*="opacity"]')).toBeNull()
  })
})

describe('Munker experience', () => {
  it('starts at the specified defaults without exposing the proof or explanation', () => {
    const { container } = render(<Munker />)
    expect(screen.getByRole('heading', { name: 'Munker illusion', level: 1 })).toBeVisible()
    expect(screen.getByRole('img', { name: 'Munker color illusion' })).toHaveAccessibleDescription(/Use Show base color/)
    expect(screen.getByRole('button', { name: 'Show base color' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('slider', { name: 'Stripe width' })).toHaveValue('6')
    expect(screen.getByRole('combobox', { name: 'Munker image size' })).toHaveValue('360')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText(/RGB 0, 255, 0/)).not.toBeVisible()
    expect(container.querySelectorAll('[data-layer="background-bands"] rect')).toHaveLength(80)
  })

  it('removes only context across repeated reveals and updates hidden width/size independently', async () => {
    const user = userEvent.setup()
    const { container } = render(<StrictMode><Munker /></StrictMode>)
    const before = targets(container)
    const nodes = Array.from(container.querySelectorAll('[data-layer="targets"] rect'))
    const surface = container.querySelector('[data-layer="surface"]')!.outerHTML
    const toggle = screen.getByRole('button', { name: 'Show base color' })
    await user.click(toggle)
    expect(toggle).toHaveFocus()
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(/RGB 0, 255, 0/)).toBeVisible()
    expect(container.querySelector('[data-munker-swatch]')).toHaveStyle({ backgroundColor: '#00FF00' })
    fireEvent.change(screen.getByRole('slider'), { target: { value: '7' } })
    await user.selectOptions(screen.getByRole('combobox'), '720')
    for (let index = 0; index < 4; index++) {
      expect(targets(container)).toEqual(before)
      expect(Array.from(container.querySelectorAll('[data-layer="targets"] rect'))).toEqual(nodes)
      expect(container.querySelector('[data-layer="surface"]')!.outerHTML).toBe(surface)
      expect(container.querySelector('[data-munker-viewing-frame]')).toHaveStyle({ maxWidth: '720px' })
      expect(container.querySelector('[data-layer="background-bands"]')).toBeNull()
      expect(container.querySelector('[data-layer="foreground-bands"]')).toBeNull()
      expect(screen.getByRole('img')).toHaveAccessibleDescription(/identical green fills/)
      await user.click(toggle)
      expect(container.querySelectorAll('[data-layer="background-bands"] rect')).toHaveLength(69)
      expect(screen.getByRole('slider')).toHaveValue('7')
      await user.click(toggle)
    }
  })

  it('operates reveal and disclosure from the keyboard and resets all settings while keeping focus', async () => {
    const user = userEvent.setup()
    render(<Munker />)
    await user.tab()
    const toggle = screen.getByRole('button', { name: 'Show base color' })
    expect(toggle).toHaveFocus()
    await user.keyboard(' ')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Grid hidden. Both bars use the same green fill.')).toBeVisible()
    await user.tab()
    await user.tab()
    const slider = screen.getByRole('slider')
    expect(slider).toHaveFocus()
    fireEvent.change(slider, { target: { value: '12' } })
    await user.tab()
    const size = screen.getByRole('combobox')
    expect(size).toHaveFocus()
    await user.selectOptions(size, '240')
    await user.tab()
    const disclosure = screen.getByRole('button', { name: 'Why it happens' })
    expect(disclosure).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(disclosure).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: /Michael Bach/ })).toHaveAttribute('href', 'https://michaelbach.de/ot/col-Munker/')
    expect(screen.getByText(/Munker–White/)).toBeVisible()
    const reset = screen.getByRole('button', { name: 'Reset Munker' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(slider).toHaveValue('6')
    expect(size).toHaveValue('360')
    expect(disclosure).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Munker experiment reset.')).toBeVisible()
  })

  it('keeps two mounted instances and their definition references independent', async () => {
    const user = userEvent.setup()
    const { container } = render(<><Munker /><Munker /></>)
    const ids = Array.from(container.querySelectorAll('[id]')).map((element) => element.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const group of container.querySelectorAll('[clip-path]')) expect(document.getElementById(group.getAttribute('clip-path')!.slice(5, -1))).toBeInTheDocument()
    const [first, second] = screen.getAllByRole('article')
    await user.click(within(first).getByRole('button', { name: 'Show base color' }))
    expect(first.querySelector('[data-layer="background-bands"]')).toBeNull()
    expect(second.querySelector('[data-layer="background-bands"]')).toBeInTheDocument()
  })
})
