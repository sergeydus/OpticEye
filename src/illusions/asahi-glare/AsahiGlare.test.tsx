import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import AsahiGlare from './AsahiGlare'
import AsahiGlareStimulus from './AsahiGlareStimulus'

it('removes only the eight petals while keeping the same target, surface, definitions and frame', async () => {
  const user = userEvent.setup(), { container } = render(<AsahiGlare />)
  const svg = screen.getByRole('img', { name: 'Asahi glare' })
  const target = svg.querySelector('[data-target]')!, surface = svg.querySelector('[data-layer="surface"]')!, gradient = svg.querySelector('radialGradient')!
  const markup = [target,surface,gradient].map(node => node.outerHTML), petals = svg.querySelector('[data-layer="petals"]')!.outerHTML
  const frame = container.querySelector('[data-asahi-viewing-frame]')!, frameStyle = frame.getAttribute('style')
  const toggle = screen.getByRole('button', { name: 'Hide petals' })
  expect(svg.querySelectorAll('[data-petal]')).toHaveLength(8)
  expect(target).toHaveAttribute('fill', '#FFFFFF'); expect(surface).toHaveAttribute('fill', '#FFFFFF')
  for (let repeat = 0; repeat < 2; repeat++) {
    toggle.focus(); await user.keyboard(repeat ? '{Enter}' : ' ')
    expect(toggle).toHaveFocus(); expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(svg.querySelectorAll('path')).toHaveLength(0)
    expect(svg.querySelector('[data-target]')).toBe(target)
    expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
    expect(svg.querySelector('radialGradient')).toBe(gradient)
    expect([target,surface,gradient].map(node => node.outerHTML)).toEqual(markup)
    expect(frame.getAttribute('style')).toBe(frameStyle)
    expect(screen.getAllByText(/The center and outer background use the same white/).some(node => !node.hidden)).toBe(true)
    await user.keyboard('{Enter}')
    expect(svg.querySelector('[data-layer="petals"]')!.outerHTML).toBe(petals)
  }
  expect(svg.querySelector('filter,image,linearGradient,animate,animateTransform,[transform],[opacity]')).toBeNull()
})

it('scopes one opaque user-space sRGB gradient to petals across all28 rendered configurations', () => {
  const { rerender } = render(<AsahiGlareStimulus petalsVisible openingRadius={64} halfAngle={18} />)
  const svg = screen.getByRole('img'), target = svg.querySelector('[data-target]')!, originalTarget = target.outerHTML
  const gradient = svg.querySelector('radialGradient')!, gradientId = gradient.id
  for (let r = 48; r <= 96; r += 8) for (let angle = 14; angle <= 20; angle += 2) {
    rerender(<AsahiGlareStimulus petalsVisible openingRadius={r} halfAngle={angle} />)
    expect(svg.querySelector('radialGradient')).toBe(gradient)
    expect(gradient).toHaveAttribute('gradientUnits', 'userSpaceOnUse')
    for (const attr of ['cx','cy','fx','fy']) expect(gradient).toHaveAttribute(attr, '360')
    expect(gradient).toHaveAttribute('r', '300')
    expect(gradient).toHaveAttribute('color-interpolation', 'sRGB')
    expect(gradient).toHaveAttribute('spreadMethod', 'pad')
    const stops = [...gradient.querySelectorAll('stop')]
    expect(stops.map(node => node.getAttribute('stop-color'))).toEqual(['#FFFFFF','#FFFFFF','#E6D73C','#2B2600'])
    expect(stops.every(node => node.getAttribute('stop-opacity') === '1')).toBe(true)
    expect(Number(stops[1].getAttribute('offset'))).toBeCloseTo(r / 300, 12)
    expect(Number(stops[2].getAttribute('offset'))).toBeCloseTo(r / 300 + .55 * (1 - r / 300), 12)
    const shaded = [...svg.querySelectorAll('[fill^="url("]')]
    expect(shaded).toHaveLength(8)
    expect(shaded.every(node => node.tagName === 'path' && node.hasAttribute('data-petal') && node.getAttribute('fill') === `url(#${gradientId})`)).toBe(true)
    expect(target.outerHTML).toBe(originalTarget)
    expect(svg.querySelector('[data-target]')).toBe(target)
    expect(target.closest('[fill^="url("]')).toBeNull()
  }
})

