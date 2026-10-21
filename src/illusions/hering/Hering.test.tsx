import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Hering from './Hering'
import HeringStimulus from './HeringStimulus'

const proof = 'The red lines are straight and parallel. Only the rays were removed.'
const targets = (svg: Element) => [...svg.querySelectorAll('[data-layer="targets"] line')]
const data = (nodes: Element[]) => nodes.map((node) => node.outerHTML)

describe('Hering experience', () => {
  it('starts with 60 rays behind exact red targets and the documented controls', () => {
    render(<Hering />)
    const svg = screen.getByRole('img', { name: 'Hering illusion' })
    expect(svg).toHaveAccessibleDescription(/fan of 60 dark rays/)
    expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
    expect([...svg.children].map((n) => n.tagName)).toEqual(['title', 'desc', 'rect', 'g', 'g'])
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    const rays = svg.querySelector('[data-layer="rays"]')!
    expect(rays).toHaveAttribute('stroke', '#333333')
    expect(rays).toHaveAttribute('stroke-width', '2.5')
    expect(rays.querySelectorAll('line')).toHaveLength(60)
    const group = svg.querySelector('[data-layer="targets"]')!
    expect(rays.nextElementSibling).toBe(group)
    expect(group).toHaveAttribute('stroke', '#CC2A2A')
    expect(group).toHaveAttribute('stroke-width', '6')
    expect(group).toHaveAttribute('stroke-linecap', 'butt')
    expect(group).toHaveAttribute('fill', 'none')
    const pair = targets(svg)
    expect(pair).toHaveLength(2)
    expect(pair.map((n) => n.getAttribute('x1'))).toEqual(['320', '400'])
    for (const line of pair) {
      expect(line.getAttribute('x1')).toBe(line.getAttribute('x2'))
      expect(line).toHaveAttribute('y1', '60')
      expect(line).toHaveAttribute('y2', '420')
    }
    expect(screen.getByRole('slider', { name: 'Ray count' })).toHaveValue('60')
    expect(screen.getByRole('combobox', { name: 'Hering image size' })).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide rays' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText(proof)).not.toBeVisible()
    expect(svg.querySelector('path,circle,filter,animate,mask,clipPath,[transform],linearGradient')).toBeNull()
  })

  it('removes only the fan while retaining both straight target nodes, their group and surface', async () => {
    const user = userEvent.setup()
    render(<StrictMode><Hering /></StrictMode>)
    const svg = screen.getByRole('img'), pair = targets(svg), original = data(pair)
    const group = svg.querySelector('[data-layer="targets"]')!, groupData = group.outerHTML
    const surface = svg.querySelector('[data-layer="surface"]')!, surfaceData = surface.outerHTML
    const toggle = screen.getByRole('button', { name: 'Hide rays' })
    for (let i = 0; i < 3; i++) {
      toggle.focus()
      await user.keyboard(' ')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(svg.querySelector('[data-layer="rays"]')).toBeNull()
      expect(svg.querySelectorAll('line')).toHaveLength(2)
      expect(targets(svg).every((node, j) => node === pair[j])).toBe(true)
      expect(data(targets(svg))).toEqual(original)
      expect(svg.querySelector('[data-layer="targets"]')).toBe(group)
      expect(group.outerHTML).toBe(groupData)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceData)
      expect(svg).toHaveAccessibleDescription(/same two straight parallel red lines/)
      await user.click(toggle)
      expect(svg.querySelectorAll('[data-layer="rays"] line')).toHaveLength(60)
      expect(data(targets(svg))).toEqual(original)
    }
  })

  it('changes only ray geometry at every supported count, including hidden updates', async () => {
    const user = userEvent.setup()
    render(<Hering />)
    const svg = screen.getByRole('img'), pair = targets(svg), original = data(pair)
    const slider = screen.getByRole('slider', { name: 'Ray count' })
    for (const count of [24, 36, 48, 60]) {
      fireEvent.change(slider, { target: { value: String(count) } })
      expect(svg.querySelectorAll('[data-layer="rays"] line')).toHaveLength(count)
      expect(targets(svg).every((node, j) => node === pair[j])).toBe(true)
      expect(data(targets(svg))).toEqual(original)
      expect(svg).toHaveAccessibleDescription(new RegExp(`fan of ${count} dark rays`))
    }
    await user.click(screen.getByRole('button', { name: 'Hide rays' }))
    fireEvent.change(slider, { target: { value: '24' } })
    expect(svg.querySelector('[data-layer="rays"]')).toBeNull()
    expect(data(targets(svg))).toEqual(original)
    await user.click(screen.getByRole('button', { name: 'Hide rays' }))
    expect(svg.querySelectorAll('[data-layer="rays"] line')).toHaveLength(24)
  })

  it('keeps size/disclosure independent and restores all defaults on Reset with focus retained', async () => {
    const user = userEvent.setup()
    const { container } = render(<Hering />)
    const svg = screen.getByRole('img'), original = data(targets(svg))
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('link', { name: "Michael Bach's Hering demonstration" })).toHaveAttribute('href', 'https://michaelbach.de/ot/ang-hering/')
    for (const size of ['240', '720']) {
      await user.selectOptions(screen.getByRole('combobox'), size)
      expect(container.querySelector('[data-hering-viewing-frame]')).toHaveStyle({ maxWidth: `${size}px` })
      expect(data(targets(svg))).toEqual(original)
    }
    fireEvent.change(screen.getByRole('slider', { name: 'Ray count' }), { target: { value: '24' } })
    await user.click(screen.getByRole('button', { name: 'Hide rays' }))
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    const reset = screen.getByRole('button', { name: 'Reset Hering' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(screen.getByRole('slider', { name: 'Ray count' })).toHaveValue('60')
    expect(screen.getByRole('combobox')).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide rays' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(data(targets(svg))).toEqual(original)
    expect(svg.querySelectorAll('[data-layer="rays"] line')).toHaveLength(60)
    expect(screen.getByText('Hering experiment reset.')).toBeVisible()
  })

  it('isolates instances and keeps image/control references unique and valid', async () => {
    const user = userEvent.setup()
    render(<><Hering /><Hering /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Hering illusion' })
    const ids = [...document.querySelectorAll('[id]')].map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img')
      for (const key of ['aria-labelledby', 'aria-describedby']) expect(document.getElementById(svg.getAttribute(key)!)).not.toBeNull()
      const slider = within(article).getByRole('slider')
      expect(slider).toHaveAccessibleName('Ray count')
      expect(document.getElementById(slider.getAttribute('aria-describedby')!)).not.toBeNull()
    }
    await user.click(within(first).getByRole('button', { name: 'Hide rays' }))
    fireEvent.change(within(first).getByRole('slider'), { target: { value: '24' } })
    expect(second.querySelectorAll('[data-layer="rays"] line')).toHaveLength(60)
    expect(within(second).getByRole('slider')).toHaveValue('60')
  })

  it('normalizes invalid stimulus props without non-finite coordinates or modified targets', () => {
    const { container } = render(<HeringStimulus rayCount={Infinity} raysVisible />)
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/)
    expect(container.querySelectorAll('[data-layer="rays"] line')).toHaveLength(60)
    expect(container.querySelectorAll('[data-layer="targets"] line')).toHaveLength(2)
  })
})
