export const ILLUSIONS = [
  {
    id: 'confetti',
    listed: true,
    name: 'Confetti',
    title: 'Confetti illusion',
    description: 'Identical circles can appear differently colored beneath three stripe colors. Includes an oranges-and-netting example.',
  },
  {
    id: 'munker',
    listed: true,
    name: 'Munker',
    title: 'Munker illusion',
    description: 'Two identical green bars meet different colored grids. Remove the context and compare their shared fill.',
  },
  {
    id: 'cafe-wall',
    listed: true,
    name: 'Café Wall',
    title: 'Café Wall illusion',
    description: 'Parallel mortar lines can look tilted between offset tile rows. Hide the tiles to compare their actual geometry.',
  },
  {
    id: 'muller-lyer',
    listed: true,
    name: 'Müller-Lyer',
    title: 'Müller-Lyer illusion',
    description: 'Arrow fins can change perceived line length. Hide the fins to compare the horizontal shafts.',
  },
  {
    id: 'kanizsa',
    listed: false,
    name: 'Kanizsa',
    title: 'Kanizsa triangle',
    description: 'Aligned cutout disks can suggest a triangle. Rotate the cutouts to compare the surrounding shapes.',
  },
  {
    id: 'scintillating-grid',
    listed: true,
    name: 'Scintillating grid',
    title: 'Scintillating grid',
    description: 'Look around a static grid, then hide its gray lines while keeping the same white disks.',
  },
  {
    id: 'poggendorff',
    listed: false,
    name: 'Poggendorff',
    title: 'Poggendorff illusion',
    description: 'Parallel diagonals can appear misaligned behind yellow strips. Hide the strips to expose the same continuous lines.',
  },
] as const

// Only an explicit false hides discovery; build inputs continue to use ILLUSIONS.
export const LISTED_ILLUSIONS = ILLUSIONS.filter(({ listed = true }) => listed)

export type PageId = 'home' | (typeof ILLUSIONS)[number]['id']

export function pageHref(page: PageId, base: string) {
  return page === 'home' ? base : `${base}${page}/`
}
