import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { WREATH_COUNT, STRAND_WIDTH, DEFAULT_WREATH_COUNT, DEFAULT_STRAND_WIDTH, DEFAULT_VIEWING_WIDTH, normalizeWreathCount, normalizeStrandWidth, normalizeViewingWidth, SCINTILLATING_STARBURST, VIEWING_SIZES } from './scintillatingStarburstModel'
import ScintillatingStarburstStimulus from './ScintillatingStarburstStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function ScintillatingStarburst() {
  const id = useId()
  const [crossingsVisible, setCrossingsVisible] = useState(true)
  const [wreathCount, setWreathCount] = useState(DEFAULT_WREATH_COUNT)
  const [strandWidth, setStrandWidth] = useState(DEFAULT_STRAND_WIDTH)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleCrossings() {
    setCrossingsVisible(!crossingsVisible)
    setStatus(crossingsVisible ? SCINTILLATING_STARBURST.proof : 'Crossing polygons shown.')
  }
  function reset() {
    setCrossingsVisible(true)
    setWreathCount(DEFAULT_WREATH_COUNT)
    setStrandWidth(DEFAULT_STRAND_WIDTH)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Starburst reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 022 / Patterns & perception</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{SCINTILLATING_STARBURST.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{SCINTILLATING_STARBURST.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{crossingsVisible ? 'Crossing polygons visible' : 'Crossing polygons hidden'}</span>
          </div>
          <div data-starburst-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><ScintillatingStarburstStimulus crossingsVisible={crossingsVisible} wreathCount={wreathCount} strandWidth={strandWidth} /></div>
            <div className="min-h-24 pt-4" aria-hidden={crossingsVisible}>
              <p hidden={crossingsVisible} className="text-sm font-medium">{SCINTILLATING_STARBURST.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{SCINTILLATING_STARBURST.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove only the rotated polygon pairs to compare the remaining outlines.</p>
          <button type="button" aria-pressed={!crossingsVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleCrossings} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide crossing polygons</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset starburst</button>
          <div className="mt-6">
            <label htmlFor={`${id}-count`} className="flex justify-between gap-3 text-sm font-medium">Polygon wreaths<span aria-hidden="true">{wreathCount}</span></label>
            <input id={`${id}-count`} type="range" min={WREATH_COUNT.min} max={WREATH_COUNT.max} step={WREATH_COUNT.step} value={wreathCount} aria-valuetext={`${wreathCount} polygon wreaths`} aria-describedby={`${id}-count-help`} onChange={(event) => setWreathCount(normalizeWreathCount(event.currentTarget.valueAsNumber))} className={`mt-3 min-h-11 w-full accent-teal-700 ${focus}`} />
            <p id={`${id}-count-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Changes the number of complete wreaths. Hidden crossing polygons stay hidden.</p>
          </div>
          <div className="mt-6">
            <label htmlFor={`${id}-width`} className="flex justify-between gap-3 text-sm font-medium">Strand width<span aria-hidden="true">{strandWidth} units</span></label>
            <input id={`${id}-width`} type="range" min={STRAND_WIDTH.min} max={STRAND_WIDTH.max} step={STRAND_WIDTH.step} value={strandWidth} aria-valuetext={`${strandWidth} drawing units`} aria-describedby={`${id}-width-help`} onChange={(event) => setStrandWidth(normalizeStrandWidth(event.currentTarget.valueAsNumber))} className={`mt-3 min-h-11 w-full accent-teal-700 ${focus}`} />
            <p id={`${id}-width-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Changes every outline equally. Fine strands can soften at smaller sizes.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Starburst image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{SCINTILLATING_STARBURST.explanation}</p>
          <p className="mt-4">{SCINTILLATING_STARBURST.attribution}</p>
          <ul className="mt-3 space-y-2">
            {SCINTILLATING_STARBURST.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
