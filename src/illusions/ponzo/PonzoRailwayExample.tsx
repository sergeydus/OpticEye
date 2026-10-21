/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { normalizeViewingWidth, SURFACE_FILL, VIEWING_SIZES } from './ponzoModel'
import { RAILWAY_IMAGE, RAILWAY_PROOF, RAILWAY_TARGETS, RAILWAY_TARGET_STROKE } from './ponzoRailwayModel'

type Props = {
  visible: boolean
  viewingWidth: number
  status: string
  onToggle: () => void
  onViewingWidthChange: (width: number) => void
  onReset: () => void
  explanationTarget: string
  onShowExplanation: () => void
}

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function PonzoRailwayExample({ visible, viewingWidth, status, onToggle, onViewingWidthChange, onReset, explanationTarget, onShowExplanation }: Props) {
  const id = useId()
  return (
    <section aria-labelledby={`${id}-heading`} className="mt-8">
      <p className="font-mono text-xs tracking-widest text-teal-800 uppercase">01 / Railway perspective</p>
      <h2 id={`${id}-heading`} className="mt-3 text-2xl font-semibold tracking-tight">Railway scene</h2>
      <p id={`${id}-instructions`} className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">Which yellow bar looks longer here? Compare them over the receding track, then hide the image.</p>
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <figure data-railway-viewing-frame className="mx-auto w-full min-w-0" style={{ maxWidth: normalizeViewingWidth(viewingWidth) }}>
          <div className="overflow-hidden outline outline-slate-300">
            <svg viewBox={`0 0 ${RAILWAY_IMAGE.width} ${RAILWAY_IMAGE.height}`} width={RAILWAY_IMAGE.width} height={RAILWAY_IMAGE.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description ${id}-caption`}>
              <title id={`${id}-title`}>Ponzo railway scene</title>
              <desc id={`${id}-description`}>{visible ? 'Two yellow horizontal bars over an AI-generated image of a straight railway track. Compare their apparent lengths, then use Hide image.' : 'The same two equal-length yellow bars with only the AI-generated railway image removed.'}</desc>
              <rect data-layer="surface" x="0" y="0" width={RAILWAY_IMAGE.width} height={RAILWAY_IMAGE.height} fill={SURFACE_FILL} />
              {visible && <image data-layer="railway-image" href={RAILWAY_IMAGE.src} x="0" y="0" width={RAILWAY_IMAGE.width} height={RAILWAY_IMAGE.height} preserveAspectRatio="xMidYMid meet" aria-hidden="true" />}
              <g data-layer="targets" stroke={RAILWAY_TARGET_STROKE.color} strokeWidth={RAILWAY_TARGET_STROKE.width} strokeLinecap="butt" fill="none">
                {RAILWAY_TARGETS.map(({ id: key, ...line }) => <line key={key} {...line} />)}
              </g>
            </svg>
          </div>
          <figcaption id={`${id}-caption`} className="mt-3 text-xs text-slate-600">AI-generated image; the bars are drawn on top.</figcaption>
          <div className="min-h-20 pt-3" aria-hidden={visible}>
            <p hidden={visible} className="text-sm font-medium">{RAILWAY_PROOF}</p>
          </div>
        </figure>
        <div className="min-w-0">
          <button type="button" aria-pressed={!visible} aria-describedby={`${id}-instructions`} onClick={onToggle} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide image</button>
          <button type="button" onClick={onReset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset railway scene</button>
          <ViewingSizeControl id={`${id}-size`} label="Railway image size" value={normalizeViewingWidth(viewingWidth)} choices={VIEWING_SIZES} onChange={onViewingWidthChange} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
          <p className="mt-5 text-sm leading-relaxed text-slate-600">Perspective and texture provide depth cues. The effect can vary with viewer, display and image size. This generated scene is another experiment to compare with the drawing.</p>
          <a href={`#${explanationTarget}`} onClick={onShowExplanation} className={`mt-3 inline-flex min-h-11 items-center text-sm text-teal-800 underline underline-offset-4 ${focus}`}>Read the Ponzo explanation</a>
        </div>
      </div>
    </section>
  )
}
