import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { DEFAULT_VIEWING_WIDTH, STRIP_WIDTH, normalizeStripWidth, normalizeAngle, normalizeViewingWidth, POGGENDORFF, ANGLE, VIEWING_SIZES } from './poggendorffModel'
import PoggendorffStimulus from './PoggendorffStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function Poggendorff() {
  const id = useId()
  const [stripVisible, setStripVisible] = useState(true)
  const [angle, setAngle] = useState<number>(ANGLE.default)
  const [stripWidth, setStripWidth] = useState<number>(STRIP_WIDTH.default)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleStrip() {
    setStripVisible(!stripVisible)
    setStatus(stripVisible ? POGGENDORFF.proof : stripWidth === 0 ? 'Strip width is zero; no yellow is drawn.' : 'Strips shown.')
  }
  function reset() {
    setStripVisible(true)
    setAngle(ANGLE.default)
    setStripWidth(STRIP_WIDTH.default)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Poggendorff experiment reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 007 / Alignment & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{POGGENDORFF.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{POGGENDORFF.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{!stripVisible ? 'Strips hidden' : stripWidth === 0 ? 'Strip width 0' : 'Strips visible'}</span>
          </div>
          <div data-poggendorff-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><PoggendorffStimulus angle={angle} stripWidth={stripWidth} stripVisible={stripVisible} /></div>
            <div className="min-h-24 pt-4" aria-hidden={stripVisible}>
              <p hidden={stripVisible} className="text-sm font-medium">{POGGENDORFF.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{POGGENDORFF.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the yellow strips to follow the uninterrupted diagonals.</p>
          <button type="button" aria-pressed={!stripVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleStrip} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide strips</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Poggendorff</button>
          <div className="mt-7 border-t border-slate-300 pt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-angle`} className="text-sm font-medium">Line angle</label>
              <output htmlFor={`${id}-angle`} className="font-mono text-sm text-teal-800" aria-live="off">{angle}°</output>
            </div>
            <input id={`${id}-angle`} type="range" min={ANGLE.min} max={ANGLE.max} step={ANGLE.step} value={angle} onChange={(event) => setAngle(normalizeAngle(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-angle-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-angle-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Angle to the horizontal. This changes orientation, spacing and which lines fit inside the frame.</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-stripWidth`} className="text-sm font-medium">Strip width</label>
              <output htmlFor={`${id}-stripWidth`} className="font-mono text-sm text-teal-800" aria-live="off">{stripWidth} units</output>
            </div>
            <input id={`${id}-stripWidth`} type="range" min={STRIP_WIDTH.min} max={STRIP_WIDTH.max} step={STRIP_WIDTH.step} value={stripWidth} onChange={(event) => setStripWidth(normalizeStripWidth(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-stripWidth-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-stripWidth-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Width of each yellow strip, in drawing units. At 0, no yellow is drawn. Only the strips change.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Poggendorff image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{POGGENDORFF.explanation}</p>
          <p className="mt-4">{POGGENDORFF.attribution}</p>
          <ul className="mt-3 space-y-2">
            {POGGENDORFF.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
