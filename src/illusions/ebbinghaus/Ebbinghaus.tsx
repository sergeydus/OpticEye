import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { DEFAULT_VIEWING_WIDTH, LARGE_GAP, normalizeLargeGap, normalizeLargeRadius, normalizeViewingWidth, EBBINGHAUS, LARGE_RADIUS, VIEWING_SIZES } from './ebbinghausModel'
import EbbinghausStimulus from './EbbinghausStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function Ebbinghaus() {
  const id = useId()
  const [contextVisible, setContextVisible] = useState(true)
  const [largeRadius, setLargeRadius] = useState<number>(LARGE_RADIUS.default)
  const [largeGap, setLargeGap] = useState<number>(LARGE_GAP.default)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleContext() {
    setContextVisible(!contextVisible)
    setStatus(contextVisible ? EBBINGHAUS.proof : 'Surrounds shown.')
  }
  function reset() {
    setContextVisible(true)
    setLargeRadius(LARGE_RADIUS.default)
    setLargeGap(LARGE_GAP.default)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Ebbinghaus experiment reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 008 / Size & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{EBBINGHAUS.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{EBBINGHAUS.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{contextVisible ? 'Surrounds visible' : 'Surrounds hidden'}</span>
          </div>
          <div data-ebbinghaus-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><EbbinghausStimulus largeRadius={largeRadius} largeGap={largeGap} contextVisible={contextVisible} /></div>
            <div className="min-h-24 pt-4" aria-hidden={contextVisible}>
              <p hidden={contextVisible} className="text-sm font-medium">{EBBINGHAUS.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{EBBINGHAUS.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the blue surrounds to compare the orange circles.</p>
          <button type="button" aria-pressed={!contextVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleContext} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide surrounds</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Ebbinghaus</button>
          <div className="mt-7 border-t border-slate-300 pt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-largeRadius`} className="text-sm font-medium">Large surround radius</label>
              <output htmlFor={`${id}-largeRadius`} className="font-mono text-sm text-teal-800" aria-live="off">{largeRadius} units</output>
            </div>
            <input id={`${id}-largeRadius`} type="range" min={LARGE_RADIUS.min} max={LARGE_RADIUS.max} step={LARGE_RADIUS.step} value={largeRadius} onChange={(event) => setLargeRadius(normalizeLargeRadius(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-largeRadius-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-largeRadius-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Radius of each large blue disk, in drawing units. Only the left surround changes; its edge gap stays fixed.</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-largeGap`} className="text-sm font-medium">Large surround gap</label>
              <output htmlFor={`${id}-largeGap`} className="font-mono text-sm text-teal-800" aria-live="off">{largeGap} units</output>
            </div>
            <input id={`${id}-largeGap`} type="range" min={LARGE_GAP.min} max={LARGE_GAP.max} step={LARGE_GAP.step} value={largeGap} onChange={(event) => setLargeGap(normalizeLargeGap(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-largeGap-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-largeGap-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Edge-to-edge gap between the left orange circle and its blue neighbors. The small right surround keeps an 8-unit gap.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Ebbinghaus image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{EBBINGHAUS.explanation}</p>
          <p className="mt-4">{EBBINGHAUS.attribution}</p>
          <ul className="mt-3 space-y-2">
            {EBBINGHAUS.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
