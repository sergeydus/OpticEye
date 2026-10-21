/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { BOARD_FACES, CONTEXT_TILES, CYLINDER, pointsAttribute, SHADOW, SHADOW_FRAME, SHADOW_GRADIENT, SURFACE_FILL, TARGET_RGB, TARGETS, tileVertices, VIEWBOX } from './checkerShadowModel'

export default function CheckerShadowStimulus({ sceneVisible }: { sceneVisible: boolean }) {
  const id = useId()
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Checker-shadow illusion</title>
      <desc id={`${id}-description`}>{sceneVisible
        ? 'Tiles A and B on a checkerboard with a depicted shadow and green cylinder. Compare their apparent shades, then use Isolate tiles.'
        : 'The same two tiles A and B, both with flat #707070 fills, with only their surrounding scene removed.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {sceneVisible && <g data-layer="context" stroke="none">
        <defs>
          {(['dark', 'light'] as const).map((parity) => <g key={parity}>
            <radialGradient id={`${id}-${parity}-cap`} gradientUnits="objectBoundingBox" cx="0.5" cy="0.5" r="0.5" spreadMethod="pad" colorInterpolation="sRGB">
              <stop offset="0" stopColor={SHADOW_GRADIENT[parity].core} stopOpacity="1" />
              <stop offset={SHADOW.core} stopColor={SHADOW_GRADIENT[parity].core} stopOpacity="1" />
              <stop offset="1" stopColor={SHADOW_GRADIENT[parity].outside} stopOpacity="1" />
            </radialGradient>
            <linearGradient id={`${id}-${parity}-body`} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={-SHADOW.radius} y2={SHADOW.radius} colorInterpolation="sRGB">
              <stop offset="0" stopColor={SHADOW_GRADIENT[parity].outside} stopOpacity="1" />
              <stop offset="0.1" stopColor={SHADOW_GRADIENT[parity].core} stopOpacity="1" />
              <stop offset="0.9" stopColor={SHADOW_GRADIENT[parity].core} stopOpacity="1" />
              <stop offset="1" stopColor={SHADOW_GRADIENT[parity].outside} stopOpacity="1" />
            </linearGradient>
            <pattern id={`${id}-${parity}-scene`} patternUnits="userSpaceOnUse" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height}>
              <rect x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SHADOW_GRADIENT[parity].outside} />
              <g transform={`matrix(${SHADOW_FRAME.a} ${SHADOW_FRAME.b} ${SHADOW_FRAME.c} ${SHADOW_FRAME.d} ${SHADOW_FRAME.x} ${SHADOW_FRAME.y})`}>
                <circle cx="0" cy="0" r={SHADOW.radius} fill={`url(#${id}-${parity}-cap)`} />
                <circle cx={SHADOW_FRAME.length} cy="0" r={SHADOW.radius} fill={`url(#${id}-${parity}-cap)`} />
                <rect x="0" y={-SHADOW.radius} width={SHADOW_FRAME.length} height={2 * SHADOW.radius} fill={`url(#${id}-${parity}-body)`} />
              </g>
            </pattern>
          </g>)}
          <linearGradient id={`${id}-cylinder`} gradientUnits="userSpaceOnUse" x1={CYLINDER.left.x} x2={CYLINDER.right.x} y1="0" y2="0" colorInterpolation="sRGB">
            {CYLINDER.colors.map((color, k) => <stop key={color} offset={[0, 0.4, 1][k]} stopColor={color} stopOpacity="1" />)}
          </linearGradient>
        </defs>
        <g data-layer="board-faces">{BOARD_FACES.map(({ id: key, ...face }) => <polygon key={key} {...face} />)}</g>
        <g data-layer="context-tiles">{CONTEXT_TILES.map((tile) => <polygon key={tile.id} data-tile={tile.id} points={pointsAttribute(tile.points)} fill={`url(#${id}-${tile.dark ? 'dark' : 'light'}-scene)`} />)}</g>
        <g data-layer="cylinder">
          <path d={CYLINDER.body} fill={`url(#${id}-cylinder)`} />
          <ellipse cx={CYLINDER.cx} cy={CYLINDER.topY} rx={CYLINDER.rx} ry={CYLINDER.ry} transform={`rotate(${CYLINDER.rotation} ${CYLINDER.cx} ${CYLINDER.topY})`} fill={CYLINDER.topFill} stroke={CYLINDER.topStroke} strokeWidth="2" />
        </g>
      </g>}
      <g data-layer="targets" fill={TARGET_RGB} opacity="1" stroke="none">
        {TARGETS.map(({ id: key, i, j }) => <polygon key={key} data-target={key} points={pointsAttribute(tileVertices(i, j))} fill={TARGET_RGB} />)}
      </g>
      <g data-layer="labels" textAnchor="middle" dominantBaseline="central" fontFamily="system-ui" fontWeight="bold" fontSize="20" fill="#111111" stroke="none">
        {TARGETS.map(({ id: key, label }) => <text key={key} x={label.x} y={label.y}>{key}</text>)}
      </g>
    </svg>
  )
}
