import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import Confetti from './Confetti'
import { ORANGES_AI_URL, ORANGES_IMAGE } from './orangesModel'

it('offers one AI source, labels it honestly, preserves its image/caption through reveal, and resets to Illustration', async () => {
  const user = userEvent.setup()
  render(<Confetti />)
  const section = screen.getByRole('region', { name: 'At the produce aisle' })
  const source = within(section).getByRole('combobox', { name: 'Image source' })
  const image = within(section).getByRole('img')
  expect(source).toHaveValue('illustration')
  expect(image).toHaveAttribute('src', ORANGES_IMAGE)
  expect(within(source).getAllByRole('option').map((option) => option.textContent)).toEqual(['Illustration', 'AI-generated image'])
  await user.selectOptions(source, 'ai')
  expect(image).toHaveAttribute('src', ORANGES_AI_URL)
  expect(image).toHaveAttribute('width', '1024')
  expect(image).toHaveAttribute('height', '687')
  expect(image).toHaveAccessibleName(/AI-generated image/)
  expect(screen.getByText('AI-generated image; the net is drawn on top.')).toBeVisible()
  const before = image.outerHTML
  await user.click(screen.getByRole('button', { name: 'Hide netting' }))
  expect(image.outerHTML).toBe(before)
  expect(screen.getByText('AI-generated image; the net is drawn on top.')).toBeVisible()
  await user.click(screen.getByRole('button', { name: 'Hide netting' }))
  expect(image.outerHTML).toBe(before)
  await user.click(screen.getByRole('button', { name: 'Reset' }))
  expect(source).toHaveValue('illustration')
  expect(image).toHaveAttribute('src', ORANGES_IMAGE)
  expect(section.querySelector('[data-layer="produce-netting"]')).toBeInTheDocument()
})
