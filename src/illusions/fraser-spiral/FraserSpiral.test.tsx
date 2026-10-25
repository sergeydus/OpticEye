import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import FraserSpiral from './FraserSpiral'

it('uncovers the same eight circle nodes and surface without altering their attributes or frame', async () => {
  const user = userEvent.setup()
  const { container } = render(<FraserSpiral />)
  const svg = screen.getByRole('img', { name: 'Fraser false spiral' })
  const targets = [...svg.querySelectorAll('circle')], surface = svg.querySelector('[data-layer="surface"]')!
  const markup = targets.map(node => node.outerHTML), surfaceMarkup = surface.outerHTML
  const frame = container.querySelector('[data-fraser-viewing-frame]')!, frameStyle = frame.getAttribute('style')
  const checker = svg.querySelector('[data-layer="checker-background"]')!, checkerMarkup = checker.outerHTML
  const cordMarkup = svg.querySelector('[data-layer="cord-tiles"]')!.outerHTML
  const toggle = screen.getByRole('button', { name: 'Show circular bands' })
  expect(svg.querySelectorAll('[data-cord]')).toHaveLength(384)
  expect(svg.querySelectorAll('[data-checker]')).toHaveLength(384)
  expect(targets).toHaveLength(8)
  expect(checker.compareDocumentPosition(targets[0]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(targets[0].compareDocumentPosition(svg.querySelector('[data-cord]')!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  for (let repeat = 0; repeat < 2; repeat++) {
    toggle.focus(); await user.keyboard(' ')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(toggle).toHaveFocus()
    expect(svg.querySelectorAll('path')).toHaveLength(0)
    expect([...svg.querySelectorAll('circle')].every((node, i) => node === targets[i])).toBe(true)
    expect(targets.map(node => node.outerHTML)).toEqual(markup)
    expect(surface.outerHTML).toBe(surfaceMarkup)
    expect(frame.getAttribute('style')).toBe(frameStyle)
    expect(screen.getAllByText(/These same circular bands were underneath/).some(node => !node.hidden)).toBe(true)
    await user.keyboard('{Enter}')
    expect(svg.querySelector('[data-layer="checker-background"]')!.outerHTML).toBe(checkerMarkup)
    expect(svg.querySelector('[data-layer="cord-tiles"]')!.outerHTML).toBe(cordMarkup)
  }
  expect(svg.querySelector('image,filter,linearGradient,radialGradient,animate,animateTransform,[transform],[opacity]')).toBeNull()
})

it('retains hidden settings, keeps explanation independent and resets every default with focus intact', async () => {
  const user = userEvent.setup()
  const { container } = render(<FraserSpiral />)
  const svg = screen.getByRole('img'), targets = [...svg.querySelectorAll('circle')], markup = targets.map(node => node.outerHTML)
  const toggle = screen.getByRole('button', { name: 'Show circular bands' }), tilt = screen.getByRole('slider', { name: 'Cord tilt' })
  const defaultCord = svg.querySelector('[data-layer="cord-tiles"]')!.outerHTML
  expect(tilt).toHaveAttribute('min', '0'); expect(tilt).toHaveAttribute('max', '70'); expect(tilt).toHaveAttribute('step', '5')
  expect(tilt).toHaveValue('30')
  await user.click(toggle)
  fireEvent.change(tilt, { target: { value: '70' } })
  await user.click(screen.getByRole('checkbox', { name: 'Reverse twist' }))
  const explanation = screen.getByRole('button', { name: 'Why it happens' })
  await user.click(explanation)
  expect(screen.getByText(/Previously covered pixels become visible/)).toBeVisible()
  expect(screen.getByRole('link', { name: 'Michael Bach — Fraser’s Spiral' })).toHaveAttribute('href', 'https://michaelbach.de/ot/ang-fraser/')
  expect(screen.getByRole('link', { name: /Akiyoshi Kitaoka/ })).toHaveAttribute('href', 'https://www.psy.ritsumei.ac.jp/akitaoka/riken2010.html')
  for (const width of ['240','720','540']) {
    await user.selectOptions(screen.getByRole('combobox', { name: 'Fraser image size' }), width)
    expect(container.querySelector('[data-fraser-viewing-frame]')).toHaveStyle({ maxWidth: `${width}px` })
    expect(svg.querySelectorAll('path')).toHaveLength(0)
    expect(targets.map(node => node.outerHTML)).toEqual(markup)
  }
  await user.click(toggle)
  expect(tilt).toHaveValue('70')
  expect(svg.querySelector('[data-layer="cord-tiles"]')!.outerHTML).not.toBe(defaultCord)
  expect(explanation).toHaveAttribute('aria-expanded', 'true')
  await user.selectOptions(screen.getByRole('combobox'), '240')
  await user.click(toggle)
  const reset = screen.getByRole('button', { name: 'Reset Fraser spiral' })
  reset.focus(); await user.keyboard('{Enter}')
  expect(reset).toHaveFocus(); expect(tilt).toHaveValue('30')
  expect(screen.getByRole('checkbox')).not.toBeChecked()
  expect(screen.getByRole('combobox')).toHaveValue('540')
  expect(toggle).toHaveAttribute('aria-pressed', 'false')
  expect(explanation).toHaveAttribute('aria-expanded', 'false')
  expect(svg.querySelector('[data-layer="cord-tiles"]')!.outerHTML).toBe(defaultCord)
  expect([...svg.querySelectorAll('circle')].every((node, i) => node === targets[i])).toBe(true)
  expect(targets.map(node => node.outerHTML)).toEqual(markup)
})

it('isolates instances and gives their images and controls unique referenced names', async () => {
  const user = userEvent.setup()
  render(<><FraserSpiral /><FraserSpiral /></>)
  const [first, second] = screen.getAllByRole('article', { name: 'Fraser false spiral' })
  const ids = [...document.querySelectorAll('[id]')].map(node => node.id)
  expect(new Set(ids).size).toBe(ids.length)
  for (const article of [first, second]) {
    const svg = within(article).getByRole('img')
    for (const attr of ['aria-labelledby','aria-describedby']) expect(article.querySelector(`[id="${svg.getAttribute(attr)}"]`)).not.toBeNull()
  }
  await user.click(within(first).getByRole('button', { name: 'Show circular bands' }))
  fireEvent.change(within(first).getByRole('slider'), { target: { value: '0' } })
  await user.click(within(first).getByRole('checkbox'))
  await user.selectOptions(within(first).getByRole('combobox'), '720')
  expect(first.querySelectorAll('[data-cord]')).toHaveLength(0)
  expect(second.querySelectorAll('[data-cord]')).toHaveLength(384)
  expect(within(second).getByRole('slider')).toHaveValue('30')
  expect(within(second).getByRole('checkbox')).not.toBeChecked()
  expect(within(second).getByRole('combobox')).toHaveValue('540')
})
