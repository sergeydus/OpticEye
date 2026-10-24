import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { CURVATURE_BLINDNESS, DEFAULT_VIEWING_WIDTH, DEFAULT_WAVE_DETAIL, normalizeViewingWidth, normalizeWaveDetail, VIEWING_SIZES, WAVE_DETAILS, type WaveDetail } from './curvatureBlindnessModel'
import CurvatureBlindnessStimulus from './CurvatureBlindnessStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function CurvatureBlindness() {
  const id = useId()
  const [whiteBackground, setWhiteBackground] = useState(false)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [waveDetail, setWaveDetail] = useState<WaveDetail>(DEFAULT_WAVE_DETAIL)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleBackground() {
    setWhiteBackground(!whiteBackground)
    setStatus(whiteBackground ? 'Gray background restored; the curves are unchanged.' : CURVATURE_BLINDNESS.proof)
  }
  function reset() {
    setWhiteBackground(false)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setWaveDetail(DEFAULT_WAVE_DETAIL)
    setExplanationOpen(false)
    setStatus('Curvature blindness reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 015 / Shape & contrast</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{CURVATURE_BLINDNESS.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{CURVATURE_BLINDNESS.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{whiteBackground ? 'White background' : 'Gray background'}</span>
          </div>
          <div data-curvature-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><CurvatureBlindnessStimulus whiteBackground={whiteBackground} waveDetail={waveDetail} /></div>
            <div className="min-h-32 pt-4" aria-hidden={!whiteBackground}>
              <p hidden={!whiteBackground} className="text-sm font-medium">{CURVATURE_BLINDNESS.proof}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{CURVATURE_BLINDNESS.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-compare-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Change only the background to compare the apparent shapes of the same smooth curves.</p>
          <button type="button" aria-pressed={whiteBackground} aria-describedby={`${id}-compare-help`} onClick={toggleBackground} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Compare on white</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset curvature blindness</button>
          <div className="mt-6">
            <label htmlFor={`${id}-detail`} className="text-sm font-medium">Wave detail</label>
            <select id={`${id}-detail`} value={waveDetail} onChange={(event) => { setWaveDetail(normalizeWaveDetail(event.currentTarget.value)); setStatus('Wave detail changed; both backgrounds use the selected smooth pattern.') }} aria-describedby={`${id}-detail-help`} className={`mt-3 min-h-11 w-full rounded-md border border-slate-400 bg-transparent px-3 py-2 text-sm ${focus}`}>
              {WAVE_DETAILS.map(({ id: value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
            <p id={`${id}-detail-help`} className="mt-3 text-xs leading-relaxed text-slate-600">Changes wave size and row count. Compare on white keeps the selected pattern unchanged. Fine waves can soften at small image sizes.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Curvature image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-slate-600">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{CURVATURE_BLINDNESS.explanation}</p>
          <p className="mt-4">{CURVATURE_BLINDNESS.attribution}</p>
          <ul className="mt-3 space-y-2">
            {CURVATURE_BLINDNESS.sources.map((source) => <li key={source.url}><a href={source.url} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{source.title}</a><p>{source.citation}</p></li>)}
          </ul>
        </div>
      </section>
    </article>
  )
}
