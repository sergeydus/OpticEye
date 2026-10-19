import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Confetti from './Confetti'

function targets(root: Element) {
  return Array.from(root.querySelectorAll('[data-layer="disks"] circle')).map((node) => ({
    cx: node.getAttribute('cx'), cy: node.getAttribute('cy'), radius: node.getAttribute('r'), fill: node.getAttribute('fill'),
  }))
}

describe('Confetti experience', () => {
  it('starts with an accessible stimulus, exact shared target color, and no answer disclosed', () => {
    const { container } = render(<Confetti />)
    expect(screen.getByRole('img', { name: 'Confetti color illusion' })).toHaveAccessibleDescription(/Use Show base colors/)
    expect(screen.getByRole('button', { name: 'Show base colors' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('slider', { name: 'Stripe spacing' })).toHaveValue('3')
    expect(screen.getByRole('combobox', { name: 'Image size' })).toHaveValue('360')
    expect(screen.getByText(/RGB 255/)).not.toBeVisible()
    expect(targets(container)).toHaveLength(24)
    expect(new Set(targets(container).map((disk) => disk.fill))).toEqual(new Set(['#FFC08D']))
    expect(new Set(targets(container).map((disk) => disk.radius))).toEqual(new Set(['34']))
  })

  it('aligns each single-color foreground with the full background and its disk clip', () => {
    const { container } = render(<Confetti />)
    const background = Array.from(container.querySelectorAll('[data-layer="background-stripes"] rect'))
    const foreground = Array.from(container.querySelectorAll('[data-layer="foreground-stripes"] > g'))
    expect(background).toHaveLength(160)
    expect(foreground).toHaveLength(24)
    const contextCounts = new Map<string, number>()
    for (const group of foreground) {
      const reference = group.getAttribute('clip-path')!
      const clip = document.getElementById(reference.slice(5, -1))!
      const disk = clip.querySelector('circle')!
      expect(disk.getAttribute('r')).toBe('34')
      const bands = Array.from(group.querySelectorAll('rect'))
      expect(bands.length).toBeGreaterThan(0)
      const colors = new Set(bands.map((band) => band.getAttribute('fill')!))
      expect(colors.size).toBe(1)
      const color = [...colors][0]
      contextCounts.set(color, (contextCounts.get(color) ?? 0) + 1)
      for (const band of bands) {
        expect(background.some((back) => ['y', 'height', 'fill'].every((attribute) => back.getAttribute(attribute) === band.getAttribute(attribute)))).toBe(true)
        expect(Number(band.getAttribute('y'))).toBeLessThan(Number(disk.getAttribute('cy')) + 34)
        expect(Number(band.getAttribute('y')) + Number(band.getAttribute('height'))).toBeGreaterThan(Number(disk.getAttribute('cy')) - 34)
      }
    }
    expect(Object.fromEntries(contextCounts)).toEqual({ '#1988E8': 8, '#FA2106': 8, '#41950B': 8 })
  })

  it('reveals without changing targets or surface, and preserves spacing through repeated toggles', async () => {
    const user = userEvent.setup()
    const { container } = render(<StrictMode><Confetti /></StrictMode>)
    const before = targets(container)
    const surface = container.querySelector('[data-layer="surface"]')!.outerHTML
    const toggle = screen.getByRole('button', { name: 'Show base colors' })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(toggle).toHaveFocus()
    expect(container.querySelector('[data-layer="background-stripes"]')).toBeNull()
    expect(container.querySelector('[data-layer="foreground-stripes"]')).toBeNull()
    expect(screen.getByRole('img', { name: 'Confetti color illusion' })).toHaveAccessibleDescription(/identical peach fill/)
    expect(screen.getByText(/RGB 255/)).toBeVisible()
    fireEvent.change(screen.getByRole('slider'), { target: { value: '6' } })
    expect(targets(container)).toEqual(before)
    expect(container.querySelector('[data-layer="surface"]')!.outerHTML).toBe(surface)
    await user.click(toggle)
    expect(container.querySelectorAll('[data-layer="background-stripes"] rect')).toHaveLength(80)
    expect(screen.getByText(/RGB 255/)).not.toBeVisible()
    await user.click(toggle)
    await user.click(toggle)
    expect(targets(container)).toEqual(before)
    expect(screen.getByRole('slider')).toHaveValue('6')
  })

  it('resets reveal, spacing, and explanation while retaining focus on Reset', async () => {
    const user = userEvent.setup()
    const { container } = render(<Confetti />)
    await user.click(screen.getByRole('button', { name: 'Show base colors' }))
    fireEvent.change(screen.getByRole('slider'), { target: { value: '8' } })
    await user.selectOptions(screen.getByRole('combobox', { name: 'Image size' }), '240')
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('link', { name: /Research/ })).toHaveAttribute('href', 'https://doi.org/10.47691/joi.v2.6152')
    const reset = screen.getByRole('button', { name: 'Reset' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(screen.getByRole('slider')).toHaveValue('3')
    expect(screen.getByRole('combobox', { name: 'Image size' })).toHaveValue('360')
    expect(container.querySelector('[data-viewing-frame]')).toHaveStyle({ maxWidth: '360px' })
    expect(screen.getByRole('button', { name: 'Show base colors' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('link', { name: /Research/ })).toBeNull()
    expect(container.querySelectorAll('[data-layer="background-stripes"] rect')).toHaveLength(160)
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('Experiment reset.')
  })

  it('supports keyboard reveal and disclosure without coupling their state', async () => {
    const user = userEvent.setup()
    render(<Confetti />)
    await user.tab()
    const toggle = screen.getByRole('button', { name: 'Show base colors' })
    expect(toggle).toHaveFocus()
    await user.keyboard(' ')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    await user.tab()
    await user.tab()
    expect(screen.getByRole('slider')).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('combobox', { name: 'Image size' })).toHaveFocus()
    await user.tab()
    const explanation = screen.getByRole('button', { name: 'Why it happens' })
    expect(explanation).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(explanation).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
  })

  it('changes only viewing scale and preserves size, targets, and density through reveal', async () => {
    const user = userEvent.setup()
    const { container } = render(<Confetti />)
    const before = targets(container)
    const size = screen.getByRole('combobox', { name: 'Image size' })
    const frame = container.querySelector('[data-viewing-frame]')!
    for (const width of ['240', '720']) {
      await user.selectOptions(size, width)
      expect(frame).toHaveStyle({ maxWidth: `${width}px` })
      expect(targets(container)).toEqual(before)
      expect(screen.getByRole('slider')).toHaveValue('3')
    }
    await user.click(screen.getByRole('button', { name: 'Show base colors' }))
    expect(frame).toHaveStyle({ maxWidth: '720px' })
    await user.selectOptions(size, '240')
    expect(container.querySelector('[data-layer="foreground-stripes"]')).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Show base colors' }))
    expect(frame).toHaveStyle({ maxWidth: '240px' })
    expect(targets(container)).toEqual(before)
  })

  it('isolates two instances and gives every SVG reference a unique, existing target', async () => {
    const user = userEvent.setup()
    const { container } = render(<><Confetti /><Confetti /></>)
    const ids = Array.from(container.querySelectorAll('[id]')).map((node) => node.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const group of container.querySelectorAll('[clip-path]')) {
      const clipId = group.getAttribute('clip-path')!.slice(5, -1)
      expect(document.getElementById(clipId)).toBeInTheDocument()
    }
    const [first, second] = screen.getAllByRole('article')
    await user.click(within(first).getByRole('button', { name: 'Show base colors' }))
    expect(first.querySelector('[data-layer="background-stripes"]')).toBeNull()
    expect(second.querySelector('[data-layer="background-stripes"]')).toBeInTheDocument()
    expect(within(second).getByRole('button', { name: 'Show base colors' })).toHaveAttribute('aria-pressed', 'false')
  })
})
