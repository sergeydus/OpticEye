import { readFileSync } from 'node:fs'
import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Ponzo from './Ponzo'

const scene = () => screen.getByRole('region', { name: 'Railway scene' })
const drawing = () => screen.getByRole('img', { name: 'Ponzo illusion' })
const svg = () => screen.getByRole('img', { name: 'Ponzo railway scene' })
const caption = 'AI-generated image; the bars are drawn on top.'
const proof = 'Both yellow bars have the same length. Only the AI-generated image was removed.'

describe('additional railway scene', () => {
  it('bundles the native full-frame WebP below the byte limit without private metadata', () => {
    const bytes = readFileSync('src/assets/ponzo-railway-ai.webp')
    expect(bytes.length).toBeLessThanOrEqual(350_000)
    expect(bytes.toString('ascii', 0, 4)).toBe('RIFF')
    expect(bytes.toString('ascii', 8, 12)).toBe('WEBP')
    const tags: string[] = []
    let dimensions: number[] = []
    for (let offset = 12; offset + 8 <= bytes.length;) {
      const tag = bytes.toString('ascii', offset, offset + 4)
      const size = bytes.readUInt32LE(offset + 4), payload = offset + 8
      expect(payload + size).toBeLessThanOrEqual(bytes.length)
      tags.push(tag)
      if (tag === 'VP8 ') dimensions = [bytes.readUInt16LE(payload + 6) & 0x3fff, bytes.readUInt16LE(payload + 8) & 0x3fff]
      offset = payload + size + (size % 2)
    }
    expect(dimensions).toEqual([1264, 848])
    for (const tag of ['EXIF', 'XMP ', 'ICCP']) expect(tags).not.toContain(tag)
  })

  it('shows the complete image behind two exact equal bars, with its own controls and honest caption', () => {
    render(<Ponzo />)
    const image = svg().querySelector('image')!
    expect(svg()).toHaveAttribute('viewBox', '0 0 1264 848')
    expect(image.getAttribute('href')).toMatch(/ponzo-railway-ai.*\.webp/)
    expect(['x', 'y', 'width', 'height', 'preserveAspectRatio'].map((key) => image.getAttribute(key))).toEqual(['0', '0', '1264', '848', 'xMidYMid meet'])
    const bars = [...svg().querySelectorAll('[data-layer="targets"] line')]
    expect(bars.map((bar) => ['x1', 'y1', 'x2', 'y2'].map((key) => bar.getAttribute(key)))).toEqual([['492', '430', '772', '430'], ['492', '720', '772', '720']])
    for (const bar of bars) expect(Number(bar.getAttribute('x2')) - Number(bar.getAttribute('x1'))).toBe(280)
    expect(svg().querySelector('[data-layer="targets"]')).toHaveAttribute('stroke', '#FFD400')
    expect(drawing().querySelector('[data-layer="targets"]')).toHaveAttribute('stroke', '#D14D00')
    expect(svg().querySelector('[data-layer="targets"]')).toHaveAttribute('stroke-width', '14')
    expect(image.nextElementSibling).toBe(svg().querySelector('[data-layer="targets"]'))
    expect(svg().querySelector('filter,mask,clipPath,animate,[transform],[opacity]')).toBeNull()
    expect(within(scene()).getByText(caption)).toBeVisible()
    expect(within(scene()).getByText(proof)).not.toBeVisible()
    expect(screen.getByRole('combobox', { name: 'Railway image size' })).toHaveValue('540')
    expect(screen.getByRole('combobox', { name: 'Ponzo image size' })).toHaveValue('540')
    expect(svg()).toHaveAccessibleDescription(/AI-generated.*compare their apparent lengths/i)
  })

  it('keyboard toggles only the raster context and restores its same attributes without changing either drawing', async () => {
    const user = userEvent.setup()
    render(<StrictMode><Ponzo /></StrictMode>)
    const targetGroup = svg().querySelector('[data-layer="targets"]')!, targetData = targetGroup.outerHTML
    const bars = [...targetGroup.children], surface = svg().querySelector('[data-layer="surface"]')!
    const surfaceData = surface.outerHTML, imageData = svg().querySelector('image')!.outerHTML, originalDrawing = drawing().outerHTML
    const toggle = screen.getByRole('button', { name: 'Hide image' })
    for (let i = 0; i < 3; i++) {
      toggle.focus()
      await user.keyboard(' ')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(svg().querySelector('image')).toBeNull()
      expect(svg().querySelector('[data-layer="targets"]')).toBe(targetGroup)
      expect([...targetGroup.children]).toEqual(bars)
      expect(targetGroup.outerHTML).toBe(targetData)
      expect(svg().querySelector('[data-layer="surface"]')).toBe(surface)
      expect(surface.outerHTML).toBe(surfaceData)
      expect(svg()).toHaveAttribute('viewBox', '0 0 1264 848')
      expect(within(scene()).getByText(caption)).toBeVisible()
      expect(within(scene()).getAllByText(proof).every((n) => !n.hidden)).toBe(true)
      expect(drawing().outerHTML).toBe(originalDrawing)
      await user.keyboard('{Enter}')
      expect(svg().querySelector('image')!.outerHTML).toBe(imageData)
    }
  })

  it('keeps controls independent and restores both examples with global Reset, or only the scene with local Reset', async () => {
    const user = userEvent.setup()
    render(<Ponzo />)
    await user.selectOptions(screen.getByRole('combobox', { name: 'Railway image size' }), '720')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Ponzo image size' }), '240')
    fireEvent.change(screen.getByRole('slider'), { target: { value: '24' } })
    await user.click(screen.getByRole('button', { name: 'Hide rails' }))
    await user.click(screen.getByRole('button', { name: 'Hide image' }))
    await user.click(screen.getByRole('link', { name: 'Read the Ponzo explanation' }))
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'true')
    expect(svg().querySelector('image')).toBeNull()
    const local = screen.getByRole('button', { name: 'Reset railway scene' })
    await user.click(local)
    expect(local).toHaveFocus()
    expect(screen.getByRole('combobox', { name: 'Railway image size' })).toHaveValue('540')
    expect(svg().querySelector('image')).not.toBeNull()
    expect(screen.getByRole('combobox', { name: 'Ponzo image size' })).toHaveValue('240')
    expect(drawing().querySelector('[data-layer="context"]')).toBeNull()
    expect(screen.getByRole('slider')).toHaveValue('24')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Railway image size' }), '240')
    await user.click(screen.getByRole('button', { name: 'Hide image' }))
    const reset = screen.getByRole('button', { name: 'Reset Ponzo' })
    await user.click(reset)
    expect(reset).toHaveFocus()
    for (const select of screen.getAllByRole('combobox')) expect(select).toHaveValue('540')
    expect(svg().querySelector('image')).not.toBeNull()
    expect(drawing().querySelector('[data-layer="context"]')).not.toBeNull()
    expect(screen.getByRole('slider')).toHaveValue('8')
    expect(screen.getByRole('button', { name: 'Why it happens' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('isolates two page instances and uniquely labels each scene and control', async () => {
    const user = userEvent.setup()
    render(<><Ponzo /><Ponzo /></>)
    const ids = [...document.querySelectorAll('[id]')].map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
    const [first, second] = screen.getAllByRole('region', { name: 'Railway scene' })
    await user.click(within(first).getByRole('button', { name: 'Hide image' }))
    await user.selectOptions(within(first).getByRole('combobox'), '240')
    expect(within(second).getByRole('button', { name: 'Hide image' })).toHaveAttribute('aria-pressed', 'false')
    expect(within(second).getByRole('combobox')).toHaveValue('540')
    const image = within(second).getByRole('img', { name: 'Ponzo railway scene' })
    for (const attr of ['aria-labelledby', 'aria-describedby']) for (const id of image.getAttribute(attr)!.split(' ')) expect(document.getElementById(id)).not.toBeNull()
  })
})
