import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import Confetti from './Confetti'
import { ORANGES_IMAGE } from './orangesModel'

// Stand in for a locally imported owner asset; no photo is bundled or downloaded.
vi.mock('./orangesModel', async (importOriginal) => {
  const original = await importOriginal<typeof import('./orangesModel')>()
  return {
    ...original,
    ORANGES_PHOTO_URL: '/fixture-owner-photo.jpg',
    getOrangesImage: (value: string) => original.getOrangesImage(value, '/fixture-owner-photo.jpg'),
  }
})

it('offers an available owner photo explicitly, preserves it through reveal, and resets to Illustration', async () => {
  const user = userEvent.setup()
  render(<Confetti />)
  const section = screen.getByRole('region', { name: 'At the produce aisle' })
  const source = within(section).getByRole('combobox', { name: 'Image source' })
  const image = within(section).getByRole('img')
  expect(source).toHaveValue('illustration')
  expect(image).toHaveAttribute('src', ORANGES_IMAGE)
  await user.selectOptions(source, 'photo')
  expect(image).toHaveAttribute('src', '/fixture-owner-photo.jpg')
  expect(image).not.toHaveAttribute('width')
  expect(image).not.toHaveAttribute('height')
  const before = image.outerHTML
  await user.click(screen.getByRole('button', { name: 'Hide netting' }))
  expect(image.outerHTML).toBe(before)
  await user.click(screen.getByRole('button', { name: 'Hide netting' }))
  expect(image.outerHTML).toBe(before)
  await user.click(screen.getByRole('button', { name: 'Reset' }))
  expect(source).toHaveValue('illustration')
  expect(image).toHaveAttribute('src', ORANGES_IMAGE)
  expect(section.querySelector('[data-layer="produce-netting"]')).toBeInTheDocument()
})
