import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import SkyeGrating from './SkyeGrating'

const proof = 'The blue bands stayed straight and parallel. Only the check marks were removed.'

describe('Skye grating experience', () => {
  it('starts with four straight blue bands beneath exactly 104 four-square check marks', () => {
    render(<SkyeGrating />)
    const svg = screen.getByRole('img', { name: 'Skye oblique grating' })
    expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
    expect(svg).toHaveAccessibleDescription(/Four straight horizontal blue bands/)
    expect([...svg.querySelectorAll('[data-layer]')].map(n => n.getAttribute('data-layer'))).toEqual(['surface', 'plot', 'columns', 'bands', 'check-marks'])
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    expect(svg.querySelector('[data-layer="plot"]')).toHaveAttribute('fill', '#DCEAF6')
    expect(svg.querySelector('[data-layer="columns"]')).toHaveAttribute('fill', '#777777')
    expect(svg.querySelectorAll('[data-column]')).toHaveLength(7)
    expect(svg.querySelector('[data-layer="bands"]')).toHaveAttribute('fill', '#8FAEE3')
    expect([...svg.querySelectorAll('[data-band]')].map(n => ['x', 'y', 'width', 'height'].map(a => n.getAttribute(a)))).toEqual(['72', '168', '264', '360'].map(y => ['24', y, '672', '48']))
    expect(svg.querySelectorAll('[data-mark]')).toHaveLength(104)
    expect(svg.querySelectorAll('polygon')).toHaveLength(416)
    expect(svg.querySelector('path,line,polyline,filter,image,animate,linearGradient,mask,clipPath,[transform],[opacity]')).toBeNull()
    const slider = screen.getByRole('slider', { name: 'Check-mark half-diagonal' })
    expect(slider).toHaveValue('10')
    for (const [attribute, value] of Object.entries({ min: '8', max: '14', step: '2' })) expect(slider).toHaveAttribute(attribute, value)
    expect(slider).toHaveAttribute('aria-valuetext', '10 drawing units')
    expect(screen.getByRole('checkbox', { name: 'Reverse alternate bands' })).toBeChecked()
    expect(screen.getByRole('combobox', { name: 'Grating image size' })).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide check marks' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText(proof)).not.toBeVisible()
  })

  it('removes only checker context, keeps all underlying nodes, and restores hidden parameter changes', async () => {
    const user = userEvent.setup()
    const { container } = render(<StrictMode><SkyeGrating /></StrictMode>)
    const svg = screen.getByRole('img'), toggle = screen.getByRole('button', { name: 'Hide check marks' })
    const persistent = [...svg.querySelectorAll('rect')], markup = persistent.map(n => n.outerHTML)
    const frame = container.querySelector('[data-skye-viewing-frame]')!, frameStyle = frame.getAttribute('style')
    const marks = svg.querySelector('[data-layer="check-marks"]')!.outerHTML
    for (let repeat = 0; repeat < 2; repeat++) {
      toggle.focus(); await user.keyboard(' ')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(svg.querySelectorAll('polygon')).toHaveLength(0)
      expect([...svg.querySelectorAll('rect')]).toEqual(persistent)
      expect([...svg.querySelectorAll('rect')].every((n, i) => n === persistent[i])).toBe(true)
      expect(persistent.map(n => n.outerHTML)).toEqual(markup)
      expect(frame.getAttribute('style')).toBe(frameStyle)
      expect(svg).toHaveAttribute('viewBox', '0 0 720 480')
      expect(screen.getAllByText(proof).some(n => !n.hidden)).toBe(true)
      expect(toggle).toHaveFocus()
      await user.keyboard('{Enter}')
      expect(svg.querySelector('[data-layer="check-marks"]')!.outerHTML).toBe(marks)
    }
    await user.click(toggle)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '14' } })
    await user.click(screen.getByRole('checkbox'))
    expect(svg.querySelectorAll('polygon')).toHaveLength(0)
    expect(persistent.map(n => n.outerHTML)).toEqual(markup)
    await user.click(toggle)
    expect(svg.querySelector('[data-mark="0-0-0"] [data-quadrant="top"]')).toHaveAttribute('points', '72,58 79,65 72,72 65,65')
    expect(svg.querySelector('[data-mark="1-0-0"] [data-quadrant="top"]')).toHaveAttribute('fill', '#000000')
    expect(svg.querySelectorAll('polygon')).toHaveLength(416)
    expect(persistent.map(n => n.outerHTML)).toEqual(markup)
  })

  it('keeps size and explanation independent, and resets every setting without moving keyboard focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<SkyeGrating />)
    const svg = screen.getByRole('img'), bands = svg.querySelector('[data-layer="bands"]')!, originalBands = bands.outerHTML
    const initialMarks = svg.querySelector('[data-layer="check-marks"]')!.outerHTML
    const toggle = screen.getByRole('button', { name: 'Hide check marks' }), explanation = screen.getByRole('button', { name: 'Why it happens' })
    await user.click(toggle)
    await user.click(explanation)
    expect(screen.getByText(/Original OpticEye geometric variation after Victoria Skye/)).toBeVisible()
    expect(screen.getByRole('link', { name: 'Michael Bach — Skye’s Oblique Grating' })).toHaveAttribute('href', 'https://michaelbach.de/ot/ang-SkyeGrating/index.html')
    expect(screen.getByRole('link', { name: /Kitaoka — Tilt illusions/ })).toHaveAttribute('href', 'https://onlinelibrary.wiley.com/doi/full/10.1111/j.1468-5884.2007.00328.x')
    expect(screen.getByText(/not a settled complete explanation/)).toBeVisible()
    for (const width of ['720', '240', '540']) {
      await user.selectOptions(screen.getByRole('combobox'), width)
      expect(container.querySelector('[data-skye-viewing-frame]')).toHaveStyle({ maxWidth: `${width}px` })
      expect(svg.querySelector('[data-layer="bands"]')).toBe(bands)
      expect(bands.outerHTML).toBe(originalBands)
      expect(svg.querySelectorAll('polygon')).toHaveLength(0)
      expect(explanation).toHaveAttribute('aria-expanded', 'true')
    }
    fireEvent.change(screen.getByRole('slider'), { target: { value: '8' } })
    await user.click(screen.getByRole('checkbox'))
    await user.selectOptions(screen.getByRole('combobox'), '720')
    const reset = screen.getByRole('button', { name: 'Reset Skye grating' })
    reset.focus(); await user.keyboard('{Enter}')
    expect(reset).toHaveFocus()
    expect(screen.getByRole('slider')).toHaveValue('10')
    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(screen.getByRole('combobox')).toHaveValue('540')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(explanation).toHaveAttribute('aria-expanded', 'false')
    expect(svg.querySelector('[data-layer="check-marks"]')!.outerHTML).toBe(initialMarks)
    expect(bands.outerHTML).toBe(originalBands)
    expect(screen.getByText('Skye grating reset.')).toBeVisible()
  })

  it('uses unique IDs and local controls for independent copies', async () => {
    const user = userEvent.setup()
    render(<><SkyeGrating /><SkyeGrating /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Skye oblique grating' })
    const ids = [...document.querySelectorAll('[id]')].map(n => n.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img')
      for (const attr of ['aria-labelledby', 'aria-describedby']) expect(article.querySelector(`[id="${svg.getAttribute(attr)}"]`)).not.toBeNull()
    }
    await user.click(within(first).getByRole('button', { name: 'Hide check marks' }))
    fireEvent.change(within(first).getByRole('slider'), { target: { value: '14' } })
    await user.click(within(first).getByRole('checkbox'))
    await user.selectOptions(within(first).getByRole('combobox'), '240')
    expect(first.querySelectorAll('polygon')).toHaveLength(0)
    expect(second.querySelectorAll('polygon')).toHaveLength(416)
    expect(within(second).getByRole('slider')).toHaveValue('10')
    expect(within(second).getByRole('checkbox')).toBeChecked()
    expect(within(second).getByRole('combobox')).toHaveValue('540')
  })
})
