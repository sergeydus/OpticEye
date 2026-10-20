import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { DEFAULT_VIEWING_WIDTH, DIAMETER, normalizeDiameter, normalizeSpacing, normalizeViewingWidth, SCINTILLATING_GRID, SPACING, VIEWING_SIZES } from './scintillatingGridModel'
import ScintillatingGridStimulus from './ScintillatingGridStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function ScintillatingGrid() {
  const id = useId()
  const [gridVisible, setGridVisible] = useState(true)
  const [spacing, setSpacing] = useState<number>(SPACING.default)
  const [diameter, setDiameter] = useState<number>(DIAMETER.default)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleGrid() {
    setGridVisible(!gridVisible)
    setStatus(gridVisible ? SCINTILLATING_GRID.proof : 'Gray grid shown.')
  }
  function reset() {
    setGridVisible(true)
    setSpacing(SPACING.default)
    setDiameter(DIAMETER.default)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Scintillating grid experiment reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 006 / Pattern & perception</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{SCINTILLATING_GRID.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{SCINTILLATING_GRID.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{gridVisible ? 'Grid visible' : 'Grid hidden'}</span>
          </div>
          <div data-scintillating-grid-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><ScintillatingGridStimulus spacing={spacing} diameter={diameter} gridVisible={gridVisible} /></div>
            <div className="min-h-24 pt-4" aria-hidden={gridVisible}>
              <p hidden={gridVisible} className="text-sm font-medium">{SCINTILLATING_GRID.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{SCINTILLATING_GRID.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Hide the gray lines while keeping the same white disks.</p>
          <button type="button" aria-pressed={!gridVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleGrid} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide grid</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Scintillating grid</button>
          <div className="mt-7 border-t border-slate-300 pt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-spacing`} className="text-sm font-medium">Grid spacing</label>
              <output htmlFor={`${id}-spacing`} className="font-mono text-sm text-teal-800" aria-live="off">{spacing} units</output>
            </div>
            <input id={`${id}-spacing`} type="range" min={SPACING.min} max={SPACING.max} step={SPACING.step} value={spacing} onChange={(event) => setSpacing(normalizeSpacing(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-spacing-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-spacing-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Distance between intersections, in drawing units. The grid and disk positions change together.</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-diameter`} className="text-sm font-medium">Disk diameter</label>
              <output htmlFor={`${id}-diameter`} className="font-mono text-sm text-teal-800" aria-live="off">{diameter} units</output>
            </div>
            <input id={`${id}-diameter`} type="range" min={DIAMETER.min} max={DIAMETER.max} step={DIAMETER.step} value={diameter} onChange={(event) => setDiameter(normalizeDiameter(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-diameter-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-diameter-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Change all white disk diameters together. Their centers stay fixed.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Scintillating grid image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{SCINTILLATING_GRID.explanation}</p>
          <p className="mt-4">{SCINTILLATING_GRID.attribution}</p>
          <ul className="mt-3 space-y-2">
            {SCINTILLATING_GRID.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
