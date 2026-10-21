import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { DEFAULT_VIEWING_WIDTH, normalizeViewingWidth, CHECKER_SHADOW, VIEWING_SIZES } from './checkerShadowModel'
import CheckerShadowStimulus from './CheckerShadowStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function CheckerShadow() {
  const id = useId()
  const [sceneVisible, setSceneVisible] = useState(true)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleScene() {
    setSceneVisible(!sceneVisible)
    setStatus(sceneVisible ? CHECKER_SHADOW.proof : 'Scene shown.')
  }
  function reset() {
    setSceneVisible(true)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Checker-shadow experiment reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 011 / Lightness & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{CHECKER_SHADOW.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{CHECKER_SHADOW.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{sceneVisible ? 'Scene visible' : 'Tiles isolated'}</span>
          </div>
          <div data-checker-shadow-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><CheckerShadowStimulus sceneVisible={sceneVisible} /></div>
            <div className="min-h-24 pt-4" aria-hidden={sceneVisible}>
              <p hidden={sceneVisible} className="text-sm font-medium">{CHECKER_SHADOW.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{CHECKER_SHADOW.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the checkerboard, depicted shadow and cylinder to compare A and B.</p>
          <button type="button" aria-pressed={!sceneVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleScene} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Isolate tiles</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset checker-shadow</button>
          <ViewingSizeControl id={`${id}-size`} label="Checker-shadow image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{CHECKER_SHADOW.explanation}</p>
          <p className="mt-4">{CHECKER_SHADOW.attribution}</p>
          <ul className="mt-3 space-y-2">
            {CHECKER_SHADOW.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
