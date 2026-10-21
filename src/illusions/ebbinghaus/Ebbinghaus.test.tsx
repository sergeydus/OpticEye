import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Ebbinghaus from './Ebbinghaus'
import EbbinghausStimulus from './EbbinghausStimulus'

const proof = 'Both center circles have the same diameter. Only their surrounds changed.'
const targets = (svg: Element) => [...svg.querySelectorAll('[data-layer="targets"] circle')]
const data = (nodes: Element[]) => nodes.map((n) => n.outerHTML)

describe('Ebbinghaus experience', () => {
  it('starts with the specified palette, equal orange targets, fourteen blue disks and controls', () => {
    render(<Ebbinghaus />)
    const svg = screen.getByRole('img', { name: 'Ebbinghaus illusion' })
    expect(svg).toHaveAccessibleDescription(/left has six larger blue neighbors, the right eight smaller/)
    expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
    expect([...svg.children].map((n) => n.tagName)).toEqual(['title', 'desc', 'rect', 'g', 'g'])
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    const context = svg.querySelector('[data-layer="context"]')!
    expect(context).toHaveAttribute('fill', '#2563EB')
    expect(context).toHaveAttribute('stroke', 'none')
    expect(context.querySelectorAll('circle')).toHaveLength(14)
    expect(context.querySelectorAll('[data-context^="left-"]')).toHaveLength(6)
    expect(context.querySelectorAll('[data-context^="right-"]')).toHaveLength(8)
    const pair = targets(svg)
    expect(pair).toHaveLength(2)
    expect(pair.map((n) => n.getAttribute('cx'))).toEqual(['190', '530'])
    for (const target of pair) {
      expect(target).toHaveAttribute('cy', '240')
      expect(target).toHaveAttribute('r', '28')
      expect(target).toHaveAttribute('fill', '#F28C28')
    }
    expect(svg.querySelector('[data-layer="targets"]')).toHaveAttribute('opacity', '1')
    expect(svg.querySelector('[data-layer="targets"]')).toHaveAttribute('stroke', 'none')
    expect(screen.getByRole('slider', { name: 'Large surround radius' })).toHaveValue('40')
    expect(screen.getByRole('slider', { name: 'Large surround gap' })).toHaveValue('20')
    expect(screen.getByRole('combobox', { name: 'Ebbinghaus image size' })).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide surrounds' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText(proof)).not.toBeVisible()
    expect(svg.querySelector('path,line,filter,animate,mask,clipPath,[transform],linearGradient')).toBeNull()
  })

  it('removes only context and keeps the identical target nodes/attributes and surface through repeated reveal', async () => {
    const user = userEvent.setup()
    render(<StrictMode><Ebbinghaus /></StrictMode>)
    const svg = screen.getByRole('img'), pair = targets(svg), original = data(pair), surface = svg.querySelector('[data-layer="surface"]')!
    const surfaceData = surface.outerHTML, toggle = screen.getByRole('button', { name: 'Hide surrounds' })
    for (let i = 0; i < 3; i++) {
      toggle.focus()
      await user.keyboard(' ')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(svg.querySelector('[data-layer="context"]')).toBeNull()
      expect(targets(svg).every((node, j) => node === pair[j])).toBe(true)
      expect(data(targets(svg))).toEqual(original)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceData)
      expect(svg).toHaveAccessibleDescription(/same two orange circles, with equal diameters/)
      expect(svg.querySelectorAll('circle')).toHaveLength(2)
      await user.click(toggle)
      expect(svg.querySelectorAll('[data-layer="context"] circle')).toHaveLength(14)
      expect(data(targets(svg))).toEqual(original)
    }
  })

  it('changes only the left context, preserves the right ring and targets, and retains hidden choices', async () => {
    const user = userEvent.setup()
    render(<Ebbinghaus />)
    const svg = screen.getByRole('img'), pair = targets(svg), original = data(pair)
    const right = [...svg.querySelectorAll('[data-context^="right-"]')], rightData = data(right)
    const left = svg.querySelector('[data-context="left-0"]')!
    fireEvent.change(screen.getByRole('slider', { name: 'Large surround radius' }), { target: { value: '44' } })
    expect(left).toHaveAttribute('r', '44')
    expect(left).toHaveAttribute('cx', '282')
    fireEvent.change(screen.getByRole('slider', { name: 'Large surround gap' }), { target: { value: '36' } })
    expect(left).toHaveAttribute('r', '44')
    expect(left).toHaveAttribute('cx', '298')
    expect([...svg.querySelectorAll('[data-context^="right-"]')].every((node, j) => node === right[j])).toBe(true)
    expect(data(right)).toEqual(rightData)
    expect(data(targets(svg))).toEqual(original)
    await user.click(screen.getByRole('button', { name: 'Hide surrounds' }))
    fireEvent.change(screen.getByRole('slider', { name: 'Large surround radius' }), { target: { value: '32' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Large surround gap' }), { target: { value: '24' } })
    expect(svg.querySelector('[data-layer="context"]')).toBeNull()
    expect(targets(svg).every((node, j) => node === pair[j])).toBe(true)
    expect(data(targets(svg))).toEqual(original)
    await user.click(screen.getByRole('button', { name: 'Hide surrounds' }))
    expect(svg.querySelector('[data-context="left-0"]')).toHaveAttribute('cx', '274')
    expect(svg.querySelector('[data-context="left-0"]')).toHaveAttribute('r', '32')
    expect(data([...svg.querySelectorAll('[data-context^="right-"]')])).toEqual(rightData)
  })

  it('keeps size/disclosure independent and resets every choice with keyboard focus retained', async () => {
    const user = userEvent.setup()
    const { container } = render(<Ebbinghaus />)
    const svg = screen.getByRole('img'), original = data(targets(svg))
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('link', { name: "Michael Bach's Ebbinghaus demonstration" })).toHaveAttribute('href', 'https://michaelbach.de/ot/cog-Ebbinghaus/')
    expect(screen.getByRole('link', { name: 'Roberts, Harris & Yates (2005)' })).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/16124270/')
    for (const size of ['240', '720']) {
      await user.selectOptions(screen.getByRole('combobox'), size)
      expect(container.querySelector('[data-ebbinghaus-viewing-frame]')).toHaveStyle({ maxWidth: `${size}px` })
      expect(data(targets(svg))).toEqual(original)
    }
    fireEvent.change(screen.getByRole('slider', { name: 'Large surround radius' }), { target: { value: '32' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Large surround gap' }), { target: { value: '36' } })
    await user.click(screen.getByRole('button', { name: 'Hide surrounds' }))
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    const reset = screen.getByRole('button', { name: 'Reset Ebbinghaus' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(screen.getByRole('slider', { name: 'Large surround radius' })).toHaveValue('40')
    expect(screen.getByRole('slider', { name: 'Large surround gap' })).toHaveValue('20')
    expect(screen.getByRole('combobox')).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide surrounds' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(data(targets(svg))).toEqual(original)
    expect(screen.getByText('Ebbinghaus experiment reset.')).toBeVisible()
  })

  it('isolates instances and keeps image/control references valid and unique', async () => {
    const user = userEvent.setup()
    render(<><Ebbinghaus /><Ebbinghaus /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Ebbinghaus illusion' })
    const ids = [...document.querySelectorAll('[id]')].map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img')
      for (const key of ['aria-labelledby', 'aria-describedby']) expect(document.getElementById(svg.getAttribute(key)!)).not.toBeNull()
      for (const slider of within(article).getAllByRole('slider')) {
        expect(slider).toHaveAccessibleName()
        expect(document.getElementById(slider.getAttribute('aria-describedby')!)).not.toBeNull()
      }
    }
    await user.click(within(first).getByRole('button', { name: 'Hide surrounds' }))
    fireEvent.change(within(first).getByRole('slider', { name: 'Large surround radius' }), { target: { value: '44' } })
    expect(second.querySelectorAll('[data-layer="context"] circle')).toHaveLength(14)
    expect(within(second).getByRole('slider', { name: 'Large surround radius' })).toHaveValue('40')
  })

  it('normalizes invalid stimulus props without non-finite coordinates or altered targets', () => {
    const { container } = render(<EbbinghausStimulus largeRadius={NaN} largeGap={Infinity} contextVisible />)
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/)
    expect(container.querySelector('[data-context="left-0"]')).toHaveAttribute('cx', '278')
    expect(container.querySelector('[data-context="left-0"]')).toHaveAttribute('r', '40')
    expect(container.querySelectorAll('[data-layer="targets"] circle[r="28"][fill="#F28C28"]')).toHaveLength(2)
  })
})
