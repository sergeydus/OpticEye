/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { DARK_STROKE, GRAY_SURFACE, LIGHT_STROKE, VIEWBOX, WAVE_GEOMETRY, WHITE_SURFACE, type WaveDetail } from './curvatureBlindnessModel'

export default function CurvatureBlindnessStimulus({ whiteBackground, waveDetail }: { whiteBackground: boolean; waveDetail: WaveDetail }) {
  const id = useId()
  const { path, rows, lightIntervals, strokeWidth } = WAVE_GEOMETRY[waveDetail]
  const masterId = `${id}-curve`
  const clipId = (phase: number) => `${id}-phase-${phase}`
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Curvature blindness illusion</title>
      <desc id={`${id}-description`}>{rows.length} rows of identical smooth waves with alternating dark and light strokes. Neighboring rows switch colors at different points along the curve. Compare their apparent shapes on a gray or white background.</desc>
      <defs>
        <path id={masterId} d={path} />
        {lightIntervals.map((intervals, phase) => <clipPath key={phase} id={clipId(phase)} clipPathUnits="userSpaceOnUse">
          {intervals.map(({ x, y, width, height }) => <rect key={x} x={x} y={y} width={width} height={height} />)}
        </clipPath>)}
      </defs>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={whiteBackground ? WHITE_SURFACE : GRAY_SURFACE} />
      {rows.map(({ index, y, phase }) => <g key={index} data-row={index} transform={`translate(0,${y})`}>
        <use data-contour="dark" href={`#${masterId}`} fill="none" stroke={DARK_STROKE} strokeWidth={strokeWidth} strokeLinecap="butt" opacity="1" />
        <use data-contour="light" href={`#${masterId}`} fill="none" stroke={LIGHT_STROKE} strokeWidth={strokeWidth} strokeLinecap="butt" opacity="1" clipPath={`url(#${clipId(phase)})`} />
      </g>)}
    </svg>
  )
}