it('retains hidden parameter edits, independent disclosure and sizes, and restores all defaults with Reset focus', async () => {
  const user = userEvent.setup(), { container } = render(<AsahiGlare />)
  const svg = screen.getByRole('img'), target = svg.querySelector('[data-target]')!, markup = target.outerHTML
  const originalPetals = svg.querySelector('[data-layer="petals"]')!.outerHTML
  const toggle = screen.getByRole('button', { name: 'Hide petals' }), opening = screen.getByRole('slider', { name: 'Opening radius' }), angle = screen.getByRole('slider', { name: 'Petal half-angle' })
  expect(opening).toHaveValue('64'); expect(angle).toHaveValue('18')
  for (const [input, min, max, step] of [[opening,48,96,8],[angle,14,20,2]] as const) {
    expect(input).toHaveAttribute('min', String(min)); expect(input).toHaveAttribute('max', String(max)); expect(input).toHaveAttribute('step', String(step))
  }
  await user.click(toggle)
  fireEvent.change(opening, { target: { value: '48' } }); fireEvent.change(angle, { target: { value: '20' } })
  const explanation = screen.getByRole('button', { name: 'Why it happens' })
  await user.click(explanation)
  expect(screen.getByText(/does not mean the screen emits extra light/)).toBeVisible()
  expect(screen.getByRole('link', { name: /Laeng & Endestad/ })).toHaveAttribute('href', 'https://www.pnas.org/doi/10.1073/pnas.1118298109')
  expect(screen.getByRole('link', { name: /Laeng, Nabil & Kitaoka/ })).toHaveAttribute('href', 'https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2022.877249/full')
  for (const width of ['240','720','540']) {
    await user.selectOptions(screen.getByRole('combobox', { name: 'Asahi image size' }), width)
    expect(container.querySelector('[data-asahi-viewing-frame]')).toHaveStyle({ maxWidth: `${width}px` })
    expect(svg.querySelectorAll('path')).toHaveLength(0)
    expect(target.outerHTML).toBe(markup)
  }
  await user.click(toggle)
  expect(svg.querySelector('[data-layer="petals"]')!.outerHTML).not.toBe(originalPetals)
  expect(opening).toHaveValue('48'); expect(angle).toHaveValue('20')
  expect(explanation).toHaveAttribute('aria-expanded', 'true')
  await user.selectOptions(screen.getByRole('combobox'), '240'); await user.click(toggle)
  const reset = screen.getByRole('button', { name: 'Reset Asahi glare' }); reset.focus(); await user.keyboard('{Enter}')
  expect(reset).toHaveFocus(); expect(opening).toHaveValue('64'); expect(angle).toHaveValue('18')
  expect(screen.getByRole('combobox')).toHaveValue('540'); expect(toggle).toHaveAttribute('aria-pressed', 'false')
  expect(explanation).toHaveAttribute('aria-expanded', 'false')
  expect(svg.querySelector('[data-layer="petals"]')!.outerHTML).toBe(originalPetals)
  expect(svg.querySelector('[data-target]')).toBe(target); expect(target.outerHTML).toBe(markup)
})

it('keeps gradient references and controls independent between instances', async () => {
  const user = userEvent.setup(); render(<><AsahiGlare /><AsahiGlare /></>)
  const [first, second] = screen.getAllByRole('article', { name: 'Asahi glare' })
  const ids = [...document.querySelectorAll('[id]')].map(node => node.id)
  expect(new Set(ids).size).toBe(ids.length)
  for (const article of [first,second]) {
    const svg = within(article).getByRole('img'), gradient = svg.querySelector('radialGradient')!
    for (const attr of ['aria-labelledby','aria-describedby']) expect(article.querySelector(`[id="${svg.getAttribute(attr)}"]`)).not.toBeNull()
    expect([...svg.querySelectorAll('[data-petal]')].every(node => node.getAttribute('fill') === `url(#${gradient.id})`)).toBe(true)
  }
  const secondGradient = second.querySelector('radialGradient')!.outerHTML
  await user.click(within(first).getByRole('button', { name: 'Hide petals' }))
  fireEvent.change(within(first).getByRole('slider', { name: 'Opening radius' }), { target: { value: '96' } })
  fireEvent.change(within(first).getByRole('slider', { name: 'Petal half-angle' }), { target: { value: '14' } })
  await user.selectOptions(within(first).getByRole('combobox'), '720')
  expect(first.querySelectorAll('[data-petal]')).toHaveLength(0); expect(second.querySelectorAll('[data-petal]')).toHaveLength(8)
  expect(second.querySelector('radialGradient')!.outerHTML).toBe(secondGradient)
  expect(within(second).getByRole('slider', { name: 'Opening radius' })).toHaveValue('64')
  expect(within(second).getByRole('slider', { name: 'Petal half-angle' })).toHaveValue('18')
  expect(within(second).getByRole('combobox')).toHaveValue('540')
})
