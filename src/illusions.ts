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
    listed: true,
    name: 'Poggendorff',
    title: 'Poggendorff illusion',
    description: 'Parallel diagonals can appear misaligned behind yellow strips. Hide the strips to expose the same continuous lines.',
  },
  {
    id: 'ebbinghaus',
    listed: true,
    name: 'Ebbinghaus',
    title: 'Ebbinghaus illusion',
    description: 'Equal center circles meet different surrounding circles. Hide the surrounds to compare their actual sizes.',
  },
  {
    id: 'hering',
    listed: true,
    name: 'Hering',
    title: 'Hering illusion',
    description: 'Straight parallel lines can appear bowed across a radial background. Hide the rays to compare their actual geometry.',
  },
  {
    id: 'ponzo',
    listed: true,
    name: 'Ponzo',
    title: 'Ponzo illusion',
    description: 'Compare equal bars between converging rails, then hide the perspective context without changing either bar.',
  },
  {
    id: 'checker-shadow',
    listed: true,
    name: 'Checker-shadow',
    title: 'Checker-shadow illusion',
    description: 'Compare two equal-gray tiles in a shaded scene, then isolate the same tiles without changing their fills.',
  },
  {
    id: 'bulging-checkerboard',
    listed: true,
    name: 'Bulging checkerboard',
    title: 'Bulging checkerboard',
    description: 'A regular checkerboard may appear to bulge. Hide its small corner marks to inspect the unchanged square grid.',
  },
  {
    id: 'shepard-tables',
    listed: true,
    name: 'Shepard’s tables',
    title: 'Shepard’s tables',
    description: 'Compare two table drawings, then overlay their tabletop shapes without stretching them.',
  },
  {
    id: 'jastrow',
    listed: true,
    name: 'Jastrow',
    title: 'Jastrow illusion',
    description: 'Compare two curved bands, then align them without resizing either shape.',
  },
  {
    id: 'curvature-blindness',
    listed: true,
    name: 'Curvature blindness',
    title: 'Curvature blindness illusion',
    description: 'Congruent smooth curves may look angular when their contrast changes. Compare them on a different background without changing the curves.',
  },
  {
    id: 'vanishing-dots',
    listed: true,
    name: 'Vanishing dots',
    title: 'Vanishing dots',
    description: 'Look around a static lattice, then hide its gray lines while retaining the same twelve black dots.',
  },
  {
    id: 'skye-grating',
    listed: true,
    name: 'Skye oblique grating',
    title: 'Skye oblique grating',
    description: 'Straight parallel bands appear tilted among small checker marks. Hide the marks to inspect the unchanged bands.',
  },
  {
    id: 'rotating-snakes',
    listed: true,
    name: 'Rotating snakes',
    title: 'Rotating snakes',
    description: 'A stationary luminance pattern can appear to rotate. Compare it with a symmetric pattern without moving any shapes.',
  },
  {
    id: 'fraser-spiral',
    listed: true,
    name: 'Fraser false spiral',
    title: 'Fraser false spiral',
    description: 'Concentric circular bands can look like a spiral. Remove the cord pattern to inspect their geometry.',
  },
  {
    id: 'asahi-glare',
    listed: true,
    name: 'Asahi glare',
    title: 'Asahi glare',
    description: 'A white opening can seem to glow among shaded petals. Hide the petals to compare the same white surface.',
  },
  {
    id: 'neon-color-spreading',
    listed: true,
    name: 'Neon color spreading',
    title: 'Neon color spreading',
    description: 'Color can seem to spread between colored spokes. Hide the black outer rays to compare the unchanged gaps.',
  },
  {
    id: 'scintillating-starburst',
    listed: false,
    name: 'Scintillating starburst',
    title: 'Scintillating starburst',
    description: 'Static crossing polygons can suggest bright rays. Hide the crossing polygons to compare the inducing pattern.',
  },
] as const

// Only an explicit false hides discovery; build inputs continue to use ILLUSIONS.
export const LISTED_ILLUSIONS = ILLUSIONS.filter(({ listed = true }) => listed)

export type PageId = 'home' | (typeof ILLUSIONS)[number]['id']

export function pageHref(page: PageId, base: string) {
  return page === 'home' ? base : `${base}${page}/`
}
