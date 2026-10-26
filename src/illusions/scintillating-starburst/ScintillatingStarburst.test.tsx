import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import ScintillatingStarburst from './ScintillatingStarburst'

it('removes exactly the rotated polygons while retaining fixed nodes, all attributes, surface and frame', async () => {
  const user = userEvent.setup(), { container } = render(<ScintillatingStarburst />)
  const svg = screen.getByRole('img', { name: 'Scintillating starburst' }), fixed = [...svg.querySelectorAll('[data-fixed-strand]')]
  const markup = fixed.map(node => node.outerHTML), surface = svg.querySelector('[data-layer="surface"]')!, surfaceMarkup = surface.outerHTML
  const crossingGroup = svg.querySelector('[data-layer="crossing-strands"]')!, crossingMarkup = crossingGroup.outerHTML
  const frame = container.querySelector('[data-starburst-viewing-frame]')!, frameStyle = frame.getAttribute('style')
  expect(fixed).toHaveLength(12); expect(svg.querySelectorAll('[data-crossing-strand]')).toHaveLength(12)
  expect(svg.querySelectorAll('polygon')).toHaveLength(24)
  expect([...svg.querySelectorAll('polygon')].every(node => node.getAttribute('points')!.split(' ').length === 7 && node.getAttribute('fill') === 'none' && node.getAttribute('stroke') === '#000000' && node.getAttribute('stroke-width') === '3' && node.getAttribute('stroke-linejoin') === 'miter' && node.getAttribute('stroke-miterlimit') === '4')).toBe(true)
  expect(fixed[0].compareDocumentPosition(crossingGroup) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  const toggle = screen.getByRole('button', { name: 'Hide crossing polygons' })
  for (let repeat = 0; repeat < 2; repeat++) {
    toggle.focus(); await user.keyboard(repeat ? '{Enter}' : ' ')
    expect(toggle).toHaveAttribute('aria-pressed', 'true'); expect(toggle).toHaveFocus()
    expect(svg.querySelectorAll('[data-crossing-strand]')).toHaveLength(0)
    expect(svg.querySelectorAll('polygon')).toHaveLength(12)
    expect([...svg.querySelectorAll('[data-fixed-strand]')].every((node,i) => node === fixed[i])).toBe(true)
    expect(fixed.map(node => node.outerHTML)).toEqual(markup)
    expect(svg.querySelector('[data-layer="surface"]')).toBe(surface); expect(surface.outerHTML).toBe(surfaceMarkup)
    expect(frame.getAttribute('style')).toBe(frameStyle)
    expect(screen.getAllByText(/The crossing polygons are hidden/).some(node => !node.hidden)).toBe(true)
    await user.keyboard('{Enter}'); expect(crossingGroup.outerHTML).toBe(crossingMarkup)
  }
  expect(svg.querySelector('path,line,circle,ellipse,image,mask,filter,linearGradient,radialGradient,animate,animateTransform,[transform],[opacity]')).toBeNull()
  expect(svg.querySelectorAll('rect')).toHaveLength(1)
})

it('retains hidden count/width edits and size/disclosure independence, then resets every default with focus intact', async () => {
  const user = userEvent.setup(), { container } = render(<ScintillatingStarburst />)
  const svg = screen.getByRole('img'), first = svg.querySelector('[data-fixed-strand]')!, originalPoints = first.getAttribute('points')
  const originalFixed = svg.querySelector('[data-layer="fixed-strands"]')!.outerHTML
  const count = screen.getByRole('slider', { name: 'Polygon wreaths' }), width = screen.getByRole('slider', { name: 'Strand width' }), toggle = screen.getByRole('button', { name: 'Hide crossing polygons' })
  expect(count).toHaveValue('6'); expect(width).toHaveValue('3')
  for (const [input,min,max] of [[count,2,6],[width,2,4]] as const) {
    expect(input).toHaveAttribute('min', String(min)); expect(input).toHaveAttribute('max', String(max)); expect(input).toHaveAttribute('step', '1')
  }
  await user.click(toggle); fireEvent.change(count, { target: { value: '2' } }); fireEvent.change(width, { target: { value: '4' } })
  expect(svg.querySelectorAll('polygon')).toHaveLength(4); expect(svg.querySelectorAll('[data-crossing-strand]')).toHaveLength(0)
  expect(svg.querySelector('[data-fixed-strand]')).toBe(first); expect(first).toHaveAttribute('points', originalPoints!)
  expect([...svg.querySelectorAll('polygon')].every(node => node.getAttribute('stroke-width') === '4')).toBe(true)
  const explanation = screen.getByRole('button', { name: 'Why it happens' }); await user.click(explanation)
  expect(screen.getByText(/not an equal-color reveal or a promise/)).toBeVisible()
  expect(screen.getByRole('link', { name: 'Karlovich & Wallisch — Scintillating Starbursts (2021)' })).toHaveAttribute('href', 'https://journals.sagepub.com/doi/full/10.1177/20416695211018720')
  expect(screen.getByText(/Indexed Methods\/Results\/Discussion excerpts consulted/)).toBeVisible()
  for (const value of ['240','720','540']) {
    await user.selectOptions(screen.getByRole('combobox', { name: 'Starburst image size' }), value)
    expect(container.querySelector('[data-starburst-viewing-frame]')).toHaveStyle({ maxWidth: `${value}px` })
    expect(svg.querySelectorAll('[data-crossing-strand]')).toHaveLength(0)
    expect(first).toHaveAttribute('points', originalPoints!)
  }
  await user.click(toggle)
  expect(svg.querySelectorAll('polygon')).toHaveLength(8)
  expect([...svg.querySelectorAll('polygon')].every(node => node.getAttribute('stroke-width') === '4')).toBe(true)
  expect(explanation).toHaveAttribute('aria-expanded', 'true')
  await user.selectOptions(screen.getByRole('combobox'), '240'); await user.click(toggle)
  const reset = screen.getByRole('button', { name: 'Reset starburst' }); reset.focus(); await user.keyboard('{Enter}')
  expect(reset).toHaveFocus(); expect(count).toHaveValue('6'); expect(width).toHaveValue('3')
  expect(screen.getByRole('combobox')).toHaveValue('540'); expect(toggle).toHaveAttribute('aria-pressed', 'false')
  expect(explanation).toHaveAttribute('aria-expanded', 'false'); expect(svg.querySelectorAll('polygon')).toHaveLength(24)
  expect(svg.querySelector('[data-layer="fixed-strands"]')!.outerHTML).toBe(originalFixed)
  expect(svg.querySelector('[data-fixed-strand]')).toBe(first)
})

it('keeps unique image/control references and independent instances', async () => {
  const user = userEvent.setup(); render(<><ScintillatingStarburst /><ScintillatingStarburst /></>)
  const [first,second] = screen.getAllByRole('article', { name: 'Scintillating starburst' })
  const ids = [...document.querySelectorAll('[id]')].map(node => node.id); expect(new Set(ids).size).toBe(ids.length)
  for (const article of [first,second]) {
    const svg = within(article).getByRole('img')
    for (const attr of ['aria-labelledby','aria-describedby']) expect(article.querySelector(`[id="${svg.getAttribute(attr)}"]`)).not.toBeNull()
  }
  const originalSecond = within(second).getByRole('img').outerHTML
  await user.click(within(first).getByRole('button', { name: 'Hide crossing polygons' }))
  fireEvent.change(within(first).getByRole('slider', { name: 'Polygon wreaths' }), { target: { value: '2' } })
  fireEvent.change(within(first).getByRole('slider', { name: 'Strand width' }), { target: { value: '2' } })
  await user.selectOptions(within(first).getByRole('combobox'), '720')
  expect(first.querySelectorAll('polygon')).toHaveLength(4)
  expect(within(second).getByRole('img').outerHTML).toBe(originalSecond)
  expect(within(second).getByRole('slider', { name: 'Polygon wreaths' })).toHaveValue('6')
})
