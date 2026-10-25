/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { normalizeCycles, normalizePalette, sectorFill, SNAKE_GEOMETRY, SURFACE_RGB, VIEWBOX, type CycleCount, type Palette } from './rotatingSnakesModel'

type Props = { cycles: CycleCount; palette: Palette; reverse: boolean; symmetric: boolean }

export default function RotatingSnakesStimulus({ cycles, palette, reverse, symmetric }: Props) {
  const id = useId()
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Rotating snakes</title>
      <desc id={`${id}-description`}>{symmetric
        ? 'Four stationary wheels on gray. The two intermediate segment classes now use matching gray; all sector shapes and positions are unchanged.'
        : 'Four stationary wheels with three concentric bands of repeating dark, intermediate, white and intermediate colors. Neighboring wheels have opposite color orders; they may appear to turn despite the static drawing.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_RGB} />
      <g data-layer="wheels">
        {SNAKE_GEOMETRY[normalizeCycles(cycles)].map((sector) => <path
          key={sector.id} data-sector={sector.id} data-wheel={sector.wheel} data-band={sector.band} data-index={sector.index}
          d={sector.path} fill={sectorFill(sector, normalizePalette(palette), reverse, symmetric)} stroke="none"
        />)}
      </g>
    </svg>
  )
}
