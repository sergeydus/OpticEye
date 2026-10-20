import { render, screen, within } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import App from './App'
import SiteHeader from './components/SiteHeader'
import { ConfettiPage } from '../confetti/main'
import { MunkerPage } from '../munker/main'

// Exercise the actual entry compositions without their browser root side effect.
vi.mock('./mountPage', () => ({ mountPage: vi.fn() }))

it('lists both experiments with descriptions and document links on Home, without mounting stimuli', () => {
  render(<App />)
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Explore optical illusions')
  const cards = within(screen.getByRole('list'))
  expect(cards.getAllByRole('listitem')).toHaveLength(2)
  expect(cards.getByRole('link', { name: 'Confetti illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}confetti/`)
  expect(cards.getByRole('link', { name: 'Munker illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}munker/`)
  expect(cards.getByText(/Identical circles/)).toBeVisible()
  expect(cards.getByText(/Two identical green bars/)).toBeVisible()
  expect(screen.queryByRole('article')).toBeNull()
  expect(screen.queryByRole('slider')).toBeNull()
})

it.each(['/', '/OpticEye/'].flatMap((base) => (['home', 'confetti', 'munker'] as const).map((currentPage) => [base, currentPage] as const)))('uses base %s and marks only %s current in the shared navigation', (base, currentPage) => {
  render(<SiteHeader base={base} currentPage={currentPage} />)
  const navigation = screen.getByRole('navigation', { name: 'Main navigation' })
  for (const [name, suffix] of [['Home', ''], ['Confetti', 'confetti/'], ['Munker', 'munker/']]) {
    const link = within(navigation).getByRole('link', { name })
    expect(link).toHaveAttribute('href', base + suffix)
    if (name.toLowerCase() === currentPage) expect(link).toHaveAttribute('aria-current', 'page')
    else expect(link).not.toHaveAttribute('aria-current')
  }
  expect(navigation.querySelectorAll('[aria-current="page"]')).toHaveLength(1)
  expect(screen.getByRole('link', { name: 'OpticEye' })).toHaveAttribute('href', base)
})

it.each([
  { Page: ConfettiPage, title: 'Confetti illusion', image: 'Confetti color illusion', current: 'Confetti', absent: 'Munker illusion' },
  { Page: MunkerPage, title: 'Munker illusion', image: 'Munker color illusion', current: 'Munker', absent: 'Confetti illusion' },
])('mounts only $title at its real HTML entry composition', ({ Page, title, image, current, absent }) => {
  render(<Page />)
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(title)
  expect(screen.getByRole('article', { name: title })).toBeVisible()
  expect(screen.queryByRole('article', { name: absent })).toBeNull()
  expect(screen.getByRole('img', { name: image })).toBeVisible()
  expect(screen.getByRole('navigation', { name: 'Main navigation' }).querySelector('[aria-current="page"]')).toHaveTextContent(current)
  expect(screen.getByRole('banner')).toBeVisible()
  expect(screen.getByRole('contentinfo')).toBeVisible()
  expect(screen.queryByRole('navigation', { name: 'Illusions' })).toBeNull()
})
