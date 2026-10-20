import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { DEFAULT_VIEWING_WIDTH, MUNKER, normalizeStripeWidth, normalizeViewingWidth, STRIPE_WIDTH, TARGET_FILL, VIEWING_SIZES } from './munkerModel'
import MunkerStimulus from './MunkerStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function Munker() {
  const id = useId()
  const [contextVisible, setContextVisible] = useState(true)
  const [stripeWidth, setStripeWidth] = useState<number>(STRIPE_WIDTH.default)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleReveal() {
    setContextVisible(!contextVisible)
    setStatus(contextVisible ? 'Grid hidden. Both bars use the same green fill.' : 'Grid shown.')
  }

  function reset() {
    setContextVisible(true)
    setStripeWidth(STRIPE_WIDTH.default)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Munker experiment reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 002 / Color & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{MUNKER.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{MUNKER.instructions}</p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{contextVisible ? 'Colored grid visible' : 'Base color revealed'}</span>
          </div>
          <div data-munker-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><MunkerStimulus contextVisible={contextVisible} stripeWidth={stripeWidth} /></div>
            <div className="min-h-24 pt-4" aria-hidden={contextVisible}>
              <div hidden={contextVisible} className="flex items-start gap-3">
                <span data-munker-swatch aria-hidden="true" className="mt-0.5 size-8 shrink-0 rounded-full border border-slate-400" style={{ backgroundColor: TARGET_FILL }} />
                <div className="min-w-0">
                  <p className="text-sm font-medium">One color. Both bars.</p>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-slate-600">RGB 0, 255, 0 · {TARGET_FILL}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">Compare the green portions between the stripes, then hide the grid. Try a smaller image or finer stripes if the difference is subtle.</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>

        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the grid to compare the bars.</p>
          <button type="button" aria-pressed={!contextVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleReveal} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Show base color</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Munker</button>
          <div className="mt-7 border-t border-slate-300 pt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-width`} className="text-sm font-medium">Stripe width</label>
              <output htmlFor={`${id}-width`} className="font-mono text-sm text-teal-800" aria-live="off">{stripeWidth}</output>
            </div>
            <input id={`${id}-width`} type="range" min={STRIPE_WIDTH.min} max={STRIPE_WIDTH.max} step="1" value={stripeWidth} onChange={(event) => setStripeWidth(normalizeStripeWidth(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-width-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <div aria-hidden="true" className="flex justify-between font-mono text-xs text-slate-600"><span>Finer</span><span>Wider</span></div>
            <p id={`${id}-width-help`} className="mt-3 text-xs leading-relaxed text-slate-600">A larger value makes the stripes wider. Values are drawing units.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Munker image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>

      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-teal-800">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{MUNKER.explanation}</p><p className="mt-3">{MUNKER.limitation}</p>
          <p className="mt-4">{MUNKER.attribution}</p>
          <a href={MUNKER.source} className={`mt-2 inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>Explore Michael Bach's Munker demonstration ↗</a>
        </div>
      </section>
    </article>
  )
}
