import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Ponzo from './Ponzo'
import PonzoStimulus from './PonzoStimulus'

const targets = (svg: Element) => [...svg.querySelectorAll('[data-layer="targets"] line')]
const attributes = (svg: Element) => svg.querySelector('[data-layer="targets"]')!.outerHTML
const railTopCenters = (svg: Element) => [...svg.querySelectorAll('[data-layer="rails"] polygon')].map((polygon) => {
  const points = polygon.getAttribute('points')!.split(' ').map((point) => point.split(',').map(Number))
  return (points[0][0] + points[1][0]) / 2
})
const expectDefaultRailEnds = (svg: Element) => {
  const centers = railTopCenters(svg)
  expect(centers[0]).toBeCloseTo(310.66456803078, 10)
  expect(centers[1]).toBeCloseTo(409.33543196922, 10)
}
const proof = 'Both orange bars have the same length. Only the rails and cross-ties were removed.'

describe('Ponzo experience', () => {
  it('starts with exact colors, ties behind rails, bars last, and no initial answer', () => {
    render(<Ponzo />)
    const svg = screen.getByRole('img', { name: 'Ponzo illusion' })
    expect(svg).toHaveAccessibleDescription(/two converging rails and twenty-six projected cross-ties/i)
    expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
    expect([...svg.children].map((n) => n.tagName)).toEqual(['title', 'desc', 'rect', 'g', 'g'])
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    const context = svg.querySelector('[data-layer="context"]')!
    expect(context).toHaveAttribute('fill', '#111111')
    expect(context).toHaveAttribute('stroke', 'none')
    expect(context.querySelector('line,[stroke-width]')).toBeNull()
    expect([...context.children].map((n) => n.getAttribute('data-layer'))).toEqual(['ties', 'rails'])
    for (const [layer, count] of [['ties', 26], ['rails', 2]] as const) {
      const group = svg.querySelector(`[data-layer="${layer}"]`)!
      expect(group.querySelectorAll('polygon')).toHaveLength(count)
      for (const polygon of group.querySelectorAll('polygon')) {
        expect(polygon.getAttribute('points')!.split(' ')).toHaveLength(4)
        expect(polygon).not.toHaveAttribute('stroke')
        expect(polygon).not.toHaveAttribute('fill')
      }
    }
    const targetGroup = svg.querySelector('[data-layer="targets"]')!
    expect(targetGroup).toHaveAttribute('stroke', '#D14D00')
    expect(targetGroup).toHaveAttribute('stroke-width', '8')
    expect(targetGroup).toHaveAttribute('stroke-linecap', 'butt')
    expect(targetGroup).toHaveAttribute('fill', 'none')
    expect(targetGroup.querySelectorAll('line')).toHaveLength(2)
    expect(context.nextElementSibling).toBe(svg.querySelector('[data-layer="targets"]'))
    expect(targets(svg).map((n) => ['x1', 'y1', 'x2', 'y2'].map((key) => n.getAttribute(key)))).toEqual([['290', '148', '430', '148'], ['290', '332', '430', '332']])
    expect(screen.getByRole('slider', { name: 'Rail convergence' })).toHaveValue('8')
    expect(screen.getByRole('slider')).toHaveAccessibleDescription('A larger setting spreads the rails farther apart in the distance. The orange bars stay fixed.')
    expect(svg.closest('article')!.querySelector('output[for]')).toHaveTextContent(/^8$/)
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
      expect(svg.querySelectorAll('[data-layer="context"] polygon')).toHaveLength(28)
      expect(attributes(svg)).toBe(original)
    }
  })

  it('changes only the rail/tie context at all seven gaps, and keeps hidden updates hidden', async () => {
    const user = userEvent.setup()
    render(<Ponzo />)
    const svg = screen.getByRole('img'), original = attributes(svg), pair = targets(svg)
    const slider = screen.getByRole('slider', { name: 'Rail convergence' })
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
    expectDefaultRailEnds(svg)
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
    expect(screen.getByRole('link', { name: 'NTT Illusion Forum: Ponzo railway demonstration' })).toHaveAttribute('href', 'https://illusion-forum.ilab.ntt.co.jp/ponzo/index.html')
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
      expect(slider).toHaveAccessibleName('Rail convergence')
      expect(document.getElementById(slider.getAttribute('aria-describedby')!)).not.toBeNull()
    }
    await user.click(within(first).getByRole('button', { name: 'Hide rails' }))
    fireEvent.change(within(first).getByRole('slider'), { target: { value: '24' } })
    expect(second.querySelectorAll('[data-layer="context"] polygon')).toHaveLength(28)
    expect(within(second).getByRole('slider')).toHaveValue('8')
  })

  it('falls back for invalid stimulus props without changing targets or emitting non-finite attributes', () => {
    const { container } = render(<PonzoStimulus topGap={Infinity} railsVisible />)
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/)
    expectDefaultRailEnds(container)
    expect(container.querySelectorAll('[data-layer="targets"] line')).toHaveLength(2)
  })
})
