import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { CONFETTI, DEFAULT_VIEWING_WIDTH, DISK_FILL, normalizeSpacing, normalizeViewingWidth, SPACING, VIEWING_SIZES } from './confettiModel'
import ConfettiStimulus from './ConfettiStimulus'
import OrangesExample from './OrangesExample'
import { DEFAULT_ORANGES_IMAGE_ID, DEFAULT_ORANGES_VIEWING_WIDTH, type OrangeImageId } from './orangesModel'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function Confetti() {
  const id = useId()
  const [stripesVisible, setStripesVisible] = useState(true)
  const [stripeSpacing, setStripeSpacing] = useState<number>(SPACING.default)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [nettingHidden, setNettingHidden] = useState(false)
  const [orangeViewingWidth, setOrangeViewingWidth] = useState<number>(DEFAULT_ORANGES_VIEWING_WIDTH)
  const [orangeImageId, setOrangeImageId] = useState<OrangeImageId>(DEFAULT_ORANGES_IMAGE_ID)
  const [status, setStatus] = useState('')

  function toggleReveal() {
    setStripesVisible(!stripesVisible)
    setStatus(stripesVisible ? 'Stripes hidden. Every circle uses the same base color.' : 'Stripes shown.')
  }

  function reset() {
    setStripesVisible(true)
    setStripeSpacing(SPACING.default)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setNettingHidden(false)
    setOrangeViewingWidth(DEFAULT_ORANGES_VIEWING_WIDTH)
    setOrangeImageId(DEFAULT_ORANGES_IMAGE_ID)
    setStatus('Experiment reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 001 / Color & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{CONFETTI.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{CONFETTI.instructions}</p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span>
            <span>{stripesVisible ? 'Colored stripes visible' : 'Base colors revealed'}</span>
          </div>
          <div data-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300">
              <ConfettiStimulus stripesVisible={stripesVisible} stripeSpacing={stripeSpacing} />
            </div>
            <div className="min-h-24 pt-4" aria-hidden={stripesVisible}>
              <div hidden={stripesVisible} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 size-8 shrink-0 rounded-full border border-slate-400" style={{ backgroundColor: DISK_FILL }} />
                <div className="min-w-0">
                  <p className="text-sm font-medium">One color. Every circle.</p>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-slate-600">RGB 255, 192, 141 · {DISK_FILL}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">Take a moment to compare the circles, then remove the stripes. Try switching back and forth.</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Colors still look similar? Try Compact and finer stripes. Keep the page at your usual zoom.</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>

        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the stripes to compare the circles.</p>
          <button type="button" aria-pressed={!stripesVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleReveal} className={`flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>
            Show base colors
          </button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset</button>

          <div className="mt-7 border-t border-slate-300 pt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-spacing`} className="text-sm font-medium">Stripe spacing</label>
              <output htmlFor={`${id}-spacing`} className="font-mono text-sm text-teal-800" aria-live="off">{stripeSpacing}</output>
            </div>
            <input id={`${id}-spacing`} type="range" min={SPACING.min} max={SPACING.max} step="1" value={stripeSpacing} onChange={(event) => setStripeSpacing(normalizeSpacing(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-spacing-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <div aria-hidden="true" className="flex justify-between font-mono text-xs text-slate-600"><span>Finer</span><span>Wider</span></div>
            <p id={`${id}-spacing-help`} className="mt-3 text-xs leading-relaxed text-slate-600">A larger value makes the stripes wider. Values are drawing units.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>

      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2>
          <button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
            Why it happens
            <span aria-hidden="true" className="font-mono text-xl text-teal-800">{explanationOpen ? '−' : '+'}</span>
          </button>
        </h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{CONFETTI.explanation}</p>
          <p className="mt-4">{CONFETTI.attribution}.</p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            <a className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`} href={CONFETTI.doi}>Research & attribution ↗</a>
            <a className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`} href={CONFETTI.paper}>Read the original paper (PDF) ↗</a>
          </div>
        </div>
      </section>
      <OrangesExample
        nettingHidden={nettingHidden}
        viewingWidth={orangeViewingWidth}
        onViewingWidthChange={setOrangeViewingWidth}
        imageId={orangeImageId}
        onImageChange={setOrangeImageId}
        onToggleNetting={() => setNettingHidden(!nettingHidden)}
        explanationTarget={`${id}-explanation-toggle`}
        onShowExplanation={() => setExplanationOpen(true)}
      />
    </article>
  )
}
