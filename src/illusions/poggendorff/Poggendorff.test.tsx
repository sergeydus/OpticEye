import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Poggendorff from './Poggendorff'
import PoggendorffStimulus from './PoggendorffStimulus'

describe('Poggendorff experience', () => {
  it('draws a complete diagonal before its strip with exact palette and initial controls', () => {
    render(<Poggendorff />)
    const svg = screen.getByRole('img', { name: 'Poggendorff illusion' })
    expect(svg).toHaveAccessibleDescription(/separated by an opaque gray strip/)
    expect([...svg.children].map((n) => n.tagName)).toEqual(['title', 'desc', 'rect', 'line', 'rect'])
    expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    const line = svg.querySelector('line')!
    expect(line).toHaveAttribute('stroke', '#000000')
    expect(line).toHaveAttribute('stroke-width', '6')
    expect(line).toHaveAttribute('stroke-linecap', 'butt')
    const strip = svg.querySelector('[data-layer="strip"]')!
    expect(strip).toHaveAttribute('fill', '#C8C8C8')
    expect(strip).toHaveAttribute('stroke', '#000000')
    expect(strip).toHaveAttribute('stroke-width', '2')
    expect(strip).toHaveAttribute('stroke-linejoin', 'miter')
    expect(screen.getByRole('slider', { name: 'Line angle' })).toHaveValue('45')
    expect(screen.getByRole('slider', { name: 'Strip width' })).toHaveValue('112')
    expect(screen.getByRole('combobox', { name: 'Poggendorff image size' })).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide strip' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('One straight line. Only the strip was removed.')).not.toBeVisible()
    expect(svg.querySelector('path,circle,filter,animate,mask,clipPath,[transform],[opacity]')).toBeNull()
  })

  it('removes only the strip, retaining the original complete line and surface through repeated reveal', async () => {
    const user = userEvent.setup()
    render(<StrictMode><Poggendorff /></StrictMode>)
    const svg = screen.getByRole('img'), line = svg.querySelector('line')!, surface = svg.querySelector('[data-layer="surface"]')!
    const lineData = line.outerHTML, surfaceData = surface.outerHTML
    const toggle = screen.getByRole('button', { name: 'Hide strip' })
    for (let i = 0; i < 3; i++) {
      toggle.focus()
      await user.keyboard(' ')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(svg.querySelector('[data-layer="strip"]')).toBeNull()
      expect(svg.querySelector('line')).toBe(line)
      expect(line.outerHTML).toBe(lineData)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceData)
      expect(svg).toHaveAccessibleDescription(/same complete straight diagonal/)
      expect([...svg.children].map((n) => n.tagName)).toEqual(['title', 'desc', 'rect', 'line'])
      await user.click(toggle)
      expect(svg.querySelectorAll('line')).toHaveLength(1)
      expect(line.outerHTML).toBe(lineData)
    }
  })

  it('keeps width changes context-only and permits explicit angle changes while hidden', async () => {
    const user = userEvent.setup()
    render(<Poggendorff />)
    const svg = screen.getByRole('img'), line = svg.querySelector('line')!, original = line.outerHTML
    fireEvent.change(screen.getByRole('slider', { name: 'Strip width' }), { target: { value: '160' } })
    expect(line.outerHTML).toBe(original)
    expect(svg.querySelector('[data-layer="strip"]')).toHaveAttribute('x', '280')
    await user.click(screen.getByRole('button', { name: 'Hide strip' }))
    fireEvent.change(screen.getByRole('slider', { name: 'Line angle' }), { target: { value: '65' } })
    expect(svg.querySelector('line')).toBe(line)
    expect(line.outerHTML).not.toBe(original)
    expect(Math.hypot(Number(line.getAttribute('x2')) - Number(line.getAttribute('x1')), Number(line.getAttribute('y2')) - Number(line.getAttribute('y1')))).toBeCloseTo(480, 10)
    expect(svg.querySelector('[data-layer="strip"]')).toBeNull()
    const changed = line.outerHTML
    fireEvent.change(screen.getByRole('slider', { name: 'Strip width' }), { target: { value: '64' } })
    expect(line.outerHTML).toBe(changed)
    await user.click(screen.getByRole('button', { name: 'Hide strip' }))
    expect(svg.querySelector('[data-layer="strip"]')).toHaveAttribute('width', '64')
    expect(line.outerHTML).toBe(changed)
  })

  it('keeps size and disclosure independent, and Reset restores defaults with focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<Poggendorff />)
    const svg = screen.getByRole('img'), original = svg.querySelector('line')!.outerHTML
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('link', { name: "Michael Bach's Poggendorff demonstration" })).toHaveAttribute('href', 'https://michaelbach.de/ot/ang-poggendorff/')
    expect(screen.getByRole('button', { name: 'Hide strip' })).toHaveAttribute('aria-pressed', 'false')
    for (const size of ['240', '720']) {
      await user.selectOptions(screen.getByRole('combobox'), size)
      expect(container.querySelector('[data-poggendorff-viewing-frame]')).toHaveStyle({ maxWidth: `${size}px` })
      expect(svg.querySelector('line')!.outerHTML).toBe(original)
    }
    fireEvent.change(screen.getByRole('slider', { name: 'Line angle' }), { target: { value: '25' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Strip width' }), { target: { value: '160' } })
    await user.click(screen.getByRole('button', { name: 'Hide strip' }))
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    const reset = screen.getByRole('button', { name: 'Reset Poggendorff' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(screen.getByRole('slider', { name: 'Line angle' })).toHaveValue('45')
    expect(screen.getByRole('slider', { name: 'Strip width' })).toHaveValue('112')
    expect(screen.getByRole('combobox')).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide strip' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(svg.querySelector('line')!.outerHTML).toBe(original)
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
    await user.click(within(first).getByRole('button', { name: 'Hide strip' }))
    fireEvent.change(within(first).getByRole('slider', { name: 'Line angle' }), { target: { value: '65' } })
    expect(second.querySelector('[data-layer="strip"]')).not.toBeNull()
    expect(within(second).getByRole('slider', { name: 'Line angle' })).toHaveValue('45')
  })

  it('normalizes invalid stimulus props without emitting non-finite coordinates', () => {
    const { container } = render(<PoggendorffStimulus angle={NaN} stripWidth={Infinity} stripVisible />)
    expect(container.querySelector('[data-layer="strip"]')).toHaveAttribute('width', '112')
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/)
    const line = container.querySelector('line')!
    expect(Number(line.getAttribute('x1'))).toBeCloseTo(190.294372515, 8)
  })
})
