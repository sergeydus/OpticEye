import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { COLORED_RADIUS, SPOKE_WIDTH, INDUCER_GAP, SPOKE_COLORS, DEFAULT_COLORED_RADIUS, DEFAULT_SPOKE_WIDTH, DEFAULT_INDUCER_GAP, DEFAULT_COLOR, DEFAULT_VIEWING_WIDTH, normalizeColoredRadius, normalizeSpokeWidth, normalizeInducerGap, normalizeColor, normalizeViewingWidth, NEON_COLOR_SPREADING, VIEWING_SIZES } from './neonColorSpreadingModel'
import NeonColorSpreadingStimulus from './NeonColorSpreadingStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function NeonColorSpreading() {
  const id = useId()
  const [raysVisible, setRaysVisible] = useState(true)
  const [coloredRadius, setColoredRadius] = useState(DEFAULT_COLORED_RADIUS)
  const [spokeWidth, setSpokeWidth] = useState(DEFAULT_SPOKE_WIDTH)
  const [inducerGap, setInducerGap] = useState(DEFAULT_INDUCER_GAP)
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleRays() {
    setRaysVisible(!raysVisible)
    setStatus(raysVisible ? NEON_COLOR_SPREADING.proof : 'Outer rays shown.')
  }
  function reset() {
    setRaysVisible(true)
    setColoredRadius(DEFAULT_COLORED_RADIUS)
    setSpokeWidth(DEFAULT_SPOKE_WIDTH)
    setInducerGap(DEFAULT_INDUCER_GAP)
    setColor(DEFAULT_COLOR)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Neon color spreading reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 021 / Color & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{NEON_COLOR_SPREADING.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{NEON_COLOR_SPREADING.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{raysVisible ? 'Outer rays visible' : 'Outer rays hidden'}</span>
          </div>
          <div data-neon-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><NeonColorSpreadingStimulus raysVisible={raysVisible} coloredRadius={coloredRadius} spokeWidth={spokeWidth} inducerGap={inducerGap} color={color} /></div>
            <div className="min-h-24 pt-4" aria-hidden={raysVisible}>
              <p hidden={raysVisible} className="text-sm font-medium">{NEON_COLOR_SPREADING.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{NEON_COLOR_SPREADING.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Look between the colored strokes, then remove only the black outer rays.</p>
          <button type="button" aria-pressed={!raysVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleRays} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide outer rays</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset neon color spreading</button>
          <div className="mt-6">
            <label htmlFor={`${id}-radius`} className="flex justify-between gap-3 text-sm font-medium">Colored radius<span aria-hidden="true">{coloredRadius} units</span></label>
            <input id={`${id}-radius`} type="range" min={COLORED_RADIUS.min} max={COLORED_RADIUS.max} step={COLORED_RADIUS.step} value={coloredRadius} aria-valuetext={`${coloredRadius} drawing units`} aria-describedby={`${id}-radius-help`} onChange={(event) => setColoredRadius(normalizeColoredRadius(event.currentTarget.valueAsNumber))} className={`mt-3 min-h-11 w-full accent-teal-700 ${focus}`} />
            <p id={`${id}-radius-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Changes the length of the colored spokes and the matching black-ray starts.</p>
          </div>
          <div className="mt-6">
            <label htmlFor={`${id}-width`} className="flex justify-between gap-3 text-sm font-medium">Spoke width<span aria-hidden="true">{spokeWidth} units</span></label>
            <input id={`${id}-width`} type="range" min={SPOKE_WIDTH.min} max={SPOKE_WIDTH.max} step={SPOKE_WIDTH.step} value={spokeWidth} aria-valuetext={`${spokeWidth} drawing units`} aria-describedby={`${id}-width-help`} onChange={(event) => setSpokeWidth(normalizeSpokeWidth(event.currentTarget.valueAsNumber))} className={`mt-3 min-h-11 w-full accent-teal-700 ${focus}`} />
            <p id={`${id}-width-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Changes the width of both the colored spokes and black rays.</p>
          </div>
          <div className="mt-6">
            <label htmlFor={`${id}-gap`} className="flex justify-between gap-3 text-sm font-medium">Inducer gap<span aria-hidden="true">{inducerGap} units</span></label>
            <input id={`${id}-gap`} type="range" min={INDUCER_GAP.min} max={INDUCER_GAP.max} step={INDUCER_GAP.step} value={inducerGap} aria-valuetext={`${inducerGap} drawing units`} aria-describedby={`${id}-gap-help`} onChange={(event) => setInducerGap(normalizeInducerGap(event.currentTarget.valueAsNumber))} className={`mt-3 min-h-11 w-full accent-teal-700 ${focus}`} />
            <p id={`${id}-gap-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Separates only the black rays from the colored spokes. Small gaps may soften at smaller image sizes.</p>
          </div>
          <div className="mt-6">
            <label htmlFor={`${id}-color`} className="text-sm font-medium">Spoke color</label>
            <select id={`${id}-color`} value={color} onChange={(event) => setColor(normalizeColor(event.currentTarget.value))} className={`mt-3 min-h-11 w-full rounded-md border border-slate-400 bg-transparent px-3 py-2 text-sm ${focus}`}>
              {SPOKE_COLORS.map(choice => <option key={choice.value} value={choice.value}>{choice.label}</option>)}
            </select>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Neon image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{NEON_COLOR_SPREADING.explanation}</p>
          <p className="mt-4">{NEON_COLOR_SPREADING.attribution}</p>
          <ul className="mt-3 space-y-2">
            {NEON_COLOR_SPREADING.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
