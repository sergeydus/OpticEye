import { StrictMode } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import BulgingCheckerboard from './BulgingCheckerboard'

const proof = 'The grid stayed unchanged: every tile is square and every row and column is straight. Only the corner marks were removed.'
const boardTiles = (svg: Element) => [...svg.querySelectorAll('[data-layer="board"] rect')]

describe('bulging checkerboard experience', () => {
  it('starts with the regular board, specified tick geometry, labels and no extra geometry', () => {
    render(<BulgingCheckerboard />)
    const svg = screen.getByRole('img', { name: 'Bulging checkerboard' })
    expect(svg).toHaveAccessibleDescription(/regular black-and-white checkerboard with small opposite-color corner marks/)
    expect(svg).toHaveAttribute('viewBox', '0 0 720 720')
    expect([...svg.children].map((node) => node.tagName)).toEqual(['title', 'desc', 'rect', 'g', 'g'])
    expect(svg.querySelector('[data-layer="surface"]')).toHaveAttribute('fill', '#FFFFFF')
    expect(boardTiles(svg)).toHaveLength(196)
    expect(svg.querySelectorAll('[data-layer="ticks"] rect')).toHaveLength(176)
    for (const tile of boardTiles(svg)) {
      expect(tile).toHaveAttribute('width', '44')
      expect(tile).toHaveAttribute('height', '44')
    }
    for (const tick of svg.querySelectorAll('[data-tick]')) {
      expect(tick).toHaveAttribute('width', '10')
      expect(tick).toHaveAttribute('height', '10')
      const tile = svg.querySelector(`[data-tile="${tick.getAttribute('data-parent-tile')}"]`)!
      expect(tick.getAttribute('fill')).not.toBe(tile.getAttribute('fill'))
    }
    expect(svg.querySelector('path,line,filter,animate,mask,clipPath,[transform],linearGradient,image')).toBeNull()
    expect(screen.queryByRole('slider')).toBeNull()
    expect(screen.getByRole('combobox', { name: 'Checkerboard image size' })).toHaveValue('540')
    expect(screen.getByRole('button', { name: 'Hide ticks' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText(proof)).not.toBeVisible()
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('repeated keyboard reveal removes only ticks and retains all board nodes, attributes, surface and frame', async () => {
    const user = userEvent.setup()
    render(<StrictMode><BulgingCheckerboard /></StrictMode>)
    const svg = screen.getByRole('img')
    const tiles = boardTiles(svg), before = tiles.map((tile) => tile.outerHTML)
    const surface = svg.querySelector('[data-layer="surface"]')!, surfaceData = surface.outerHTML
    const tickData = svg.querySelector('[data-layer="ticks"]')!.outerHTML
    const toggle = screen.getByRole('button', { name: 'Hide ticks' })
    for (let iteration = 0; iteration < 3; iteration++) {
      toggle.focus()
      await user.keyboard(' ')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(svg.querySelector('[data-layer="ticks"]')).toBeNull()
      expect(boardTiles(svg).every((tile, i) => tile === tiles[i])).toBe(true)
      expect(boardTiles(svg).map((tile) => tile.outerHTML)).toEqual(before)
      expect(svg.querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceData)
      expect(svg).toHaveAttribute('viewBox', '0 0 720 720')
      expect(svg).toHaveAccessibleDescription(/same regular checkerboard after removing only/)
      expect(screen.getAllByText(proof).some((node) => !node.hidden)).toBe(true)
      await user.keyboard('{Enter}')
      expect(toggle).toHaveAttribute('aria-pressed', 'false')
      expect(svg.querySelector('[data-layer="ticks"]')!.outerHTML).toBe(tickData)
    }
  })

  it('keeps size and explanation independent, then restores every default with Reset focus retained', async () => {
    const user = userEvent.setup()
    const { container } = render(<BulgingCheckerboard />)
    const svg = screen.getByRole('img'), original = boardTiles(svg).map((tile) => tile.outerHTML)
    const size = screen.getByRole('combobox', { name: 'Checkerboard image size' })
    const toggle = screen.getByRole('button', { name: 'Hide ticks' })
    await user.click(toggle)
    await user.click(screen.getByRole('button', { name: 'Why it happens' }))
    expect(screen.getByRole('link', { name: 'Akiyoshi Kitaoka’s checkered illusions' })).toHaveAttribute('href', 'https://www.psy.ritsumei.ac.jp/akitaoka/checkerede.html')
    expect(screen.getByRole('link', { name: 'Michael Bach’s bulging checkerboard demonstration' })).toHaveAttribute('href', 'https://michaelbach.de/ot/ang-KitaokaBulge/')
    for (const width of ['240', '720', '540']) {
      await user.selectOptions(size, width)
      expect(container.querySelector('[data-checkerboard-viewing-frame]')).toHaveStyle({ maxWidth: `${width}px` })
      expect(svg.querySelector('[data-layer="ticks"]')).toBeNull()
      expect(boardTiles(svg).map((tile) => tile.outerHTML)).toEqual(original)
    }
    await user.selectOptions(size, '240')
    const reset = screen.getByRole('button', { name: 'Reset checkerboard' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    expect(size).toHaveValue('540')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
    expect(svg.querySelectorAll('[data-tick]')).toHaveLength(176)
    expect(boardTiles(svg).map((tile) => tile.outerHTML)).toEqual(original)
    expect(screen.getByText('Checkerboard experiment reset.')).toBeVisible()
  })

  it('keeps two instances independent with unique image and control references', async () => {
    const user = userEvent.setup()
    render(<><BulgingCheckerboard /><BulgingCheckerboard /></>)
    const [first, second] = screen.getAllByRole('article', { name: 'Bulging checkerboard' })
    const ids = [...document.querySelectorAll('[id]')].map((node) => node.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const article of [first, second]) {
      const svg = within(article).getByRole('img')
      expect(document.getElementById(svg.getAttribute('aria-labelledby')!)).not.toBeNull()
      expect(document.getElementById(svg.getAttribute('aria-describedby')!)).not.toBeNull()
      expect(within(article).getByRole('combobox')).toHaveAccessibleName('Checkerboard image size')
    }
    await user.click(within(first).getByRole('button', { name: 'Hide ticks' }))
    await user.selectOptions(within(first).getByRole('combobox'), '240')
    expect(second.querySelectorAll('[data-tick]')).toHaveLength(176)
    expect(within(second).getByRole('button', { name: 'Hide ticks' })).toHaveAttribute('aria-pressed', 'false')
    expect(within(second).getByRole('combobox')).toHaveValue('540')
  })
})
