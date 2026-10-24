import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { CHECK_SIZE, DEFAULT_HALF_DIAGONAL, DEFAULT_REVERSE, DEFAULT_VIEWING_WIDTH, normalizeHalfDiagonal, normalizeViewingWidth, SKYE_GRATING, VIEWING_SIZES } from './skyeGratingModel'
import SkyeGratingStimulus from './SkyeGratingStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function SkyeGrating() {
  const id = useId()
  const [marksVisible, setMarksVisible] = useState(true)
  const [halfDiagonal, setHalfDiagonal] = useState(DEFAULT_HALF_DIAGONAL)
  const [reverse, setReverse] = useState(DEFAULT_REVERSE)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleMarks() {
    setMarksVisible(!marksVisible)
    setStatus(marksVisible ? SKYE_GRATING.proof : 'Check marks shown.')
  }
  function reset() {
    setMarksVisible(true)
    setHalfDiagonal(DEFAULT_HALF_DIAGONAL)
    setReverse(DEFAULT_REVERSE)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Skye grating reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 017 / Lines & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{SKYE_GRATING.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{SKYE_GRATING.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{marksVisible ? 'Check marks visible' : 'Check marks hidden'}</span>
          </div>
          <div data-skye-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><SkyeGratingStimulus marksVisible={marksVisible} halfDiagonal={halfDiagonal} reverse={reverse} /></div>
            <div className="min-h-24 pt-4" aria-hidden={marksVisible}>
              <p hidden={marksVisible} className="text-sm font-medium">{SKYE_GRATING.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{SKYE_GRATING.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the small check marks to compare the edges of the same blue bands.</p>
          <button type="button" aria-pressed={!marksVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleMarks} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide check marks</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Skye grating</button>
          <div className="mt-6">
            <label htmlFor={`${id}-half-diagonal`} className="flex justify-between gap-3 text-sm font-medium">Check-mark half-diagonal<span aria-hidden="true">{halfDiagonal} units</span></label>
            <input id={`${id}-half-diagonal`} type="range" min={CHECK_SIZE.min} max={CHECK_SIZE.max} step={CHECK_SIZE.step} value={halfDiagonal} aria-valuetext={`${halfDiagonal} drawing units`} aria-describedby={`${id}-mark-help`} onChange={(event) => setHalfDiagonal(normalizeHalfDiagonal(event.currentTarget.valueAsNumber))} className={`mt-3 min-h-11 w-full accent-teal-700 ${focus}`} />
            <p id={`${id}-mark-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Changes the small checker diamonds only. Hidden marks stay hidden until you show them again.</p>
          </div>
          <label className={`mt-4 flex min-h-11 items-center gap-3 text-sm font-medium ${focus}`}>
            <input type="checkbox" checked={reverse} onChange={(event) => setReverse(event.currentTarget.checked)} className={`size-5 accent-teal-700 ${focus}`} />
            Reverse alternate bands
          </label>
          <ViewingSizeControl id={`${id}-size`} label="Grating image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{SKYE_GRATING.explanation}</p>
          <p className="mt-4">{SKYE_GRATING.attribution}</p>
          <ul className="mt-3 space-y-2">
            {SKYE_GRATING.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
