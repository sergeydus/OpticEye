import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Kanizsa from './Kanizsa'

const paths = (root: Element) => Array.from(root.querySelectorAll('[data-layer="disks"] path'))

describe('Kanizsa experience', () => {
  it('draws only three black sector paths over a white surface, with aligned defaults and hidden proof', () => {
    const { container } = render(<Kanizsa />)
    expect(screen.getByRole('heading', { name: 'Kanizsa triangle', level: 1 })).toBeVisible()
    expect(screen.getByRole('img')).toHaveAccessibleDescription(/60-degree cutouts facing/)
    expect(screen.getByRole('button', { name: 'Rotate cutouts' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('slider', { name: 'Disk radius' })).toHaveValue('64')
    expect(screen.getByRole('slider')).toHaveAttribute('max', '96')
    expect(screen.getByRole('combobox', { name: 'Kanizsa image size' })).toHaveValue('540')
    expect(screen.getByText('Only the cutouts turned. No triangle was drawn.')).not.toBeVisible()
    const svg = container.querySelector('svg')!
    expect([...svg.children].map((n) => n.tagName)).toEqual(['title', 'desc', 'rect', 'g'])
    expect(svg.querySelectorAll('rect')).toHaveLength(1)
    expect(svg.querySelector('rect')).toHaveAttribute('fill', '#FFFFFF')
    expect(paths(container)).toHaveLength(3)
    expect(svg.querySelector('[data-layer="disks"]')).toHaveAttribute('fill', '#000000')
    expect(svg.querySelector('[data-layer="disks"]')).toHaveAttribute('stroke', 'none')
    expect(svg.querySelector('polygon, line, circle, mask, clipPath, filter, linearGradient, [transform]')).toBeNull()
    expect(svg.querySelectorAll('g > *')).toHaveLength(3)
  })

  it('rotates only the three path data attributes and restores them exactly on repeated comparison', async () => {
    const user = userEvent.setup()
    const { container } = render(<StrictMode><Kanizsa /></StrictMode>)
    const nodes = paths(container), original = nodes.map((n) => n.getAttribute('d'))
    const invariant = nodes.map((n) => [...n.attributes].filter((a) => a.name !== 'd').map((a) => [a.name, a.value]))
    const surface = container.querySelector('[data-layer="surface"]')!, surfaceMarkup = surface.outerHTML
    const toggle = screen.getByRole('button', { name: 'Rotate cutouts' })
    for (let index = 0; index < 3; index++) {
      toggle.focus()
      await user.keyboard(' ')
      expect(toggle).toHaveFocus()
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(paths(container).map((n) => n.getAttribute('d'))).not.toEqual(original)
      paths(container).forEach((node, i) => {
        expect(node).toBe(nodes[i])
        expect([...node.attributes].filter((a) => a.name !== 'd').map((a) => [a.name, a.value])).toEqual(invariant[i])
        expect(node.getAttribute('d')!.split(' ').slice(0, 3)).toEqual(original[i]!.split(' ').slice(0, 3))
      })
      expect(container.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceMarkup)
      expect(screen.getByRole('img')).toHaveAccessibleDescription(/turned 90 degrees/)
      expect(screen.getByText('Only the cutouts turned. No triangle was drawn.')).toBeVisible()
      await user.click(toggle)
      expect(paths(container).map((n) => n.getAttribute('d'))).toEqual(original)
    }
  })

  it('changes radius and scale while rotated without moving centers or returning to alignment', async () => {
    const user = userEvent.setup()
    const { container } = render(<Kanizsa />)
    await user.click(screen.getByRole('button', { name: 'Rotate cutouts' }))
    const centers = paths(container).map((n) => n.getAttribute('d')!.split(' ').slice(0, 3))
    for (const radius of ['32', '96']) {
      fireEvent.change(screen.getByRole('slider'), { target: { value: radius } })
      const pointData = paths(container).map((n) => n.getAttribute('d')!.split(' '))
      expect(pointData.map((p) => p.slice(0, 3))).toEqual(centers)
      pointData.forEach((p) => expect(p.slice(6, 9)).toEqual(['A', radius, radius]))
      expect(screen.getByRole('button', { name: 'Rotate cutouts' })).toHaveAttribute('aria-pressed', 'true')
    }
    const beforeSize = paths(container).map((n) => n.outerHTML)
    await user.selectOptions(screen.getByRole('combobox'), '240')
    expect(paths(container).map((n) => n.outerHTML)).toEqual(beforeSize)
    expect(container.querySelector('[data-kanizsa-viewing-frame]')).toHaveStyle({ maxWidth: '240px' })
  })

  it('keeps keyboard disclosure independent, provides all sources, and resets every choice with focus', async () => {
    const user = userEvent.setup()
    render(<Kanizsa />)
    await user.tab()
    expect(screen.getByRole('button', { name: 'Rotate cutouts' })).toHaveFocus()
    await user.keyboard(' ')
    fireEvent.change(screen.getByRole('slider'), { target: { value: '96' } })
    await user.selectOptions(screen.getByRole('combobox'), '720')
    const disclosure = screen.getByRole('button', { name: 'Why it happens' })
    disclosure.focus()
    await user.keyboard('{Enter}')
    expect(disclosure).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Rotate cutouts' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: /Michael Bach/ })).toHaveAttribute('href', 'https://michaelbach.de/ot/cog-Kanizsa/')
    expect(screen.getByRole('link', { name: 'Spatial and temporal properties of illusory figures' })).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/8506632/')
    expect(screen.getByRole('link', { name: /Strength of visual interpolation/ })).toHaveAttribute('href', 'https://link.springer.com/article/10.3758/BF03206762')
    const reset = screen.getByRole('button', { name: 'Reset Kanizsa' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(screen.getByRole('slider')).toHaveValue('64')
    expect(screen.getByRole('combobox')).toHaveValue('540')
    expect(disclosure).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Rotate cutouts' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('Kanizsa experiment reset.')).toBeVisible()
  })

  it('isolates instance state and every labeled image/control reference', async () => {
    const user = userEvent.setup()
    const { container } = render(<><Kanizsa /><Kanizsa /></>)
    const ids = [...container.querySelectorAll('[id]')].map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const node of container.querySelectorAll('[aria-labelledby], [aria-describedby], [aria-controls]')) for (const name of ['aria-labelledby', 'aria-describedby', 'aria-controls']) for (const id of node.getAttribute(name)?.split(' ') ?? []) expect(document.getElementById(id)).toBeInTheDocument()
    const [first, second] = screen.getAllByRole('article')
    const secondData = paths(second).map((n) => n.outerHTML)
    await user.click(within(first).getByRole('button', { name: 'Rotate cutouts' }))
    fireEvent.change(within(first).getByRole('slider'), { target: { value: '32' } })
    expect(paths(second).map((n) => n.outerHTML)).toEqual(secondData)
    expect(within(second).getByRole('slider')).toHaveValue('64')
    expect(within(second).getByRole('button', { name: 'Rotate cutouts' })).toHaveAttribute('aria-pressed', 'false')
  })
})
