import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ScintillatingGrid from './ScintillatingGrid'
import ScintillatingGridStimulus from './ScintillatingGridStimulus'

const disks = (root: Element) => Array.from(root.querySelectorAll('[data-layer="disks"] circle'))
const attributes = (nodes: Element[]) => nodes.map((n) => Array.from(n.attributes).map((a) => [a.name, a.value]))

describe('Scintillating grid experience', () => {
  it('starts with precisely the static black/gray/white layers and documented controls', () => {
    const { container } = render(<ScintillatingGrid />)
    expect(screen.getByRole('slider', { name: 'Grid spacing' })).toHaveValue('72')
    expect(screen.getByRole('slider', { name: 'Disk diameter' })).toHaveValue('18')
    expect(screen.getByRole('combobox', { name: 'Scintillating grid image size' })).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide grid' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Gray grid hidden. The same white disks remain.')).not.toBeVisible()
    const svg = screen.getByRole('img', { name: 'Scintillating grid' })
    expect(svg).toHaveAccessibleDescription(/Nine rows of white disks/)
    expect(svg).toHaveAttribute('viewBox', '0 0 720 720')
    expect([...svg.children].map((n) => n.tagName)).toEqual(['title', 'desc', 'rect', 'g', 'g'])
    expect(container.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#000000')
    const grid = container.querySelector('[data-layer="grid"]')!
    expect(grid).toHaveAttribute('stroke', '#808080')
    expect(grid).toHaveAttribute('stroke-width', '10')
    expect(grid).toHaveAttribute('stroke-linecap', 'butt')
    expect(grid.querySelectorAll('line')).toHaveLength(18)
    expect(disks(container)).toHaveLength(81)
    for (const disk of disks(container)) {
      expect(disk).toHaveAttribute('fill', '#FFFFFF')
      expect(disk).toHaveAttribute('stroke', 'none')
    }
    expect(svg.querySelector('path,filter,animate,mask,clipPath,[transform],[opacity]')).toBeNull()
  })

  it('removes only the grid, retaining every disk node and attribute across repeated reveals', async () => {
    const user = userEvent.setup()
    const { container } = render(<StrictMode><ScintillatingGrid /></StrictMode>)
    const originals = disks(container), originalAttributes = attributes(originals)
    const surface = container.querySelector('[data-layer="surface"]')!
    const surfaceAttributes = attributes([surface])
    const button = screen.getByRole('button', { name: 'Hide grid' })
    for (let iteration = 0; iteration < 3; iteration++) {
      button.focus()
      await user.keyboard(' ')
      expect(button).toHaveAttribute('aria-pressed', 'true')
      expect(container.querySelector('[data-layer="grid"]')).toBeNull()
      expect(screen.getByRole('img')).toHaveAccessibleDescription(/same 81 white disks/)
      expect(disks(container)).toEqual(originals)
      disks(container).forEach((node, i) => expect(node).toBe(originals[i]))
      expect(attributes(disks(container))).toEqual(originalAttributes)
      expect(container.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(attributes([surface])).toEqual(surfaceAttributes)
      await user.click(button)
      expect(container.querySelectorAll('[data-layer="grid"] line')).toHaveLength(18)
      expect(attributes(disks(container))).toEqual(originalAttributes)
    }
  })

  it('changes positions and diameter independently while hidden and restores the selected grid', async () => {
    const user = userEvent.setup()
    const { container } = render(<ScintillatingGrid />)
    const originals = disks(container)
    await user.click(screen.getByRole('button', { name: 'Hide grid' }))
    fireEvent.change(screen.getByRole('slider', { name: 'Grid spacing' }), { target: { value: '80' } })
    expect(originals[0]).toHaveAttribute('cx', '40')
    expect(originals[0]).toHaveAttribute('cy', '40')
    expect(originals[0]).toHaveAttribute('r', '9')
    const positions = originals.map((n) => [n.getAttribute('cx'), n.getAttribute('cy')])
    fireEvent.change(screen.getByRole('slider', { name: 'Disk diameter' }), { target: { value: '22' } })
    expect(originals[0]).toHaveAttribute('r', '11')
    expect(disks(container).map((n) => [n.getAttribute('cx'), n.getAttribute('cy')])).toEqual(positions)
    expect(container.querySelector('[data-layer="grid"]')).toBeNull()
    disks(container).forEach((node, i) => expect(node).toBe(originals[i]))
    await user.click(screen.getByRole('button', { name: 'Hide grid' }))
    const line = container.querySelector('[data-layer="grid"] line')!
    expect(line).toHaveAttribute('x1', '40')
    expect(line).toHaveAttribute('y1', '20')
    expect(line).toHaveAttribute('y2', '700')
  })

  it('keeps disclosure independent and Reset restores all defaults without losing focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<ScintillatingGrid />)
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('button', { name: 'Hide grid' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('link', { name: 'The scintillating grid illusion' })).toHaveAttribute('href', 'https://doi.org/10.1016/S0042-6989(96)00255-6')
    expect(screen.getByRole('link', { name: "Michael Bach's scintillating-grid demonstration" })).toHaveAttribute('href', 'https://michaelbach.de/ot/lum-scGrid/')
    for (const width of ['240', '720']) {
      await user.selectOptions(screen.getByRole('combobox'), width)
      expect(container.querySelector('[data-scintillating-grid-viewing-frame]')).toHaveStyle({ maxWidth: `${width}px` })
      expect(disks(container)[0]).toHaveAttribute('cx', '72')
    }
    fireEvent.change(screen.getByRole('slider', { name: 'Grid spacing' }), { target: { value: '56' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Disk diameter' }), { target: { value: '14' } })
    await user.click(screen.getByRole('button', { name: 'Hide grid' }))
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    const reset = screen.getByRole('button', { name: 'Reset Scintillating grid' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(screen.getByRole('slider', { name: 'Grid spacing' })).toHaveValue('72')
    expect(screen.getByRole('slider', { name: 'Disk diameter' })).toHaveValue('18')
    expect(screen.getByRole('combobox')).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide grid' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Scintillating grid experiment reset.')).toBeVisible()
    expect(disks(container)[0]).toHaveAttribute('cx', '72')
    expect(disks(container)[0]).toHaveAttribute('r', '9')
  })

  it('isolates two instances and supplies unique valid image, label and description references', async () => {
    const user = userEvent.setup()
    render(<><ScintillatingGrid /><ScintillatingGrid /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Scintillating grid' })
    const ids = Array.from(document.querySelectorAll('[id]')).map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img')
      for (const attribute of ['aria-labelledby', 'aria-describedby']) expect(document.getElementById(svg.getAttribute(attribute)!)).not.toBeNull()
      for (const slider of within(article).getAllByRole('slider')) {
        expect(slider).toHaveAccessibleName()
        expect(document.getElementById(slider.getAttribute('aria-describedby')!)).not.toBeNull()
      }
    }
    await user.click(within(first).getByRole('button', { name: 'Hide grid' }))
    fireEvent.change(within(first).getByRole('slider', { name: 'Grid spacing' }), { target: { value: '80' } })
    expect(second.querySelectorAll('[data-layer="grid"] line')).toHaveLength(18)
    expect(within(second).getByRole('slider', { name: 'Grid spacing' })).toHaveValue('72')
  })

  it('normalizes invalid stimulus props before drawing finite geometry', () => {
    const { container } = render(<ScintillatingGridStimulus spacing={NaN} diameter={Infinity} gridVisible />)
    expect(disks(container)[0]).toHaveAttribute('cx', '72')
    expect(disks(container)[0]).toHaveAttribute('r', '9')
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/)
  })
})
