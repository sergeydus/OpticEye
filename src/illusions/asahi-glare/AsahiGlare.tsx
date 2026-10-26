import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { OPENING_RADIUS, HALF_ANGLE, DEFAULT_OPENING_RADIUS, DEFAULT_HALF_ANGLE, DEFAULT_VIEWING_WIDTH, normalizeOpeningRadius, normalizeHalfAngle, normalizeViewingWidth, ASAHI_GLARE, VIEWING_SIZES } from './asahiGlareModel'
import AsahiGlareStimulus from './AsahiGlareStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function AsahiGlare() {
  const id = useId()
  const [petalsVisible, setPetalsVisible] = useState(true)
  const [openingRadius, setOpeningRadius] = useState(DEFAULT_OPENING_RADIUS)
  const [halfAngle, setHalfAngle] = useState(DEFAULT_HALF_ANGLE)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function togglePetals() {
    setPetalsVisible(!petalsVisible)
    setStatus(petalsVisible ? ASAHI_GLARE.proof : 'Petals shown.')
  }
  function reset() {
    setPetalsVisible(true)
    setOpeningRadius(DEFAULT_OPENING_RADIUS)
    setHalfAngle(DEFAULT_HALF_ANGLE)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Asahi glare reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 020 / Brightness & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{ASAHI_GLARE.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{ASAHI_GLARE.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{petalsVisible ? 'Petals visible' : 'Petals hidden'}</span>
          </div>
          <div data-asahi-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><AsahiGlareStimulus petalsVisible={petalsVisible} openingRadius={openingRadius} halfAngle={halfAngle} /></div>
            <div className="min-h-24 pt-4" aria-hidden={petalsVisible}>
              <p hidden={petalsVisible} className="text-sm font-medium">{ASAHI_GLARE.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{ASAHI_GLARE.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the eight shaded petals to compare the center with the white outer surface.</p>
          <button type="button" aria-pressed={!petalsVisible} aria-describedby={`${id}-reveal-help`} onClick={togglePetals} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide petals</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Asahi glare</button>
          <div className="mt-6">
            <label htmlFor={`${id}-opening`} className="flex justify-between gap-3 text-sm font-medium">Opening radius<span aria-hidden="true">{openingRadius} units</span></label>
            <input id={`${id}-opening`} type="range" min={OPENING_RADIUS.min} max={OPENING_RADIUS.max} step={OPENING_RADIUS.step} value={openingRadius} aria-valuetext={`${openingRadius} drawing units`} aria-describedby={`${id}-opening-help`} onChange={(event) => setOpeningRadius(normalizeOpeningRadius(event.currentTarget.valueAsNumber))} className={`mt-3 min-h-11 w-full accent-teal-700 ${focus}`} />
            <p id={`${id}-opening-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Changes the petal inner edges and shading only. The central target stays the same size.</p>
          </div>
          <div className="mt-6">
            <label htmlFor={`${id}-half-angle`} className="flex justify-between gap-3 text-sm font-medium">Petal half-angle<span aria-hidden="true">{halfAngle}°</span></label>
            <input id={`${id}-half-angle`} type="range" min={HALF_ANGLE.min} max={HALF_ANGLE.max} step={HALF_ANGLE.step} value={halfAngle} aria-valuetext={`${halfAngle} degrees`} aria-describedby={`${id}-angle-help`} onChange={(event) => setHalfAngle(normalizeHalfAngle(event.currentTarget.valueAsNumber))} className={`mt-3 min-h-11 w-full accent-teal-700 ${focus}`} />
            <p id={`${id}-angle-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Changes petal width only. Hidden petals stay hidden until you show them again.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Asahi image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{ASAHI_GLARE.explanation}</p>
          <p className="mt-4">{ASAHI_GLARE.attribution}</p>
          <ul className="mt-3 space-y-2">
            {ASAHI_GLARE.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
