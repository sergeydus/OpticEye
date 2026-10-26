import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import NeonColorSpreading from './NeonColorSpreading'

it('removes only black rays, preserving the sixteen colored nodes, attributes, white surface and frame', async () => {
  const user = userEvent.setup(), { container } = render(<NeonColorSpreading />)
  const svg = screen.getByRole('img', { name: 'Neon color spreading' }), colored = [...svg.querySelectorAll('[data-colored-spoke]')]
  const surface = svg.querySelector('[data-layer="surface"]')!, markup = colored.map(node => node.outerHTML), surfaceMarkup = surface.outerHTML
  const outer = svg.querySelector('[data-layer="outer-rays"]')!, originalOuter = outer.outerHTML
  const frame = container.querySelector('[data-neon-viewing-frame]')!, frameStyle = frame.getAttribute('style')
  const toggle = screen.getByRole('button', { name: 'Hide outer rays' })
  expect(colored.every(node => node.getAttribute('stroke') === '#D52B3F')).toBe(true)
  expect(screen.getByRole('combobox', { name: 'Spoke color' })).toHaveValue('red')
  expect(colored).toHaveLength(16); expect(svg.querySelectorAll('[data-outer-ray]')).toHaveLength(16)
  expect(surface).toHaveAttribute('fill', '#FFFFFF')
  expect([...svg.querySelectorAll('line')].every(node => node.getAttribute('stroke-linecap') === 'butt' && node.getAttribute('stroke-width') === '8')).toBe(true)
  expect(outer.compareDocumentPosition(colored[0]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  for (let repeat = 0; repeat < 2; repeat++) {
    toggle.focus(); await user.keyboard(repeat ? '{Enter}' : ' ')
    expect(toggle).toHaveFocus(); expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(svg.querySelectorAll('line')).toHaveLength(16)
    expect(svg.querySelectorAll('[data-outer-ray]')).toHaveLength(0)
    expect([...svg.querySelectorAll('[data-colored-spoke]')].every((node,i) => node === colored[i])).toBe(true)
    expect(colored.map(node => node.outerHTML)).toEqual(markup)
    expect(surface.outerHTML).toBe(surfaceMarkup); expect(frame.getAttribute('style')).toBe(frameStyle)
    expect(screen.getAllByText(/Only the black outer rays were removed/).some(node => !node.hidden)).toBe(true)
    await user.keyboard('{Enter}')
    expect(outer.outerHTML).toBe(originalOuter)
  }
  expect(svg.querySelector('circle,ellipse,path,polygon,image,mask,filter,linearGradient,radialGradient,animate,animateTransform,[transform],[opacity]')).toBeNull()
  expect(svg.querySelectorAll('rect')).toHaveLength(1)
})

it('keeps colored attributes fixed for gap changes and changes only their stroke color for palette choices', async () => {
  const user = userEvent.setup(); render(<NeonColorSpreading />)
  const svg = screen.getByRole('img'), colored = [...svg.querySelectorAll('[data-colored-spoke]')], original = colored.map(node => node.outerHTML)
  const outerEnds = [...svg.querySelectorAll('[data-outer-ray]')].map(node => [node.getAttribute('x2'),node.getAttribute('y2')])
  fireEvent.change(screen.getByRole('slider', { name: 'Inducer gap' }), { target: { value: '12' } })
  expect(colored.map(node => node.outerHTML)).toEqual(original)
  expect([...svg.querySelectorAll('[data-outer-ray]')].map(node => [node.getAttribute('x2'),node.getAttribute('y2')])).toEqual(outerEnds)
  const outerMarkup = svg.querySelector('[data-layer="outer-rays"]')!.outerHTML
  const exceptStroke = () => colored.map(node => [...node.attributes].filter(attr => attr.name !== 'stroke').map(attr => [attr.name,attr.value]))
  const geometry = exceptStroke()
  for (const [color, rgb] of [['blue','#205FE0'],['red','#D52B3F'],['green','#00A050']]) {
    await user.selectOptions(screen.getByRole('combobox', { name: 'Spoke color' }), color)
    expect(colored.every(node => node.getAttribute('stroke') === rgb)).toBe(true)
    expect(exceptStroke()).toEqual(geometry)
    expect(svg.querySelector('[data-layer="outer-rays"]')!.outerHTML).toBe(outerMarkup)
  }
})

it('retains hidden edits, independent size/disclosure and resets all local defaults without moving focus', async () => {
  const user = userEvent.setup(), { container } = render(<NeonColorSpreading />)
  const svg = screen.getByRole('img'), colored = [...svg.querySelectorAll('[data-colored-spoke]')], original = colored.map(node => node.outerHTML)
  const toggle = screen.getByRole('button', { name: 'Hide outer rays' }), radius = screen.getByRole('slider', { name: 'Colored radius' }), width = screen.getByRole('slider', { name: 'Spoke width' }), gap = screen.getByRole('slider', { name: 'Inducer gap' })
  for (const [input, min, max, step] of [[radius,72,120,8],[width,6,12,2],[gap,0,12,2]] as const) {
    expect(input).toHaveAttribute('min', String(min)); expect(input).toHaveAttribute('max', String(max)); expect(input).toHaveAttribute('step', String(step))
  }
  await user.click(toggle)
  fireEvent.change(radius, { target: { value: '72' } }); fireEvent.change(width, { target: { value: '12' } }); fireEvent.change(gap, { target: { value: '2' } })
  await user.selectOptions(screen.getByRole('combobox', { name: 'Spoke color' }), 'blue')
  expect(colored.every(node => node.getAttribute('stroke') === '#205FE0' && node.getAttribute('stroke-width') === '12')).toBe(true)
  expect(colored[0]).toHaveAttribute('y2', '288')
  const selected = colored.map(node => node.outerHTML)
  const explanation = screen.getByRole('button', { name: 'Why it happens' }); await user.click(explanation)
  expect(screen.getByText(/no colored disk or veil is painted/)).toBeVisible()
  expect(screen.getByRole('link', { name: 'Michael Bach — Colour Spreading' })).toHaveAttribute('href', 'https://michaelbach.de/ot/col-neon/')
  expect(screen.getByRole('link', { name: /Redies & Spillmann/ })).toHaveAttribute('href', 'https://journals.sagepub.com/doi/10.1068/p100667')
  expect(screen.getByText(/Publisher abstract consulted, not the full article/)).toBeVisible()
  for (const value of ['240','720','540']) {
    await user.selectOptions(screen.getByRole('combobox', { name: 'Neon image size' }), value)
    expect(container.querySelector('[data-neon-viewing-frame]')).toHaveStyle({ maxWidth: `${value}px` })
    expect(svg.querySelectorAll('[data-outer-ray]')).toHaveLength(0)
    expect(colored.map(node => node.outerHTML)).toEqual(selected)
  }
  await user.click(toggle)
  expect(svg.querySelector('[data-outer-ray="0"]')).toHaveAttribute('y1', '286')
  expect(colored.map(node => node.outerHTML)).toEqual(selected)
  expect(explanation).toHaveAttribute('aria-expanded', 'true')
  await user.selectOptions(screen.getByRole('combobox', { name: 'Neon image size' }), '240'); await user.click(toggle)
  const reset = screen.getByRole('button', { name: 'Reset neon color spreading' }); reset.focus(); await user.keyboard('{Enter}')
  expect(reset).toHaveFocus(); expect(radius).toHaveValue('96'); expect(width).toHaveValue('8'); expect(gap).toHaveValue('0')
  expect(screen.getByRole('combobox', { name: 'Spoke color' })).toHaveValue('red'); expect(screen.getByRole('combobox', { name: 'Neon image size' })).toHaveValue('540')
  expect(toggle).toHaveAttribute('aria-pressed', 'false'); expect(explanation).toHaveAttribute('aria-expanded', 'false')
  expect([...svg.querySelectorAll('[data-colored-spoke]')].every((node,i) => node === colored[i])).toBe(true)
  expect(colored.map(node => node.outerHTML)).toEqual(original)
  expect(svg.querySelectorAll('[data-outer-ray]')).toHaveLength(16)
})

it('uses unique referenced names and independent controls for multiple instances', async () => {
  const user = userEvent.setup(); render(<><NeonColorSpreading /><NeonColorSpreading /></>)
  const [first, second] = screen.getAllByRole('article', { name: 'Neon color spreading' })
  const ids = [...document.querySelectorAll('[id]')].map(node => node.id)
  expect(new Set(ids).size).toBe(ids.length)
  for (const article of [first,second]) {
    const svg = within(article).getByRole('img')
    for (const attr of ['aria-labelledby','aria-describedby']) expect(article.querySelector(`[id="${svg.getAttribute(attr)}"]`)).not.toBeNull()
  }
  const secondImage = within(second).getByRole('img').outerHTML
  await user.click(within(first).getByRole('button', { name: 'Hide outer rays' }))
  fireEvent.change(within(first).getByRole('slider', { name: 'Colored radius' }), { target: { value: '120' } })
  await user.selectOptions(within(first).getByRole('combobox', { name: 'Spoke color' }), 'blue')
  await user.selectOptions(within(first).getByRole('combobox', { name: 'Neon image size' }), '720')
  expect(first.querySelectorAll('[data-outer-ray]')).toHaveLength(0)
  expect(within(second).getByRole('img').outerHTML).toBe(secondImage)
  expect(within(second).getByRole('slider', { name: 'Colored radius' })).toHaveValue('96')
  expect(within(second).getByRole('combobox', { name: 'Spoke color' })).toHaveValue('red')
})
