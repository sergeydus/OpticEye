import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { DEFAULT_VIEWING_WIDTH, normalizeViewingWidth, BULGING_CHECKERBOARD, VIEWING_SIZES } from './bulgingCheckerboardModel'
import BulgingCheckerboardStimulus from './BulgingCheckerboardStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function BulgingCheckerboard() {
  const id = useId()
  const [ticksVisible, setTicksVisible] = useState(true)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleTicks() {
    setTicksVisible(!ticksVisible)
    setStatus(ticksVisible ? BULGING_CHECKERBOARD.proof : 'Corner marks shown.')
  }
  function reset() {
    setTicksVisible(true)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Checkerboard experiment reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 012 / Shape & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{BULGING_CHECKERBOARD.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{BULGING_CHECKERBOARD.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{ticksVisible ? 'Ticks visible' : 'Ticks hidden'}</span>
          </div>
          <div data-checkerboard-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><BulgingCheckerboardStimulus ticksVisible={ticksVisible} /></div>
            <div className="min-h-24 pt-4" aria-hidden={ticksVisible}>
              <p hidden={ticksVisible} className="text-sm font-medium">{BULGING_CHECKERBOARD.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{BULGING_CHECKERBOARD.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the small corner marks to inspect the square grid.</p>
          <button type="button" aria-pressed={!ticksVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleTicks} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide ticks</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset checkerboard</button>
          <ViewingSizeControl id={`${id}-size`} label="Checkerboard image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{BULGING_CHECKERBOARD.explanation}</p>
          <p className="mt-4">{BULGING_CHECKERBOARD.attribution}</p>
          <ul className="mt-3 space-y-2">
            {BULGING_CHECKERBOARD.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
