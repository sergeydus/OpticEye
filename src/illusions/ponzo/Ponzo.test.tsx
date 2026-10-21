import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Ponzo from './Ponzo'
import PonzoStimulus from './PonzoStimulus'

const targets = (svg: Element) => [...svg.querySelectorAll('[data-layer="targets"] line')]
const attributes = (svg: Element) => svg.querySelector('[data-layer="targets"]')!.outerHTML
const proof = 'Both orange bars have the same length. Only the rails and cross-ties were removed.'

describe('Ponzo experience', () => {
  it('starts with exact colors, ties behind rails, bars last, and no initial answer', () => {
    render(<Ponzo />)
    const svg = screen.getByRole('img', { name: 'Ponzo illusion' })
    expect(svg).toHaveAccessibleDescription(/two converging rails and twelve projecting cross-ties/i)
    expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
    expect([...svg.children].map((n) => n.tagName)).toEqual(['title', 'desc', 'rect', 'g', 'g'])
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    const context = svg.querySelector('[data-layer="context"]')!
    expect(context).toHaveAttribute('stroke-linecap', 'butt')
    expect([...context.children].map((n) => n.getAttribute('data-layer'))).toEqual(['ties', 'rails'])
    for (const [layer, color, width, count] of [['ties', '#111111', '3', 12], ['rails', '#111111', '6', 2], ['targets', '#D14D00', '8', 2]] as const) {
      const group = svg.querySelector(`[data-layer="${layer}"]`)!
      expect(group).toHaveAttribute('stroke', color)
      expect(group).toHaveAttribute('stroke-width', width)
      expect(group.querySelectorAll('line')).toHaveLength(count)
    }
    expect(context.nextElementSibling).toBe(svg.querySelector('[data-layer="targets"]'))
    expect(targets(svg).map((n) => ['x1', 'y1', 'x2', 'y2'].map((key) => n.getAttribute(key)))).toEqual([['290', '148', '430', '148'], ['290', '332', '430', '332']])
    expect(screen.getByRole('slider', { name: 'Top rail gap' })).toHaveValue('8')
    expect(screen.getByRole('slider')).toHaveAttribute('min', '0')
    expect(screen.getByRole('slider')).toHaveAttribute('max', '24')
    expect(screen.getByRole('slider')).toHaveAttribute('step', '4')
    expect(screen.getByRole('combobox', { name: 'Ponzo image size' })).toHaveValue('540')
    expect(screen.getByText(proof)).not.toBeVisible()
    expect(svg.querySelector('path,circle,filter,animate,mask,clipPath,[transform],linearGradient')).toBeNull()
  })

  it('repeatedly removes only context, preserving the same bar nodes, attributes, surface and viewBox', async () => {
    const user = userEvent.setup()
    render(<StrictMode><Ponzo /></StrictMode>)
    const svg = screen.getByRole('img'), pair = targets(svg), original = attributes(svg)
    const group = svg.querySelector('[data-layer="targets"]'), surface = svg.querySelector('[data-layer="surface"]')!
    const surfaceData = surface.outerHTML, toggle = screen.getByRole('button', { name: 'Hide rails' })
    for (let i = 0; i < 3; i++) {
      toggle.focus()
      await user.keyboard(' ')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(svg.querySelector('[data-layer="context"]')).toBeNull()
      expect(svg.querySelectorAll('line')).toHaveLength(2)
      expect(svg.querySelector('[data-layer="targets"]')).toBe(group)
      expect(targets(svg).every((node, j) => node === pair[j])).toBe(true)
      expect(attributes(svg)).toBe(original)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceData)
      expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
      expect(svg).toHaveAccessibleDescription(/same two equal-length orange bars/)
      for (const message of screen.getAllByText(proof)) expect(message).toBeVisible()
      await user.click(toggle)
      expect(svg.querySelectorAll('[data-layer="context"] line')).toHaveLength(14)
      expect(attributes(svg)).toBe(original)
    }
  })

  it('changes only the rail/tie context at all seven gaps, and keeps hidden updates hidden', async () => {
    const user = userEvent.setup()
    render(<Ponzo />)
    const svg = screen.getByRole('img'), original = attributes(svg), pair = targets(svg)
    const slider = screen.getByRole('slider', { name: 'Top rail gap' })
    let previous = ''
    for (let q = 0; q <= 24; q += 4) {
      fireEvent.change(slider, { target: { value: String(q) } })
      const context = svg.querySelector('[data-layer="context"]')!.outerHTML
      expect(context).not.toBe(previous)
      previous = context
      expect(targets(svg).every((node, j) => node === pair[j])).toBe(true)
      expect(attributes(svg)).toBe(original)
    }
    await user.click(screen.getByRole('button', { name: 'Hide rails' }))
    fireEvent.change(slider, { target: { value: '8' } })
    expect(svg.querySelector('[data-layer="context"]')).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Hide rails' }))
    expect([...svg.querySelectorAll('[data-layer="rails"] line')].map((n) => n.getAttribute('x1'))).toEqual(['356', '364'])
    expect(attributes(svg)).toBe(original)
  })

  it('keeps size and disclosure independent, links sources, and resets all defaults with focus retained', async () => {
    const user = userEvent.setup()
    const { container } = render(<Ponzo />)
    const svg = screen.getByRole('img'), original = attributes(svg)
    const disclosure = screen.getByRole('button', { name: 'Why it happens' })
    await user.click(disclosure)
    expect(screen.getByRole('link', { name: 'Schiffman & Thompson (1978): depth and context' })).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/628580/')
    expect(screen.getByRole('link', { name: 'Yildiz et al. (2019): perspective and texture cues' })).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/31600294/')
    for (const size of ['240', '720']) {
      await user.selectOptions(screen.getByRole('combobox'), size)
      expect(container.querySelector('[data-ponzo-viewing-frame]')).toHaveStyle({ maxWidth: `${size}px` })
      expect(attributes(svg)).toBe(original)
    }
    fireEvent.change(screen.getByRole('slider'), { target: { value: '24' } })
    await user.click(screen.getByRole('button', { name: 'Hide rails' }))
    expect(disclosure).toHaveAttribute('aria-expanded', 'true')
    const reset = screen.getByRole('button', { name: 'Reset Ponzo' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(screen.getByRole('slider')).toHaveValue('8')
    expect(screen.getByRole('combobox')).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide rails' })).toHaveAttribute('aria-pressed', 'false')
    expect(disclosure).toHaveAttribute('aria-expanded', 'false')
    expect(attributes(svg)).toBe(original)
    expect(screen.getByText('Ponzo experiment reset.')).toBeVisible()
  })

  it('isolates two instances and keeps controls and SVG descriptions uniquely labelled', async () => {
    const user = userEvent.setup()
    render(<><Ponzo /><Ponzo /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Ponzo illusion' })
    const ids = [...document.querySelectorAll('[id]')].map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img'), slider = within(article).getByRole('slider')
      for (const attr of ['aria-labelledby', 'aria-describedby']) expect(document.getElementById(svg.getAttribute(attr)!)).not.toBeNull()
      expect(slider).toHaveAccessibleName('Top rail gap')
      expect(document.getElementById(slider.getAttribute('aria-describedby')!)).not.toBeNull()
    }
    await user.click(within(first).getByRole('button', { name: 'Hide rails' }))
    fireEvent.change(within(first).getByRole('slider'), { target: { value: '24' } })
    expect(second.querySelectorAll('[data-layer="context"] line')).toHaveLength(14)
    expect(within(second).getByRole('slider')).toHaveValue('8')
  })

  it('falls back for invalid stimulus props without changing targets or emitting non-finite attributes', () => {
    const { container } = render(<PonzoStimulus topGap={Infinity} railsVisible />)
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/)
    expect([...container.querySelectorAll('[data-layer="rails"] line')].map((n) => n.getAttribute('x1'))).toEqual(['356', '364'])
    expect(container.querySelectorAll('[data-layer="targets"] line')).toHaveLength(2)
  })
})
