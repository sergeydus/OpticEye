import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { DEFAULT_VIEWING_WIDTH, KANIZSA, normalizeRadius, normalizeViewingWidth, RADIUS, VIEWING_SIZES } from './kanizsaModel'
import KanizsaStimulus from './KanizsaStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function Kanizsa() {
  const id = useId()
  const [cutoutsRotated, setCutoutsRotated] = useState(false)
  const [diskRadius, setDiskRadius] = useState<number>(RADIUS.default)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleRotation() {
    setCutoutsRotated(!cutoutsRotated)
    setStatus(cutoutsRotated ? 'Cutouts aligned.' : 'Cutouts rotated 90°. Compare the open space between the disks.')
  }
  function reset() {
    setCutoutsRotated(false)
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
            <span>01 / Observe</span><span>{cutoutsRotated ? 'Cutouts rotated' : 'Cutouts aligned'}</span>
          </div>
          <div data-kanizsa-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><KanizsaStimulus cutoutsRotated={cutoutsRotated} diskRadius={diskRadius} /></div>
            <div className="min-h-24 pt-4" aria-hidden={!cutoutsRotated}>
              <p hidden={!cutoutsRotated} className="text-sm font-medium">Only the cutouts turned. No triangle was drawn.</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{KANIZSA.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-rotation-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Turn each opening 90° without moving the disks.</p>
          <button type="button" aria-pressed={cutoutsRotated} aria-describedby={`${id}-rotation-help`} onClick={toggleRotation} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Rotate cutouts</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Kanizsa</button>
          <div className="mt-7 border-t border-slate-300 pt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-radius`} className="text-sm font-medium">Disk radius</label>
              <output htmlFor={`${id}-radius`} className="font-mono text-sm text-teal-800" aria-live="off">{diskRadius} units</output>
            </div>
            <input id={`${id}-radius`} type="range" min={RADIUS.min} max={RADIUS.max} step={RADIUS.step} value={diskRadius} onChange={(event) => setDiskRadius(normalizeRadius(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-radius-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-radius-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Change all three disks together. Their centers and cutout angles stay fixed.</p>
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
