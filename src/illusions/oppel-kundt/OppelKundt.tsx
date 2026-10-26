import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import OppelKundtStimulus from './OppelKundtStimulus'
import { DEFAULT_DIVIDER_COUNT, DEFAULT_FILLED_SIDE, DEFAULT_VIEWING_WIDTH, DIVIDER_COUNT, normalizeDividerCount, normalizeFilledSide, normalizeViewingWidth, OPPEL_KUNDT, VIEWING_SIZES } from './oppelKundtModel'
import type { FilledSide } from './oppelKundtModel'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function OppelKundt() {
  const id = useId()
  const [dividerCount, setDividerCount] = useState<number>(DEFAULT_DIVIDER_COUNT)
  const [filledSide, setFilledSide] = useState<FilledSide>(DEFAULT_FILLED_SIDE)
  const [dividersVisible, setDividersVisible] = useState(true)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')
  const empty = dividerCount === 0
  const proof = empty ? OPPEL_KUNDT.emptyProof : OPPEL_KUNDT.proof

  function toggleDividers() {
    setDividersVisible(!dividersVisible)
    setStatus(dividersVisible ? proof : empty ? 'Dividers shown; none are selected.' : 'Dividers shown.')
  }
  function reset() {
    setDividerCount(DEFAULT_DIVIDER_COUNT)
    setFilledSide(DEFAULT_FILLED_SIDE)
    setDividersVisible(true)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Oppel–Kundt reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 023 / Size & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{OPPEL_KUNDT.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{empty ? OPPEL_KUNDT.emptyInstructions : OPPEL_KUNDT.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{!dividersVisible ? 'Dividers hidden' : empty ? 'No dividers selected' : 'Dividers visible'}</span>
          </div>
          <div data-oppel-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><OppelKundtStimulus dividersVisible={dividersVisible} dividerCount={dividerCount} filledSide={filledSide} /></div>
            <div className="min-h-24 pt-4" aria-hidden={dividersVisible}>
              <p hidden={dividersVisible} className="text-sm font-medium">{proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{OPPEL_KUNDT.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">{empty ? OPPEL_KUNDT.emptyHelp : 'Compare the space from the left marker to the middle marker with the space from the middle marker to the right marker.'}</p>
          <button type="button" aria-pressed={!dividersVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleDividers} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide dividers</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Oppel–Kundt</button>
          <div className="mt-6">
            <label htmlFor={`${id}-count`} className="flex justify-between gap-3 text-sm font-medium">Internal dividers<span aria-hidden="true">{dividerCount}</span></label>
            <input id={`${id}-count`} type="range" min={DIVIDER_COUNT.min} max={DIVIDER_COUNT.max} step={DIVIDER_COUNT.step} value={dividerCount} aria-valuetext={`${dividerCount} internal dividers`} aria-describedby={`${id}-count-help`} onChange={(event) => { setDividerCount(normalizeDividerCount(event.currentTarget.valueAsNumber)); setStatus('') }} className={`mt-3 min-h-11 w-full accent-teal-700 ${focus}`} />
            <p id={`${id}-count-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Changes internal dividers only. Hidden dividers stay hidden.</p>
          </div>
          <div className="mt-6">
            <label htmlFor={`${id}-side`} className="text-sm font-medium">Filled side</label>
            <select id={`${id}-side`} value={filledSide} aria-describedby={`${id}-side-help`} onChange={(event) => { setFilledSide(normalizeFilledSide(event.currentTarget.value)); setStatus('') }} className={`mt-3 min-h-11 w-full rounded-md border border-slate-400 bg-transparent px-3 py-2 text-sm ${focus}`}>
              <option value="left">Left</option><option value="right">Right</option>
            </select>
            <p id={`${id}-side-help`} className="mt-3 text-xs leading-relaxed text-slate-600">Moves the dividers between intervals; the three endpoint markers stay fixed.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Filled-space image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span></button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{OPPEL_KUNDT.explanation}</p><p className="mt-4">{OPPEL_KUNDT.attribution}</p>
          <ul className="mt-3 space-y-2">{OPPEL_KUNDT.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}</ul>
        </div>
      </section>
    </article>
  )
}
