import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import App from './App'
import SiteHeader from './components/SiteHeader'
import { ConfettiPage } from '../confetti/main'
import { MunkerPage } from '../munker/main'
import { CafeWallPage } from '../cafe-wall/main'
import { MullerLyerPage } from '../muller-lyer/main'
import { KanizsaPage } from '../kanizsa/main'
import { ScintillatingGridPage } from '../scintillating-grid/main'
import { PoggendorffPage } from '../poggendorff/main'
import { EbbinghausPage } from '../ebbinghaus/main'
import { HeringPage } from '../hering/main'
import { PonzoPage } from '../ponzo/main'
import { CheckerShadowPage } from '../checker-shadow/main'
import { BulgingCheckerboardPage } from '../bulging-checkerboard/main'
import { ShepardTablesPage } from '../shepard-tables/main'
import { JastrowPage } from '../jastrow/main'
import { CurvatureBlindnessPage } from '../curvature-blindness/main'
import { VanishingDotsPage } from '../vanishing-dots/main'
import { SkyeGratingPage } from '../skye-grating/main'
import { FraserSpiralPage } from '../fraser-spiral/main'
import { RotatingSnakesPage } from '../rotating-snakes/main'
import { ILLUSIONS } from './illusions'

// Exercise the actual entry compositions without their browser root side effect.
vi.mock('./mountPage', () => ({ mountPage: vi.fn() }))

