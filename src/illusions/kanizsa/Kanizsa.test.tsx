import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Kanizsa from './Kanizsa'

const paths = (root: Element) => Array.from(root.querySelectorAll('[data-layer="disks"] path'))
const data = (root: Element) => paths(root).map((n) => n.getAttribute('d'))

describe('Kanizsa experience', () => {
  it('starts at radius92, rotation0 and outline on, drawing only the specified layers', () => {
    const { container } = render(<Kanizsa />)
    expect(screen.getByRole('heading', { name: 'Kanizsa triangle', level: 1 })).toBeVisible()
    expect(screen.getByRole('slider', { name: 'Disk radius' })).toHaveValue('92')
    const rotation = screen.getByRole('slider', { name: 'Cutout rotation' })
    expect(rotation).toHaveValue('0')
    expect(rotation).toHaveAttribute('max', '90')
    expect(rotation).toHaveAttribute('step', '5')
    expect(screen.getByRole('checkbox', { name: 'Outline triangle' })).toBeChecked()
    expect(screen.queryByRole('button', { name: 'Rotate cutouts' })).toBeNull()
    expect(screen.getByRole('img')).toHaveAccessibleDescription(/inverted triangle/)
    expect(screen.getByText('No upright triangle is drawn. Only the surrounding shapes changed.')).not.toBeVisible()
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('viewBox', '0 0 720 512')
    expect([...svg.children].map((n) => n.tagName)).toEqual(['title', 'desc', 'rect', 'g', 'g'])
    expect(paths(container)).toHaveLength(3)
    expect(svg.querySelectorAll('polyline')).toHaveLength(3)
    expect(svg.querySelector('[data-layer="outline"]')).toHaveAttribute('fill', 'none')
    expect(svg.querySelector('[data-layer="outline"]')).toHaveAttribute('stroke-width', '4')
    expect(svg.querySelector('polygon,line,circle,mask,clipPath,filter,[transform]')).toBeNull()
  })

  it('changes only persistent sector path data on rotation while leaving outline/surface unchanged', () => {
    const { container } = render(<StrictMode><Kanizsa /></StrictMode>)
    const nodes = paths(container), original = data(container)
    const outline = container.querySelector('[data-layer="outline"]')!.outerHTML
    const surface = container.querySelector('[data-layer="surface"]')!
    for (const rotation of ['45', '90', '0']) {
      fireEvent.change(screen.getByRole('slider', { name: 'Cutout rotation' }), { target: { value: rotation } })
      paths(container).forEach((node, i) => {
        expect(node).toBe(nodes[i])
        expect(node.getAttribute('d')!.split(' ').slice(0, 3)).toEqual(original[i]!.split(' ').slice(0, 3))
        expect(node.attributes).toHaveLength(2)
      })
      expect(container.querySelector('[data-layer="outline"]')!.outerHTML).toBe(outline)
      expect(container.querySelector('[data-layer="surface"]')).toBe(surface)
      if (rotation === '0') expect(data(container)).toEqual(original)
      else {
        expect(data(container)).not.toEqual(original)
        expect(screen.getByRole('img')).toHaveAccessibleDescription(new RegExp('rotated ' + rotation + ' degrees'))
      }
    }
  })

  it('toggles only the outline and keeps Align independent from radius, size and disclosure', async () => {
    const user = userEvent.setup()
    const { container } = render(<Kanizsa />)
    const original = data(container), nodes = paths(container)
    const checkbox = screen.getByRole('checkbox', { name: 'Outline triangle' })
    checkbox.focus()
    await user.keyboard(' ')
    expect(checkbox).not.toBeChecked()
    expect(container.querySelector('[data-layer="outline"]')).toBeNull()
    expect(data(container)).toEqual(original)
    paths(container).forEach((node, i) => expect(node).toBe(nodes[i]))
    fireEvent.change(screen.getByRole('slider', { name: 'Cutout rotation' }), { target: { value: '45' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Disk radius' }), { target: { value: '32' } })
    await user.selectOptions(screen.getByRole('combobox'), '240')
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    const align = screen.getByRole('button', { name: 'Align cutouts' })
    await user.click(align)
    expect(align).toHaveFocus()
    expect(screen.getByRole('slider', { name: 'Cutout rotation' })).toHaveValue('0')
    expect(screen.getByRole('slider', { name: 'Disk radius' })).toHaveValue('32')
    expect(checkbox).not.toBeChecked()
    expect(screen.getByRole('combobox')).toHaveValue('240')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Cutouts aligned.')).toBeVisible()
  })

  it('changes corner lengths on radius input, retains other choices and resets every new default with focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<Kanizsa />)
    const initialOutline = container.querySelector('[data-layer="outline"]')!.outerHTML
    fireEvent.change(screen.getByRole('slider', { name: 'Cutout rotation' }), { target: { value: '90' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Disk radius' }), { target: { value: '96' } })
    expect(container.querySelector('[data-layer="outline"]')!.outerHTML).not.toBe(initialOutline)
    expect(screen.getByRole('slider', { name: 'Cutout rotation' })).toHaveValue('90')
    await user.click(screen.getByRole('checkbox'))
    await user.selectOptions(screen.getByRole('combobox'), '720')
    const disclosure = screen.getByRole('button', { name: 'Why it happens' })
    disclosure.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('link', { name: 'Spatial and temporal properties of illusory figures' })).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/8506632/')
    expect(screen.getByRole('link', { name: /Strength of visual interpolation/ })).toHaveAttribute('href', 'https://link.springer.com/article/10.3758/BF03206762')
    expect(screen.getByRole('link', { name: /Michael Bach/ })).toHaveAttribute('href', 'https://michaelbach.de/ot/cog-Kanizsa/')
    const reset = screen.getByRole('button', { name: 'Reset Kanizsa' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(screen.getByRole('slider', { name: 'Disk radius' })).toHaveValue('92')
    expect(screen.getByRole('slider', { name: 'Cutout rotation' })).toHaveValue('0')
    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(screen.getByRole('combobox')).toHaveValue('540')
    expect(disclosure).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Kanizsa experiment reset.')).toBeVisible()
    expect(container.querySelector('[data-layer="outline"]')!.outerHTML).toBe(initialOutline)
  })

  it('isolates two instances and all label/image references', async () => {
    const user = userEvent.setup()
    const { container } = render(<><Kanizsa /><Kanizsa /></>)
    const ids = [...container.querySelectorAll('[id]')].map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const node of container.querySelectorAll('[aria-labelledby], [aria-describedby], [aria-controls]')) for (const attr of ['aria-labelledby', 'aria-describedby', 'aria-controls']) for (const id of node.getAttribute(attr)?.split(' ') ?? []) expect(document.getElementById(id)).toBeInTheDocument()
    const [first, second] = screen.getAllByRole('article')
    const original = data(second)
    fireEvent.change(within(first).getByRole('slider', { name: 'Cutout rotation' }), { target: { value: '45' } })
    await user.click(within(first).getByRole('checkbox'))
    expect(data(second)).toEqual(original)
    expect(within(second).getByRole('checkbox')).toBeChecked()
    expect(within(second).getByRole('slider', { name: 'Cutout rotation' })).toHaveValue('0')
  })
})
