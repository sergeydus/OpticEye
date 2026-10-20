import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import CafeWall from './CafeWall'

function bands(root: Element) {
  return Array.from(root.querySelectorAll('[data-layer="mortar"] rect'))
}
function geometry(root: Element) {
  return bands(root).map((band) => band.outerHTML)
}

describe('Café Wall experience', () => {
  it('starts with the specified construction, labels and defaults without disclosing the proof', () => {
    const { container } = render(<CafeWall />)
    expect(screen.getByRole('heading', { name: 'Café Wall illusion', level: 1 })).toBeVisible()
    expect(screen.getByRole('img')).toHaveAccessibleDescription(/Use Hide tiles/)
    expect(screen.getByRole('button', { name: 'Hide tiles' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('slider', { name: 'Row offset' })).toHaveValue('50')
    expect(screen.getByRole('slider', { name: 'Mortar width' })).toHaveValue('3')
    expect(screen.getByRole('combobox')).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Same five lines. Only the tiles were removed.')).not.toBeVisible()
    expect(container.querySelectorAll('[data-layer="tiles"] rect')).toHaveLength(63)
    expect(bands(container)).toHaveLength(5)
    expect(bands(container).map((band) => band.getAttribute('y'))).toEqual(['88.5', '163.5', '238.5', '313.5', '388.5'])
    for (const band of bands(container)) {
      expect(band).toHaveAttribute('x', '0')
      expect(band).toHaveAttribute('width', '720')
      expect(band).toHaveAttribute('height', '3')
      expect(band).toHaveAttribute('fill', '#808080')
    }
    expect(container.querySelector('[transform], filter, linearGradient, [style*="blend"], [style*="opacity"]')).toBeNull()
  })

  it('repeatedly removes only tiles while preserving the target nodes, surface and hidden offset/size choices', async () => {
    const user = userEvent.setup()
    const { container } = render(<StrictMode><CafeWall /></StrictMode>)
    const originals = bands(container)
    const before = geometry(container)
    const surface = container.querySelector('[data-layer="surface"]')!.outerHTML
    const toggle = screen.getByRole('button', { name: 'Hide tiles' })
    toggle.focus()
    await user.keyboard(' ')
    expect(toggle).toHaveFocus()
    expect(screen.getByText('Same five lines. Only the tiles were removed.')).toBeVisible()
    expect(screen.getByRole('img')).toHaveAccessibleDescription(/same five horizontal, parallel/)
    fireEvent.change(screen.getByRole('slider', { name: 'Row offset' }), { target: { value: '100' } })
    await user.selectOptions(screen.getByRole('combobox'), '240')
    for (let index = 0; index < 3; index++) {
      expect(container.querySelector('[data-layer="tiles"]')).toBeNull()
      expect(geometry(container)).toEqual(before)
      bands(container).forEach((band, position) => expect(band).toBe(originals[position]))
      expect(container.querySelector('[data-layer="surface"]')!.outerHTML).toBe(surface)
      expect(container.querySelector('[data-cafe-wall-viewing-frame]')).toHaveStyle({ maxWidth: '240px' })
      await user.click(toggle)
      expect(container.querySelectorAll('[data-layer="tiles"] rect')).toHaveLength(60)
      const oddFirstTile = container.querySelector('[data-row="1"] rect')!
      expect(oddFirstTile).toHaveAttribute('x', '0')
      expect(oddFirstTile).toHaveAttribute('fill', '#FFFFFF')
      await user.click(toggle)
    }
  })

  it('deliberately changes mortar thickness/spacing while revealed without adding tiles or altering the surface', async () => {
    const user = userEvent.setup()
    const { container } = render(<CafeWall />)
    const originalNodes = bands(container)
    const initial = geometry(container)
    const surface = container.querySelector('[data-layer="surface"]')!.outerHTML
    await user.click(screen.getByRole('button', { name: 'Hide tiles' }))
    for (const value of ['1', '8']) {
      fireEvent.change(screen.getByRole('slider', { name: 'Mortar width' }), { target: { value } })
      expect(container.querySelector('[data-layer="tiles"]')).toBeNull()
      expect(bands(container)).toHaveLength(5)
      expect(geometry(container)).not.toEqual(initial)
      bands(container).forEach((band, index) => {
        expect(band).toBe(originalNodes[index])
        expect(band).toHaveAttribute('height', value)
        expect(band).toHaveAttribute('width', '720')
        expect(band).toHaveAttribute('fill', '#808080')
      })
      expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 720 480')
      expect(container.querySelector('[data-layer="surface"]')!.outerHTML).toBe(surface)
    }
  })

  it('keeps disclosure independent and resets every choice with keyboard support and retained focus', async () => {
    const user = userEvent.setup()
    render(<CafeWall />)
    await user.tab()
    const reveal = screen.getByRole('button', { name: 'Hide tiles' })
    expect(reveal).toHaveFocus()
    await user.keyboard(' ')
    await user.tab()
    await user.tab()
    const offset = screen.getByRole('slider', { name: 'Row offset' })
    expect(offset).toHaveFocus()
    fireEvent.change(offset, { target: { value: '0' } })
    await user.tab()
    const mortar = screen.getByRole('slider', { name: 'Mortar width' })
    expect(mortar).toHaveFocus()
    fireEvent.change(mortar, { target: { value: '8' } })
    await user.tab()
    const size = screen.getByRole('combobox', { name: 'Café Wall image size' })
    expect(size).toHaveFocus()
    await user.selectOptions(size, '720')
    await user.tab()
    const disclosure = screen.getByRole('button', { name: 'Why it happens' })
    expect(disclosure).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(disclosure).toHaveAttribute('aria-expanded', 'true')
    expect(reveal).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: 'Border locking and the Café Wall illusion' })).toHaveAttribute('href', 'https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p1.htm')
    expect(screen.getByRole('link', { name: /Michael Bach/ })).toHaveAttribute('href', 'https://michaelbach.de/ot/ang-cafewall/')
    const reset = screen.getByRole('button', { name: 'Reset Café Wall' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(reveal).toHaveAttribute('aria-pressed', 'false')
    expect(offset).toHaveValue('50')
    expect(mortar).toHaveValue('3')
    expect(size).toHaveValue('540')
    expect(disclosure).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Café Wall experiment reset.')).toBeVisible()
  })

  it('isolates two instances and their labelled image references', async () => {
    const user = userEvent.setup()
    const { container } = render(<><CafeWall /><CafeWall /></>)
    const ids = Array.from(container.querySelectorAll('[id]')).map((element) => element.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const image of screen.getAllByRole('img')) {
      for (const attribute of ['aria-labelledby', 'aria-describedby']) expect(document.getElementById(image.getAttribute(attribute)!)).toBeInTheDocument()
    }
    const [first, second] = screen.getAllByRole('article')
    await user.click(within(first).getByRole('button', { name: 'Hide tiles' }))
    fireEvent.change(within(first).getByRole('slider', { name: 'Row offset' }), { target: { value: '100' } })
    expect(first.querySelector('[data-layer="tiles"]')).toBeNull()
    expect(second.querySelectorAll('[data-layer="tiles"] rect')).toHaveLength(63)
    expect(within(second).getByRole('slider', { name: 'Row offset' })).toHaveValue('50')
  })
})
