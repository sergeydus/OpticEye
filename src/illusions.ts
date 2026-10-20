export const ILLUSIONS = [
  {
    id: 'confetti',
    name: 'Confetti',
    title: 'Confetti illusion',
    description: 'Identical circles can appear differently colored beneath three stripe colors. Includes an oranges-and-netting example.',
  },
  {
    id: 'munker',
    name: 'Munker',
    title: 'Munker illusion',
    description: 'Two identical green bars meet different colored grids. Remove the context and compare their shared fill.',
  },
  {
    id: 'cafe-wall',
    name: 'Café Wall',
    title: 'Café Wall illusion',
    description: 'Parallel mortar lines can look tilted between offset tile rows. Hide the tiles to compare their actual geometry.',
  },
  {
    id: 'muller-lyer',
    name: 'Müller-Lyer',
    title: 'Müller-Lyer illusion',
    description: 'Arrow fins can change perceived line length. Hide the fins to compare the horizontal shafts.',
  },
] as const

export type PageId = 'home' | (typeof ILLUSIONS)[number]['id']

export function pageHref(page: PageId, base: string) {
  return page === 'home' ? base : `${base}${page}/`
}
