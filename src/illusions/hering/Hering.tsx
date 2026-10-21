import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { DEFAULT_VIEWING_WIDTH, normalizeRayCount, normalizeViewingWidth, HERING, RAY_COUNT, VIEWING_SIZES } from './heringModel'
import HeringStimulus from './HeringStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function Hering() {
  const id = useId()
  const [raysVisible, setRaysVisible] = useState(true)
  const [rayCount, setRayCount] = useState<number>(RAY_COUNT.default)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleRays() {
    setRaysVisible(!raysVisible)
    setStatus(raysVisible ? HERING.proof : 'Rays shown.')
  }
  function reset() {
    setRaysVisible(true)
    setRayCount(RAY_COUNT.default)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Hering experiment reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 009 / Curvature & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{HERING.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{HERING.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{raysVisible ? 'Rays visible' : 'Rays hidden'}</span>
          </div>
          <div data-hering-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><HeringStimulus rayCount={rayCount} raysVisible={raysVisible} /></div>
            <div className="min-h-24 pt-4" aria-hidden={raysVisible}>
              <p hidden={raysVisible} className="text-sm font-medium">{HERING.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{HERING.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the dark rays to compare the red lines.</p>
          <button type="button" aria-pressed={!raysVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleRays} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide rays</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Hering</button>
          <div className="mt-7 border-t border-slate-300 pt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-rayCount`} className="text-sm font-medium">Ray count</label>
              <output htmlFor={`${id}-rayCount`} className="font-mono text-sm text-teal-800" aria-live="off">{rayCount} rays</output>
            </div>
            <input id={`${id}-rayCount`} type="range" min={RAY_COUNT.min} max={RAY_COUNT.max} step={RAY_COUNT.step} value={rayCount} onChange={(event) => setRayCount(normalizeRayCount(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-rayCount-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-rayCount-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Evenly spaced rays around a fixed center. Only the background changes.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Hering image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{HERING.explanation}</p>
          <p className="mt-4">{HERING.attribution}</p>
          <ul className="mt-3 space-y-2">
            {HERING.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
