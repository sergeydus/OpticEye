import { render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { ILLUSIONS, LISTED_ILLUSIONS } from '../illusions'
import IllusionNavigation from './IllusionNavigation'
import SiteLayout from './SiteLayout'

it.each(['/', '/OpticEye/'])('links each listed page to its Home-order neighbors under %s without wrapping', (base) => {
  for (const [index, illusion] of LISTED_ILLUSIONS.entries()) {
    const { unmount } = render(<IllusionNavigation currentPage={illusion.id} base={base} />)
    const navigation = within(screen.getByRole('navigation', { name: 'Illusion navigation' }))
    const previous = LISTED_ILLUSIONS[index - 1]
    const next = LISTED_ILLUSIONS[index + 1]
    expect(navigation.getAllByRole('link')).toHaveLength(Number(Boolean(previous)) + Number(Boolean(next)))
    if (previous) {
      const link = navigation.getByRole('link', { name: `Previous illusion ${previous.name}` })
      expect(link).toHaveAttribute('href', `${base}${previous.id}/`)
      expect(link).toHaveAttribute('rel', 'prev')
    } else expect(navigation.queryByRole('link', { name: /Previous illusion/ })).toBeNull()
    if (next) {
      const link = navigation.getByRole('link', { name: `Next illusion ${next.name}` })
      expect(link).toHaveAttribute('href', `${base}${next.id}/`)
      expect(link).toHaveAttribute('rel', 'next')
    } else expect(navigation.queryByRole('link', { name: /Next illusion/ })).toBeNull()
    expect(navigation.queryByRole('link', { name: /Kanizsa/ })).toBeNull()
    unmount()
  }
})

it('skips the unlisted Kanizsa entry in both directions', () => {
  const { rerender } = render(<IllusionNavigation currentPage="muller-lyer" />)
  expect(screen.getByRole('link', { name: 'Next illusion Scintillating grid' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}scintillating-grid/`)
  rerender(<IllusionNavigation currentPage="scintillating-grid" />)
  expect(screen.getByRole('link', { name: 'Previous illusion Müller-Lyer' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}muller-lyer/`)
})

it('omits adjacent navigation on Home and every unlisted page', () => {
  const { rerender } = render(<SiteLayout currentPage="home"><h1>Home</h1></SiteLayout>)
  expect(screen.queryByRole('navigation', { name: 'Illusion navigation' })).toBeNull()
  for (const illusion of ILLUSIONS.filter(({ listed }) => !listed)) {
    rerender(<SiteLayout currentPage={illusion.id}><h1>{illusion.name}</h1></SiteLayout>)
    expect(screen.queryByRole('navigation', { name: 'Illusion navigation' })).toBeNull()
  }
})

it('places navigation after the content and before the footer without growing the header', () => {
  render(<SiteLayout currentPage="munker"><article aria-label="Experiment">Stimulus and controls</article></SiteLayout>)
  const navigation = screen.getByRole('navigation', { name: 'Illusion navigation' })
  expect(screen.getByRole('main')).toContainElement(navigation)
  expect(screen.getByRole('article').compareDocumentPosition(navigation) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(navigation.compareDocumentPosition(screen.getByRole('contentinfo')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(within(screen.getByRole('banner')).getAllByRole('link')).toHaveLength(2)
})
