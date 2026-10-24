import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { COMPARISON_DURATION_MS, DEFAULT_VIEWING_WIDTH, normalizeViewingWidth, JASTROW, VIEWING_SIZES } from './jastrowModel'
import JastrowStimulus from './JastrowStimulus'
import useGuidedComparison from '../../components/useGuidedComparison'
import GuidedComparisonControls from '../../components/GuidedComparisonControls'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function Jastrow() {
  const id = useId()
  const comparison = useGuidedComparison(COMPARISON_DURATION_MS)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const stage = comparison.progress === 1 ? 'Exact fit' : 'Slide'
  const status = comparison.active ? stage === 'Exact fit' ? JASTROW.proof : 'Slide: the lower band moves onto the upper without rotating or resizing.' : notice


  function reset() {
    comparison.backToStart()
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setNotice('Jastrow reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 014 / Size & shape</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{JASTROW.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{JASTROW.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{comparison.active ? stage : 'Bands visible'}</span>
          </div>
          <div data-jastrow-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><JastrowStimulus progress={comparison.progress} /></div>
            <GuidedComparisonControls id={`${id}-progress`} helpId={`${id}-reveal-help`} comparison={comparison} stage={stage} initialLabel="Bands visible" separateLabel="Separate bands" />
            <div className="min-h-32 pt-4" aria-hidden={comparison.progress !== 1}>
              <p hidden={comparison.progress !== 1} className="text-sm font-medium">{JASTROW.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{JASTROW.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Follow the lower band as it slides onto the upper one. Neither band rotates or changes size.</p>
          <button type="button" onClick={() => { comparison.backToStart(); setNotice('Original band positions restored.') }} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Back to bands</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Jastrow</button>
          <ViewingSizeControl id={`${id}-size`} label="Jastrow image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => { comparison.pause(); setViewingWidth(normalizeViewingWidth(width)) }} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{JASTROW.explanation}</p>
          <p className="mt-4">{JASTROW.attribution}</p>
          <ul className="mt-3 space-y-2">
            {JASTROW.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