it('lists only the eighteen listed experiments with descriptions and document links on Home, without mounting stimuli', () => {
  render(<App />)
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Explore optical illusions')
  const cards = within(screen.getByRole('list'))
  expect(cards.getAllByRole('listitem')).toHaveLength(18)
  expect(cards.getByRole('link', { name: 'Confetti illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}confetti/`)
  expect(cards.getByRole('link', { name: 'Munker illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}munker/`)
  expect(cards.getByRole('link', { name: 'Café Wall illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}cafe-wall/`)
  expect(cards.getByRole('link', { name: 'Müller-Lyer illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}muller-lyer/`)
  expect(cards.queryByRole('link', { name: 'Kanizsa triangle' })).toBeNull()
  expect(cards.getByRole('link', { name: 'Fraser false spiral' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}fraser-spiral/`)
  expect(cards.getByRole('link', { name: 'Rotating snakes' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}rotating-snakes/`)
  expect(cards.getByRole('link', { name: 'Skye oblique grating' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}skye-grating/`)
  expect(cards.getByRole('link', { name: 'Vanishing dots' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}vanishing-dots/`)
  expect(cards.getByRole('link', { name: 'Curvature blindness illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}curvature-blindness/`)
  expect(cards.getByRole('link', { name: 'Jastrow illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}jastrow/`)
  expect(cards.getByRole('link', { name: 'Shepard’s tables' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}shepard-tables/`)
  expect(cards.getByRole('link', { name: 'Bulging checkerboard' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}bulging-checkerboard/`)
  expect(cards.getByRole('link', { name: 'Checker-shadow illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}checker-shadow/`)
  expect(cards.getByRole('link', { name: 'Ponzo illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}ponzo/`)
  expect(cards.getByRole('link', { name: 'Hering illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}hering/`)
  expect(cards.getByRole('link', { name: 'Ebbinghaus illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}ebbinghaus/`)
  expect(cards.getByRole('link', { name: 'Poggendorff illusion' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}poggendorff/`)
  expect(cards.getByRole('link', { name: 'Scintillating grid' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}scintillating-grid/`)
  expect(cards.queryByText(/Aligned cutout disks/)).toBeNull()
  expect(cards.getByText(/Arrow fins can change/)).toBeVisible()
  expect(cards.getByText(/Identical circles/)).toBeVisible()
  expect(cards.getByText(/Two identical green bars/)).toBeVisible()
  expect(cards.getByText(/Parallel mortar lines/)).toBeVisible()
  expect(screen.queryByRole('article')).toBeNull()
  expect(screen.queryByRole('slider')).toBeNull()
  expect(screen.queryByRole('navigation', { name: 'Illusion navigation' })).toBeNull()
})

it.each(['/', '/OpticEye/'].flatMap((base) => (['home', ...ILLUSIONS.map(({ id }) => id)] as const).map((currentPage) => [base, currentPage] as const)))('uses base %s for the compact header on %s, with a current marker only on Home', (base, currentPage) => {
  render(<SiteHeader base={base} currentPage={currentPage} />)
  const header = screen.getByRole('banner')
  const navigation = screen.getByRole('navigation', { name: 'Main navigation' })
  expect(within(header).getAllByRole('link')).toHaveLength(2)
  expect(within(navigation).getAllByRole('link')).toHaveLength(1)
  const brand = within(header).getByRole('link', { name: 'OpticEye' })
  const allIllusions = within(navigation).getByRole('link', { name: 'All illusions' })
  expect(brand).toHaveAttribute('href', base)
  expect(brand).not.toHaveAttribute('aria-current')
  expect(allIllusions).toHaveAttribute('href', base)
  if (currentPage === 'home') expect(allIllusions).toHaveAttribute('aria-current', 'page')
  else expect(allIllusions).not.toHaveAttribute('aria-current')
  expect(header.querySelectorAll('[aria-current="page"]')).toHaveLength(currentPage === 'home' ? 1 : 0)
})

it.each([
  { Page: FraserSpiralPage, title: 'Fraser false spiral', image: 'Fraser false spiral', absent: 'Rotating snakes' },
  { Page: RotatingSnakesPage, title: 'Rotating snakes', image: 'Rotating snakes', absent: 'Confetti illusion' },
  { Page: SkyeGratingPage, title: 'Skye oblique grating', image: 'Skye oblique grating', absent: 'Confetti illusion' },
  { Page: VanishingDotsPage, title: 'Vanishing dots', image: 'Vanishing dots', absent: 'Confetti illusion' },
  { Page: CurvatureBlindnessPage, title: 'Curvature blindness illusion', image: 'Curvature blindness illusion', absent: 'Confetti illusion' },
  { Page: JastrowPage, title: 'Jastrow illusion', image: 'Jastrow illusion', absent: 'Confetti illusion' },
  { Page: ShepardTablesPage, title: 'Shepard’s tables', image: 'Shepard’s tables', absent: 'Confetti illusion' },
  { Page: BulgingCheckerboardPage, title: 'Bulging checkerboard', image: 'Bulging checkerboard', absent: 'Confetti illusion' },
  { Page: CheckerShadowPage, title: 'Checker-shadow illusion', image: 'Checker-shadow illusion', absent: 'Confetti illusion' },
  { Page: ConfettiPage, title: 'Confetti illusion', image: 'Confetti color illusion', absent: 'Munker illusion' },
  { Page: MunkerPage, title: 'Munker illusion', image: 'Munker color illusion', absent: 'Confetti illusion' },
  { Page: KanizsaPage, title: 'Kanizsa triangle', image: 'Kanizsa triangle', absent: 'Confetti illusion' },
  { Page: ScintillatingGridPage, title: 'Scintillating grid', image: 'Scintillating grid', absent: 'Confetti illusion' },
  { Page: PonzoPage, title: 'Ponzo illusion', image: 'Ponzo illusion', absent: 'Confetti illusion' },
  { Page: HeringPage, title: 'Hering illusion', image: 'Hering illusion', absent: 'Confetti illusion' },
  { Page: EbbinghausPage, title: 'Ebbinghaus illusion', image: 'Ebbinghaus illusion', absent: 'Confetti illusion' },
  { Page: PoggendorffPage, title: 'Poggendorff illusion', image: 'Poggendorff illusion', absent: 'Confetti illusion' },
  { Page: MullerLyerPage, title: 'Müller-Lyer illusion', image: 'Müller-Lyer illusion', absent: 'Confetti illusion' },
  { Page: CafeWallPage, title: 'Café Wall illusion', image: 'Café Wall illusion', absent: 'Confetti illusion' },
])('mounts only $title at its real HTML entry composition', ({ Page, title, image, absent }) => {
  render(<Page />)
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(title)
  expect(screen.getByRole('article', { name: title })).toBeVisible()
  expect(screen.getAllByRole('article')).toHaveLength(1)
  expect(screen.queryByRole('article', { name: absent })).toBeNull()
  expect(screen.getByRole('img', { name: image })).toBeVisible()
  const header = screen.getByRole('banner')
  const navigation = screen.getByRole('navigation', { name: 'Main navigation' })
  expect(within(header).getAllByRole('link')).toHaveLength(2)
  expect(within(navigation).getAllByRole('link')).toHaveLength(1)
  expect(within(header).getByRole('link', { name: 'OpticEye' })).toHaveAttribute('href', import.meta.env.BASE_URL)
  expect(within(navigation).getByRole('link', { name: 'All illusions' })).toHaveAttribute('href', import.meta.env.BASE_URL)
  expect(header.querySelector('[aria-current]')).toBeNull()
  expect(header).toBeVisible()
  expect(screen.getByRole('contentinfo')).toBeVisible()
  expect(screen.queryByRole('navigation', { name: 'Illusions' })).toBeNull()
  const adjacentNavigation = screen.queryByRole('navigation', { name: 'Illusion navigation' })
  if (Page === KanizsaPage) expect(adjacentNavigation).toBeNull()
  else expect(adjacentNavigation).toBeVisible()
})

it('keeps the unlisted Kanizsa entry interactive with its existing defaults and Reset', async () => {
  const user = userEvent.setup()
  render(<KanizsaPage />)
  const rotation = screen.getByRole('slider', { name: 'Cutout rotation' })
  expect(rotation).toHaveValue('0')
  expect(screen.getByRole('slider', { name: 'Disk radius' })).toHaveValue('92')
  const outline = screen.getByRole('checkbox', { name: 'Outline triangle' })
  expect(outline).toBeChecked()
  fireEvent.change(rotation, { target: { value: '90' } })
  expect(rotation).toHaveValue('90')
  await user.click(outline)
  expect(outline).not.toBeChecked()
  await user.click(screen.getByRole('button', { name: 'Align cutouts' }))
  expect(rotation).toHaveValue('0')
  expect(outline).not.toBeChecked()
  await user.click(screen.getByRole('button', { name: 'Reset Kanizsa' }))
  expect(rotation).toHaveValue('0')
  expect(outline).toBeChecked()
})

 it('presents the railway scene before the line drawing on Ponzo', () => {
  render(<PonzoPage />)
  const railway = screen.getByRole('region', { name: 'Railway scene' })
  const drawing = screen.getByRole('region', { name: 'Line drawing' })
  expect(railway.compareDocumentPosition(drawing) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})
