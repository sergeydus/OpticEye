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
] as const

// Only an explicit false hides discovery; build inputs continue to use ILLUSIONS.
export const LISTED_ILLUSIONS = ILLUSIONS.filter(({ listed = true }) => listed)

export type PageId = 'home' | (typeof ILLUSIONS)[number]['id']

export function pageHref(page: PageId, base: string) {
  return page === 'home' ? base : `${base}${page}/`
}
