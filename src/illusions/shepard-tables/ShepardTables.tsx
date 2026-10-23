import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { comparisonStage, DEFAULT_VIEWING_WIDTH, normalizeViewingWidth, SHEPARD_TABLES, VIEWING_SIZES } from './shepardTablesModel'
import ShepardTablesStimulus from './ShepardTablesStimulus'
import useShepardComparison from './useShepardComparison'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function ShepardTables() {
  const id = useId()
  const comparison = useShepardComparison()
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const stage = comparisonStage(comparison.progress)
  const status = comparison.active ? stage === 'Exact fit' ? SHEPARD_TABLES.proof : stage === 'Rotate' ? 'Rotate: the left tabletop turns without resizing.' : 'Slide: the left tabletop moves onto the right without resizing.' : notice
  let playLabel = 'Play comparison'
  if (comparison.reducedMotion) playLabel = comparison.progress === 1 ? 'Separate tops' : 'Match instantly'
  else if (comparison.playing) playLabel = 'Pause comparison'
  else if (comparison.progress === 1 || comparison.direction === -1 && comparison.progress > 0) playLabel = 'Play back'
  else if (comparison.progress > 0) playLabel = 'Continue comparison'

  function reset() {
    comparison.backToTables()
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setNotice('Shepard’s tables reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 013 / Shape & depth</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{SHEPARD_TABLES.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{SHEPARD_TABLES.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{comparison.active ? stage : 'Tables visible'}</span>
          </div>
          <div data-shepard-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><ShepardTablesStimulus comparing={comparison.active} progress={comparison.progress} /></div>
            <fieldset className="mt-4 min-w-0">
              <legend className="sr-only">Guided comparison</legend>
          <button type="button" aria-describedby={`${id}-reveal-help`} onClick={comparison.playPause} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>{playLabel}</button>
          {comparison.reducedMotion && <p className="mt-3 text-sm text-slate-600">Reduced motion: match instantly or inspect each step with the slider.</p>}
          <label htmlFor={`${id}-progress`} className="mt-5 flex justify-between gap-3 text-sm font-medium">Comparison progress<span aria-hidden="true">{Math.round(comparison.progress * 100)}%</span></label>
          <input id={`${id}-progress`} type="range" min="0" max="100" step="1" value={Math.round(comparison.progress * 100)} aria-valuetext={`${Math.round(comparison.progress * 100)}% — ${comparison.active ? stage : 'Tables visible'}`} aria-describedby={`${id}-reveal-help`} onPointerDown={comparison.pause} onKeyDown={(event) => { if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) comparison.pause() }} onChange={(event) => comparison.scrub(Number(event.currentTarget.value) / 100)} className={`block min-h-11 w-full accent-teal-700 ${focus}`} />
            </fieldset>
            <div className="min-h-32 pt-4" aria-hidden={comparison.progress !== 1}>
              <p hidden={comparison.progress !== 1} className="text-sm font-medium">{SHEPARD_TABLES.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{SHEPARD_TABLES.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Hide the legs and side faces, then rotate and move the left tabletop onto the right. Neither shape is resized.</p>
          <button type="button" onClick={() => { comparison.backToTables(); setNotice('Original table drawings restored.') }} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Back to tables</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Shepard’s tables</button>
          <ViewingSizeControl id={`${id}-size`} label="Shepard’s tables image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => { comparison.pause(); setViewingWidth(normalizeViewingWidth(width)) }} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{SHEPARD_TABLES.explanation}</p>
          <p className="mt-4">{SHEPARD_TABLES.attribution}</p>
          <p className="mt-3">{SHEPARD_TABLES.historicalReference}</p>
          <ul className="mt-3 space-y-2">
            {SHEPARD_TABLES.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
