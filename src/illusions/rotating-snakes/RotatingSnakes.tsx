import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import RotatingSnakesStimulus from './RotatingSnakesStimulus'
import { CYCLE_COUNTS, DEFAULT_CYCLES, DEFAULT_PALETTE, DEFAULT_VIEWING_WIDTH, normalizeCycles, normalizePalette, normalizeViewingWidth, ROTATING_SNAKES, VIEWING_SIZES } from './rotatingSnakesModel'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'
const selectClass = `mt-3 min-h-11 w-full rounded-md border border-slate-400 bg-transparent px-3 py-2 text-sm ${focus}`

export default function RotatingSnakes() {
  const id = useId()
  const [cycles, setCycles] = useState(DEFAULT_CYCLES)
  const [palette, setPalette] = useState(DEFAULT_PALETTE)
  const [reverse, setReverse] = useState(false)
  const [symmetric, setSymmetric] = useState(false)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function togglePattern() {
    setSymmetric(!symmetric)
    setStatus(symmetric ? 'Selected asymmetric colors restored. The drawing remains static.' : ROTATING_SNAKES.proof)
  }
  function reset() {
    setCycles(DEFAULT_CYCLES)
    setPalette(DEFAULT_PALETTE)
    setReverse(false)
    setSymmetric(false)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Rotating snakes reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 018 / Static motion</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{ROTATING_SNAKES.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{ROTATING_SNAKES.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600"><span>01 / Observe</span><span>{symmetric ? 'Symmetric pattern' : 'Asymmetric pattern'}</span></div>
          <div data-snakes-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><RotatingSnakesStimulus cycles={cycles} palette={palette} reverse={reverse} symmetric={symmetric} /></div>
            <div className="min-h-32 pt-4" aria-hidden={!symmetric}><p hidden={!symmetric} className="text-sm font-medium">{ROTATING_SNAKES.proof}</p></div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{ROTATING_SNAKES.viewingInstruction}</p>
          <p className="mt-3 text-sm font-medium">{ROTATING_SNAKES.comfort}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-compare-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Compare with matching gray intermediate segments. This intentionally changes colors, not positions.</p>
          <button type="button" aria-pressed={symmetric} aria-describedby={`${id}-compare-help`} onClick={togglePattern} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Use symmetric pattern</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset rotating snakes</button>
          <div className="mt-6">
            <label htmlFor={`${id}-cycles`} className="text-sm font-medium">Cycles per ring</label>
            <select id={`${id}-cycles`} value={cycles} onChange={(event) => setCycles(normalizeCycles(Number(event.currentTarget.value)))} aria-describedby={`${id}-cycles-help`} className={selectClass}>
              {CYCLE_COUNTS.map((count) => <option key={count} value={count}>{count}</option>)}
            </select>
            <p id={`${id}-cycles-help`} className="mt-3 text-xs leading-relaxed text-slate-600">Changes the number of segments. Finer patterns can soften at small sizes.</p>
          </div>
          <div className="mt-6">
            <label htmlFor={`${id}-palette`} className="text-sm font-medium">Pattern palette</label>
            <select id={`${id}-palette`} value={palette} onChange={(event) => setPalette(normalizePalette(event.currentTarget.value))} aria-describedby={`${id}-palette-help`} className={selectClass}><option value="color">Color</option><option value="gray">Gray</option></select>
            <p id={`${id}-palette-help`} className="mt-3 text-xs leading-relaxed text-slate-600">Palette and reversal choices return when you leave the symmetric comparison.</p>
          </div>
          <label className="mt-5 flex min-h-11 items-center gap-3 text-sm font-medium"><input type="checkbox" checked={reverse} onChange={(event) => setReverse(event.currentTarget.checked)} className={`size-4 accent-teal-700 ${focus}`} />Reverse sequence</label>
          <ViewingSizeControl id={`${id}-size`} label="Snakes image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} help="Compare image sizes. Medium and Large may look the same on narrow screens; larger is not necessarily stronger." />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span></button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{ROTATING_SNAKES.explanation}</p><p className="mt-4">{ROTATING_SNAKES.attribution}</p>
          <ul className="mt-3 space-y-2">{ROTATING_SNAKES.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}</ul>
        </div>
      </section>
    </article>
  )
}
