import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import OppelKundt from './OppelKundt'

it('removes only internal dividers and retains the original endpoint nodes, attributes, surface and frame', async () => {
  const user = userEvent.setup(), { container } = render(<OppelKundt />)
  const svg = screen.getByRole('img', { name: 'Oppel–Kundt illusion' })
  const markers = [...svg.querySelectorAll('[data-endpoint-marker]')], original = markers.map(node => node.outerHTML)
  const surface = svg.querySelector('[data-layer="surface"]')!, surfaceMarkup = surface.outerHTML
  const frame = container.querySelector('[data-oppel-viewing-frame]')!, frameStyle = frame.getAttribute('style')
  const dividerMarkup = svg.querySelector('[data-layer="dividers"]')!.outerHTML
  expect(markers).toHaveLength(3)
  expect(svg.querySelectorAll('[data-divider]')).toHaveLength(6)
  expect(markers.map(node => Number(node.getAttribute('x1')))).toEqual([120,360,600])
  expect([...svg.querySelectorAll('line')].every(node => node.getAttribute('stroke') === '#171717' && node.getAttribute('stroke-width') === '6' && node.getAttribute('stroke-linecap') === 'butt')).toBe(true)
  expect(screen.getByText('Which interval looks wider: the divided one or the empty one?')).toBeVisible()
  const toggle = screen.getByRole('button', { name: 'Hide dividers' })
  for (let repeat = 0; repeat < 2; repeat++) {
    toggle.focus(); await user.keyboard(repeat ? '{Enter}' : ' ')
    expect(toggle).toHaveFocus(); expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(svg.querySelectorAll('[data-divider]')).toHaveLength(0)
    expect(svg.querySelectorAll('line')).toHaveLength(3)
    expect([...svg.querySelectorAll('[data-endpoint-marker]')].every((node,index) => node === markers[index])).toBe(true)
    expect(markers.map(node => node.outerHTML)).toEqual(original)
    expect(svg.querySelector('[data-layer="surface"]')).toBe(surface); expect(surface.outerHTML).toBe(surfaceMarkup)
    expect(frame.getAttribute('style')).toBe(frameStyle)
    expect(screen.getAllByText('Only the internal dividers were removed. The endpoint intervals are both equal.').every(node => !node.hidden)).toBe(true)
    await user.keyboard('{Enter}')
    expect(svg.querySelector('[data-layer="dividers"]')!.outerHTML).toBe(dividerMarkup)
  }
  expect(svg.querySelector('path,circle,ellipse,polygon,text,image,mask,filter,linearGradient,radialGradient,animate,animateTransform,[transform],[opacity]')).toBeNull()
  expect(svg.querySelectorAll('rect')).toHaveLength(1)
})

it('keeps hidden count/side choices, size and explanation independent, then resets all defaults with focus intact', async () => {
  const user = userEvent.setup(), { container } = render(<OppelKundt />)
  const svg = screen.getByRole('img'), marker = svg.querySelector('[data-endpoint-marker]')!, markerMarkup = marker.outerHTML
  const count = screen.getByRole('slider', { name: 'Internal dividers' }), side = screen.getByRole('combobox', { name: 'Filled side' })
  const size = screen.getByRole('combobox', { name: 'Filled-space image size' }), toggle = screen.getByRole('button', { name: 'Hide dividers' })
  expect(count).toHaveAttribute('min', '0'); expect(count).toHaveAttribute('max', '12'); expect(count).toHaveAttribute('step', '1')
  expect(count).toHaveValue('6'); expect(side).toHaveValue('left'); expect(size).toHaveValue('540')
  await user.click(toggle)
  fireEvent.change(count, { target: { value: '12' } }); await user.selectOptions(side, 'right')
  expect(svg.querySelectorAll('[data-divider]')).toHaveLength(0)
  const disclosure = screen.getByRole('button', { name: 'Why it happens' }); await user.click(disclosure)
  expect(screen.getByRole('link', { name: /Surkys/ })).toHaveAttribute('href', 'https://www.nature.com/articles/s41598-025-23643-2')
  for (const selected of ['240','720','540']) {
    await user.selectOptions(size, selected)
    expect(container.querySelector('[data-oppel-viewing-frame]')).toHaveStyle({ maxWidth: `${selected}px` })
    expect(svg.querySelectorAll('[data-divider]')).toHaveLength(0)
    expect(svg.querySelector('[data-endpoint-marker]')).toBe(marker); expect(marker.outerHTML).toBe(markerMarkup)
  }
  await user.click(toggle)
  expect(svg.querySelectorAll('[data-divider]')).toHaveLength(12)
  expect([...svg.querySelectorAll('[data-divider]')].every(node => Number(node.getAttribute('x1')) > 360 && Number(node.getAttribute('x1')) < 600)).toBe(true)
  expect(disclosure).toHaveAttribute('aria-expanded', 'true')
  await user.click(toggle); await user.selectOptions(size, '240')
  const reset = screen.getByRole('button', { name: 'Reset Oppel–Kundt' }); reset.focus(); await user.keyboard('{Enter}')
  expect(reset).toHaveFocus(); expect(count).toHaveValue('6'); expect(side).toHaveValue('left'); expect(size).toHaveValue('540')
  expect(toggle).toHaveAttribute('aria-pressed', 'false'); expect(disclosure).toHaveAttribute('aria-expanded', 'false')
  expect(svg.querySelectorAll('[data-divider]')).toHaveLength(6)
  expect([...svg.querySelectorAll('[data-divider]')].every(node => Number(node.getAttribute('x1')) > 120 && Number(node.getAttribute('x1')) < 360)).toBe(true)
  expect(svg.querySelector('[data-endpoint-marker]')).toBe(marker); expect(marker.outerHTML).toBe(markerMarkup)
})

