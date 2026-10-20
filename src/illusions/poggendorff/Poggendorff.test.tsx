import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Poggendorff from './Poggendorff'
import PoggendorffStimulus from './PoggendorffStimulus'

const proof = 'Same straight diagonals. Only the yellow strips were removed.'

describe('Poggendorff experience', () => {
  it('draws complete diagonals before eight yellow strips with exact palette and initial controls', () => {
    render(<Poggendorff />)
    const svg = screen.getByRole('img', { name: 'Poggendorff illusion' })
    expect(svg).toHaveAccessibleDescription(/eight opaque yellow strips/)
    expect([...svg.children].map((n) => n.tagName)).toEqual(['title', 'desc', 'rect', 'g', 'g'])
    expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    const lines = svg.querySelector('[data-layer="lines"]')!
    expect(lines).toHaveAttribute('stroke', '#000000')
    expect(lines).toHaveAttribute('stroke-width', '3')
    expect(lines).toHaveAttribute('stroke-linecap', 'butt')
    expect(lines).toHaveAttribute('fill', 'none')
    expect(lines.querySelectorAll('line')).toHaveLength(31)
    const strips = svg.querySelector('[data-layer="strips"]')!
    expect(strips).toHaveAttribute('fill', '#FFFF00')
    expect(strips).toHaveAttribute('stroke', 'none')
    expect(strips.querySelectorAll('rect')).toHaveLength(8)
    expect(screen.getByRole('slider', { name: 'Line angle' })).toHaveValue('70')
    expect(screen.getByRole('slider', { name: 'Strip width' })).toHaveValue('40')
    expect(screen.getByRole('combobox', { name: 'Poggendorff image size' })).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide strips' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText(proof)).not.toBeVisible()
    expect(svg.querySelector('path,circle,filter,animate,mask,clipPath,[transform],[opacity]')).toBeNull()
  })

  it('removes only the strips, retaining every original line and surface through repeated reveal', async () => {
    const user = userEvent.setup()
    render(<StrictMode><Poggendorff /></StrictMode>)
    const svg = screen.getByRole('img'), lines = [...svg.querySelectorAll('line')], surface = svg.querySelector('[data-layer="surface"]')!
    const lineData = lines.map((line) => line.outerHTML), surfaceData = surface.outerHTML
    const toggle = screen.getByRole('button', { name: 'Hide strips' })
    for (let i = 0; i < 3; i++) {
      toggle.focus()
      await user.keyboard(' ')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(svg.querySelector('[data-layer="strips"]')).toBeNull()
      expect([...svg.querySelectorAll('line')].every((line, j) => line === lines[j])).toBe(true)
      expect([...svg.querySelectorAll('line')].map((line) => line.outerHTML)).toEqual(lineData)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceData)
      expect(svg).toHaveAccessibleDescription(/same complete parallel straight diagonals/)
      expect([...svg.children].map((n) => n.tagName)).toEqual(['title', 'desc', 'rect', 'g'])
      await user.click(toggle)
      expect(svg.querySelectorAll('[data-layer="strips"] rect')).toHaveLength(8)
      expect([...svg.querySelectorAll('line')].map((line) => line.outerHTML)).toEqual(lineData)
    }
  })

  it('keeps width changes context-only and permits explicit angle changes while hidden', async () => {
    const user = userEvent.setup()
    render(<Poggendorff />)
    const svg = screen.getByRole('img'), group = svg.querySelector('[data-layer="lines"]')!, original = group.outerHTML
    fireEvent.change(screen.getByRole('slider', { name: 'Strip width' }), { target: { value: '64' } })
    expect(group.outerHTML).toBe(original)
    expect([...svg.querySelectorAll('[data-layer="strips"] rect')].every((rect) => rect.getAttribute('width') === '64')).toBe(true)
    await user.click(screen.getByRole('button', { name: 'Hide strips' }))
    const center = svg.querySelectorAll('line')[15]
    fireEvent.change(screen.getByRole('slider', { name: 'Line angle' }), { target: { value: '80' } })
    expect(svg.querySelectorAll('line')).toHaveLength(57)
    expect(svg.querySelectorAll('line')[28]).toBe(center)
    expect(group.outerHTML).not.toBe(original)
    expect(svg.querySelector('[data-layer="strips"]')).toBeNull()
    const changed = group.outerHTML
    fireEvent.change(screen.getByRole('slider', { name: 'Strip width' }), { target: { value: '16' } })
    expect(group.outerHTML).toBe(changed)
    await user.click(screen.getByRole('button', { name: 'Hide strips' }))
    expect([...svg.querySelectorAll('[data-layer="strips"] rect')].every((rect) => rect.getAttribute('width') === '16')).toBe(true)
    expect(group.outerHTML).toBe(changed)
  })

  it('keeps size and disclosure independent, and Reset restores defaults with focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<Poggendorff />)
    const svg = screen.getByRole('img'), original = svg.querySelector('[data-layer="lines"]')!.outerHTML
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('link', { name: "Michael Bach's Poggendorff demonstration" })).toHaveAttribute('href', 'https://michaelbach.de/ot/ang-poggendorff/')
    expect(screen.getByRole('button', { name: 'Hide strips' })).toHaveAttribute('aria-pressed', 'false')
    for (const size of ['240', '720']) {
      await user.selectOptions(screen.getByRole('combobox'), size)
      expect(container.querySelector('[data-poggendorff-viewing-frame]')).toHaveStyle({ maxWidth: `${size}px` })
      expect(svg.querySelector('[data-layer="lines"]')!.outerHTML).toBe(original)
    }
    fireEvent.change(screen.getByRole('slider', { name: 'Line angle' }), { target: { value: '45' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Strip width' }), { target: { value: '64' } })
    await user.click(screen.getByRole('button', { name: 'Hide strips' }))
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    const reset = screen.getByRole('button', { name: 'Reset Poggendorff' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(screen.getByRole('slider', { name: 'Line angle' })).toHaveValue('70')
    expect(screen.getByRole('slider', { name: 'Strip width' })).toHaveValue('40')
    expect(screen.getByRole('combobox')).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide strips' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(svg.querySelector('[data-layer="lines"]')!.outerHTML).toBe(original)
    expect(screen.getByText('Poggendorff experiment reset.')).toBeVisible()
  })

  it('isolates instances and keeps control/image references valid and unique', async () => {
    const user = userEvent.setup()
    render(<><Poggendorff /><Poggendorff /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Poggendorff illusion' })
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
    await user.click(within(first).getByRole('button', { name: 'Hide strips' }))
    fireEvent.change(within(first).getByRole('slider', { name: 'Line angle' }), { target: { value: '80' } })
    expect(second.querySelectorAll('[data-layer="strips"] rect')).toHaveLength(8)
    expect(within(second).getByRole('slider', { name: 'Line angle' })).toHaveValue('70')
  })

  it('normalizes invalid stimulus props without emitting non-finite coordinates', () => {
    const { container } = render(<PoggendorffStimulus angle={NaN} stripWidth={Infinity} stripVisible />)
    expect(container.querySelector('[data-layer="strips"] rect')).toHaveAttribute('width', '40')
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/)
    expect(container.querySelectorAll('line')).toHaveLength(31)
  })
})
