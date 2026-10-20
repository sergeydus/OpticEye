import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { MULLER_LYER, DEFAULT_VIEWING_WIDTH, FIN_LENGTH, normalizeFinLength, normalizeFinAngle, normalizeViewingWidth, FIN_ANGLE, VIEWING_SIZES } from './mullerLyerModel'
import MullerLyerStimulus from './MullerLyerStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function MullerLyer() {
  const id = useId()
  const [finsVisible, setFinsVisible] = useState(true)
  const [finAngleDegrees, setFinAngleDegrees] = useState<number>(FIN_ANGLE.default)
  const [finLength, setFinLength] = useState<number>(FIN_LENGTH.default)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleReveal() {
    setFinsVisible(!finsVisible)
    setStatus(finsVisible ? 'Fins hidden. Both horizontal lines have the same length.' : 'Fins shown.')
  }

  function reset() {
    setFinsVisible(true)
    setFinAngleDegrees(FIN_ANGLE.default)
    setFinLength(FIN_LENGTH.default)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Müller-Lyer experiment reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 004 / Length & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{MULLER_LYER.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{MULLER_LYER.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{finsVisible ? 'Arrow fins visible' : 'Straight sections revealed'}</span>
          </div>
          <div data-muller-lyer-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><MullerLyerStimulus finsVisible={finsVisible} finAngleDegrees={finAngleDegrees} finLength={finLength} /></div>
            <div className="min-h-24 pt-4" aria-hidden={finsVisible}>
              <p hidden={finsVisible} className="text-sm font-medium">Same two lines. Only the fins were removed.</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{MULLER_LYER.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the arrow fins to compare the straight sections.</p>
          <button type="button" aria-pressed={!finsVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleReveal} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide fins</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Müller-Lyer</button>
          <div className="mt-7 border-t border-slate-300 pt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-angle`} className="text-sm font-medium">Fin angle</label>
              <output htmlFor={`${id}-angle`} className="font-mono text-sm text-teal-800" aria-live="off">{finAngleDegrees}°</output>
            </div>
            <input id={`${id}-angle`} type="range" min={FIN_ANGLE.min} max={FIN_ANGLE.max} step={FIN_ANGLE.step} value={finAngleDegrees} onChange={(event) => setFinAngleDegrees(normalizeFinAngle(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-angle-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-angle-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Angle between each arm and the horizontal, not the full opening between arms. Both rows change together. At 90°, both rows have matching vertical end marks.</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-length`} className="text-sm font-medium">Fin length</label>
              <output htmlFor={`${id}-length`} className="font-mono text-sm text-teal-800" aria-live="off">{finLength} units</output>
            </div>
            <input id={`${id}-length`} type="range" min={FIN_LENGTH.min} max={FIN_LENGTH.max} step={FIN_LENGTH.step} value={finLength} onChange={(event) => setFinLength(normalizeFinLength(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-length-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-length-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Length of each arm from its vertex. The straight sections stay fixed.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Müller-Lyer image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-teal-800">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{MULLER_LYER.explanation}</p>
          <p className="mt-4">{MULLER_LYER.attribution} {MULLER_LYER.citation} <a href={MULLER_LYER.paper} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{MULLER_LYER.paperTitle}</a></p>
          <a href={MULLER_LYER.demonstration} className={`mt-2 inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>Michael Bach's Müller-Lyer demonstration ↗</a>
        </div>
      </section>
    </article>
  )
}