it('describes zero dividers truthfully before and after hiding, including hidden count changes without stale status', async () => {
  const user = userEvent.setup(), { container } = render(<OppelKundt />)
  const count = screen.getByRole('slider', { name: 'Internal dividers' }), toggle = screen.getByRole('button', { name: 'Hide dividers' })
  fireEvent.change(count, { target: { value: '0' } })
  expect(screen.getByText('How do the two intervals compare?')).toBeVisible()
  expect(screen.getByText('No internal dividers selected; both intervals are empty.')).toBeVisible()
  expect(screen.getByRole('img').querySelectorAll('line')).toHaveLength(3)
  expect(toggle).toBeEnabled(); await user.click(toggle)
  expect(toggle).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getAllByText('Dividers hidden; none were selected.').every(node => !node.hidden)).toBe(true)
  fireEvent.change(count, { target: { value: '6' } })
  expect(screen.getByText('Which interval looks wider: the divided one or the empty one?')).toBeVisible()
  expect(screen.queryByText('Dividers hidden; none were selected.')).toBeNull()
  expect(container.querySelector('output')).toBeEmptyDOMElement()
  expect(screen.getByRole('img').querySelectorAll('[data-divider]')).toHaveLength(0)
  fireEvent.change(count, { target: { value: '0' } })
  expect(screen.queryByText('Only the internal dividers were removed. The endpoint intervals are both equal.')).toBeNull()
  expect(screen.getByText('Dividers hidden; none were selected.')).toBeVisible()
  await user.selectOptions(screen.getByRole('combobox', { name: 'Filled side' }), 'right')
  expect(screen.getByText('Dividers hidden; none were selected.')).toBeVisible()
  await user.click(toggle)
  expect(toggle).toHaveAttribute('aria-pressed', 'false')
  expect(container.querySelector('output')).toHaveTextContent('Dividers shown; none are selected.')
  expect(screen.getByRole('img').querySelectorAll('line')).toHaveLength(3)
})

it('keeps unique labelled references and independent instances', async () => {
  const user = userEvent.setup(); render(<><OppelKundt /><OppelKundt /></>)
  const [first,second] = screen.getAllByRole('article', { name: 'Oppel–Kundt illusion' })
  const ids = [...document.querySelectorAll('[id]')].map(node => node.id); expect(new Set(ids).size).toBe(ids.length)
  for (const article of [first,second]) {
    const svg = within(article).getByRole('img')
    for (const attr of ['aria-labelledby','aria-describedby']) expect(article.querySelector(`[id="${svg.getAttribute(attr)}"]`)).not.toBeNull()
    for (const control of article.querySelectorAll('input,select')) expect(article.querySelector(`label[for="${control.id}"]`)).not.toBeNull()
  }
  const other = within(second).getByRole('img').outerHTML
  await user.click(within(first).getByRole('button', { name: 'Hide dividers' }))
  fireEvent.change(within(first).getByRole('slider'), { target: { value: '0' } })
  await user.selectOptions(within(first).getByRole('combobox', { name: 'Filled side' }), 'right')
  await user.selectOptions(within(first).getByRole('combobox', { name: 'Filled-space image size' }), '720')
  expect(within(second).getByRole('img').outerHTML).toBe(other)
  expect(within(second).getByRole('slider')).toHaveValue('6')
})
