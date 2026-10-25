import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { TILT, DEFAULT_TILT, DEFAULT_REVERSE, DEFAULT_VIEWING_WIDTH, normalizeTilt, normalizeViewingWidth, FRASER_SPIRAL, VIEWING_SIZES } from './fraserSpiralModel'
import FraserSpiralStimulus from './FraserSpiralStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function FraserSpiral() {
  const id = useId()
  const [contextVisible, setContextVisible] = useState(true)
  const [angle, setAngle] = useState(DEFAULT_TILT)
  const [reverse, setReverse] = useState(DEFAULT_REVERSE)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleContext() {
    setContextVisible(!contextVisible)
    setStatus(contextVisible ? FRASER_SPIRAL.proof : 'Cord pattern shown.')
  }
  function reset() {
    setContextVisible(true)
    setAngle(DEFAULT_TILT)
    setReverse(DEFAULT_REVERSE)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Fraser spiral reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 019 / Direction & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{FRASER_SPIRAL.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{FRASER_SPIRAL.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{contextVisible ? 'Cord pattern visible' : 'Circular bands uncovered'}</span>
          </div>
          <div data-fraser-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><FraserSpiralStimulus contextVisible={contextVisible} angle={angle} reverse={reverse} /></div>
            <div className="min-h-24 pt-4" aria-hidden={contextVisible}>
              <p hidden={contextVisible} className="text-sm font-medium">{FRASER_SPIRAL.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{FRASER_SPIRAL.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the cord tiles and checker background to uncover the same eight gray circles underneath.</p>
          <button type="button" aria-pressed={!contextVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleContext} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Show circular bands</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Fraser spiral</button>
          <div className="mt-6">
            <label htmlFor={`${id}-tilt`} className="flex justify-between gap-3 text-sm font-medium">Cord tilt<span aria-hidden="true">{angle}°</span></label>
            <input id={`${id}-tilt`} type="range" min={TILT.min} max={TILT.max} step={TILT.step} value={angle} aria-valuetext={`${angle} degrees`} aria-describedby={`${id}-mark-help`} onChange={(event) => setAngle(normalizeTilt(event.currentTarget.valueAsNumber))} className={`mt-3 min-h-11 w-full accent-teal-700 ${focus}`} />
            <p id={`${id}-mark-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Changes the oblique separators of the cord tiles only. Hidden context stays hidden until you show it again.</p>
          </div>
          <label className={`mt-4 flex min-h-11 items-center gap-3 text-sm font-medium ${focus}`}>
            <input type="checkbox" checked={reverse} onChange={(event) => setReverse(event.currentTarget.checked)} className={`size-5 accent-teal-700 ${focus}`} />
            Reverse twist
          </label>
          <ViewingSizeControl id={`${id}-size`} label="Fraser image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{FRASER_SPIRAL.explanation}</p>
          <p className="mt-4">{FRASER_SPIRAL.attribution}</p>
          <ul className="mt-3 space-y-2">
            {FRASER_SPIRAL.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
