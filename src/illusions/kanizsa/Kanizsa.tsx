import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { DEFAULT_VIEWING_WIDTH, KANIZSA, normalizeRadius, normalizeRotation, normalizeViewingWidth, RADIUS, ROTATION, VIEWING_SIZES } from './kanizsaModel'
import KanizsaStimulus from './KanizsaStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function Kanizsa() {
  const id = useId()
  const [cutoutRotation, setCutoutRotation] = useState<number>(ROTATION.default)
  const [outlineVisible, setOutlineVisible] = useState(true)
  const [diskRadius, setDiskRadius] = useState<number>(RADIUS.default)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function alignCutouts() {
    setCutoutRotation(ROTATION.default)
    setStatus('Cutouts aligned.')
  }
  function reset() {
    setCutoutRotation(ROTATION.default)
    setOutlineVisible(true)
    setDiskRadius(RADIUS.default)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Kanizsa experiment reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 005 / Shapes & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{KANIZSA.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{KANIZSA.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{cutoutRotation === 0 ? 'Cutouts aligned' : `Cutouts rotated ${cutoutRotation}°`}</span>
          </div>
          <div data-kanizsa-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><KanizsaStimulus cutoutRotation={cutoutRotation} diskRadius={diskRadius} outlineVisible={outlineVisible} /></div>
            <div className="min-h-24 pt-4" aria-hidden={cutoutRotation === 0}>
              <p hidden={cutoutRotation === 0} className="text-sm font-medium">No upright triangle is drawn. Only the surrounding shapes changed.</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{KANIZSA.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <button type="button" onClick={alignCutouts} className={`mt-5 min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Align cutouts</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Kanizsa</button>
          <div className="mt-7 border-t border-slate-300 pt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-rotation`} className="text-sm font-medium">Cutout rotation</label>
              <output htmlFor={`${id}-rotation`} className="font-mono text-sm text-teal-800" aria-live="off">{cutoutRotation}°</output>
            </div>
            <input id={`${id}-rotation`} type="range" min={ROTATION.min} max={ROTATION.max} step={ROTATION.step} value={cutoutRotation} onChange={(event) => { setCutoutRotation(normalizeRotation(event.currentTarget.valueAsNumber)); setStatus('') }} aria-describedby={`${id}-rotation-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-rotation-help`} className="mt-2 text-xs leading-relaxed text-slate-600">0° aligns the openings. Turn all three around their own centers.</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-radius`} className="text-sm font-medium">Disk radius</label>
              <output htmlFor={`${id}-radius`} className="font-mono text-sm text-teal-800" aria-live="off">{diskRadius} units</output>
            </div>
            <input id={`${id}-radius`} type="range" min={RADIUS.min} max={RADIUS.max} step={RADIUS.step} value={diskRadius} onChange={(event) => setDiskRadius(normalizeRadius(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-radius-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-radius-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Change all three disks together. Their centers and cutout angles stay fixed.</p>
          </div>
          <div className="mt-6">
            <label className={`flex min-h-11 cursor-pointer items-center gap-3 ${focus}`}>
              <input type="checkbox" checked={outlineVisible} onChange={(event) => setOutlineVisible(event.currentTarget.checked)} aria-describedby={`${id}-outline-help`} className={`size-5 accent-teal-800 ${focus}`} />
              <span className="text-sm font-medium">Outline triangle</span>
            </label>
            <p id={`${id}-outline-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Three unfilled corners of an inverted triangle; the upright triangle is not drawn.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Kanizsa image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-teal-800">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{KANIZSA.explanation}</p>
          <p className="mt-4">{KANIZSA.attribution}</p>
          <ul className="mt-3 space-y-2">
            {KANIZSA.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
