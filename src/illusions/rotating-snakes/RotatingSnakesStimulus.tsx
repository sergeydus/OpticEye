/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { normalizeCycles, normalizePalette, ovalFill, sectorFill, SNAKE_GEOMETRY, SURFACE_RGB, VIEWBOX, type CycleCount, type Palette } from './rotatingSnakesModel'

type Props = { cycles: CycleCount; palette: Palette; reverse: boolean; symmetric: boolean }

export default function RotatingSnakesStimulus({ cycles, palette, reverse, symmetric }: Props) {
  const id = useId()
  const selectedPalette = normalizePalette(palette)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Rotating snakes</title>
      <desc id={`${id}-description`}>{symmetric
        ? 'Fourteen stationary overlapping wheels on white. The two intermediate oval classes now use matching gray; all oval and sector shapes, positions and orientations are unchanged.'
        : `Fourteen stationary overlapping wheels, each with eighteen concentric rings of inward-facing ${selectedPalette === 'gray' ? 'gray' : 'blue and yellow-green'} ovals between black and white regions. Color order alternates across the field; the wheels may appear to turn despite the static drawing.`}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_RGB} />
      <g data-layer="wheels">
        {SNAKE_GEOMETRY[normalizeCycles(cycles)].map((wheel) => <g key={wheel.id} data-wheel={wheel.id} data-direction={wheel.direction}>
          <circle data-ground={wheel.id} cx={wheel.cx} cy={wheel.cy} r={wheel.radius} fill={SURFACE_RGB} />
          {wheel.bands.map((band) => <g key={band.id} data-band={band.id}>
            {band.sectors.map((sector) => <path key={sector.id} data-sector={sector.id} data-index={sector.index} d={sector.path} fill={sectorFill(sector)} />)}
            {band.ovals.map((oval) => <ellipse
              key={oval.id} data-oval={oval.id} data-index={oval.index} cx={oval.cx} cy={oval.cy} rx={oval.rx} ry={oval.ry}
              transform={`rotate(${oval.rotation} ${oval.cx} ${oval.cy})`} fill={ovalFill(oval, selectedPalette, reverse, symmetric)}
            />)}
          </g>)}
        </g>)}
      </g>
    </svg>
  )
}
