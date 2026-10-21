import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { DEFAULT_VIEWING_WIDTH, normalizeTopGap, normalizeViewingWidth, PONZO, TOP_GAP, VIEWING_SIZES } from './ponzoModel'
import PonzoStimulus from './PonzoStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function Ponzo() {
  const id = useId()
  const [railsVisible, setRailsVisible] = useState(true)
  const [topGap, setTopGap] = useState<number>(TOP_GAP.default)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleRails() {
    setRailsVisible(!railsVisible)
    setStatus(railsVisible ? PONZO.proof : 'Rails and cross-ties shown.')
  }
  function reset() {
    setRailsVisible(true)
    setTopGap(TOP_GAP.default)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Ponzo experiment reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 010 / Length & perspective</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{PONZO.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{PONZO.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{railsVisible ? 'Rails visible' : 'Rails hidden'}</span>
          </div>
          <div data-ponzo-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><PonzoStimulus topGap={topGap} railsVisible={railsVisible} /></div>
            <div className="min-h-24 pt-4" aria-hidden={railsVisible}>
              <p hidden={railsVisible} className="text-sm font-medium">{PONZO.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{PONZO.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the rails and cross-ties to compare the orange bars.</p>
          <button type="button" aria-pressed={!railsVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleRails} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide rails</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Ponzo</button>
          <div className="mt-7 border-t border-slate-300 pt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-topGap`} className="text-sm font-medium">Top rail gap</label>
              <output htmlFor={`${id}-topGap`} className="font-mono text-sm text-teal-800" aria-live="off">{topGap} units</output>
            </div>
            <input id={`${id}-topGap`} type="range" min={TOP_GAP.min} max={TOP_GAP.max} step={TOP_GAP.step} value={topGap} onChange={(event) => setTopGap(normalizeTopGap(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-topGap-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-topGap-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Distance between the rail endpoints at the top. A larger value widens the opening; only the context changes.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Ponzo image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{PONZO.explanation}</p>
          <p className="mt-4">{PONZO.attribution}</p>
          <ul className="mt-3 space-y-2">
            {PONZO.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
