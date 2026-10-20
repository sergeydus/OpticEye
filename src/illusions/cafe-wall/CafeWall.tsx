import { useId, useState } from 'react'
import ViewingSizeControl from '../../components/ViewingSizeControl'
import { CAFE_WALL, DEFAULT_VIEWING_WIDTH, MORTAR_WIDTH, normalizeMortarWidth, normalizeRowOffset, normalizeViewingWidth, ROW_OFFSET, VIEWING_SIZES } from './cafeWallModel'
import CafeWallStimulus from './CafeWallStimulus'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function CafeWall() {
  const id = useId()
  const [tilesVisible, setTilesVisible] = useState(true)
  const [rowOffsetPercent, setRowOffsetPercent] = useState<number>(ROW_OFFSET.default)
  const [mortarWidth, setMortarWidth] = useState<number>(MORTAR_WIDTH.default)
  const [viewingWidth, setViewingWidth] = useState(DEFAULT_VIEWING_WIDTH)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [status, setStatus] = useState('')

  function toggleReveal() {
    setTilesVisible(!tilesVisible)
    setStatus(tilesVisible ? 'Tiles hidden. All five mortar bands are horizontal and parallel.' : 'Tiles shown.')
  }

  function reset() {
    setTilesVisible(true)
    setRowOffsetPercent(ROW_OFFSET.default)
    setMortarWidth(MORTAR_WIDTH.default)
    setViewingWidth(DEFAULT_VIEWING_WIDTH)
    setExplanationOpen(false)
    setStatus('Café Wall experiment reset.')
  }

  return (
    <article aria-labelledby={`${id}-heading`}>
      <div className="mb-8 sm:mb-10">
        <p className="mb-4 font-mono text-xs tracking-widest text-teal-800 uppercase">Experiment 003 / Lines & context</p>
        <h1 id={`${id}-heading`} className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">{CAFE_WALL.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{CAFE_WALL.instructions}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,720px)_minmax(240px,1fr)] lg:gap-10">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-slate-600">
            <span>01 / Observe</span><span>{tilesVisible ? 'Tile pattern visible' : 'Mortar lines revealed'}</span>
          </div>
          <div data-cafe-wall-viewing-frame className="mx-auto w-full" style={{ maxWidth: viewingWidth }}>
            <div className="overflow-hidden outline outline-slate-300"><CafeWallStimulus tilesVisible={tilesVisible} rowOffsetPercent={rowOffsetPercent} mortarWidth={mortarWidth} /></div>
            <div className="min-h-24 pt-4" aria-hidden={tilesVisible}>
              <p hidden={tilesVisible} className="text-sm font-medium">Same five lines. Only the tiles were removed.</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{CAFE_WALL.viewingInstruction}</p>
          <p className="forced-colors-note mt-3 text-sm">System color overrides may change this demonstration.</p>
        </div>
        <section aria-labelledby={`${id}-controls`} className="min-w-0 border-t border-slate-300 pt-5 lg:border-t-0 lg:pt-0">
          <h2 id={`${id}-controls`} className="font-mono text-xs text-slate-600">02 / Explore</h2>
          <p id={`${id}-reveal-help`} className="mt-5 mb-4 text-sm leading-relaxed text-slate-700">Remove the tile pattern to compare the mortar lines.</p>
          <button type="button" aria-pressed={!tilesVisible} aria-describedby={`${id}-reveal-help`} onClick={toggleReveal} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>Hide tiles</button>
          <button type="button" onClick={reset} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 px-4 py-2 text-sm font-medium hover:bg-white ${focus}`}>Reset Café Wall</button>
          <div className="mt-7 border-t border-slate-300 pt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-offset`} className="text-sm font-medium">Row offset</label>
              <output htmlFor={`${id}-offset`} className="font-mono text-sm text-teal-800" aria-live="off">{rowOffsetPercent}% of a tile</output>
            </div>
            <input id={`${id}-offset`} type="range" min={ROW_OFFSET.min} max={ROW_OFFSET.max} step="1" value={rowOffsetPercent} onChange={(event) => setRowOffsetPercent(normalizeRowOffset(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-offset-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-offset-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Move alternate rows sideways. 50% shifts them by half a tile; 0% aligns matching columns and 100% makes a checkerboard.</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`${id}-mortar`} className="text-sm font-medium">Mortar width</label>
              <output htmlFor={`${id}-mortar`} className="font-mono text-sm text-teal-800" aria-live="off">{mortarWidth} units</output>
            </div>
            <input id={`${id}-mortar`} type="range" min={MORTAR_WIDTH.min} max={MORTAR_WIDTH.max} step="1" value={mortarWidth} onChange={(event) => setMortarWidth(normalizeMortarWidth(event.currentTarget.valueAsNumber))} aria-describedby={`${id}-mortar-help`} className={`my-2 block min-h-11 w-full cursor-pointer accent-teal-800 ${focus}`} />
            <p id={`${id}-mortar-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Wider mortar can weaken the illusion. This changes line thickness and row spacing, in drawing units. Very thin lines can look faint at small sizes.</p>
          </div>
          <ViewingSizeControl id={`${id}-size`} label="Café Wall image size" value={viewingWidth} choices={VIEWING_SIZES} onChange={(width) => setViewingWidth(normalizeViewingWidth(width))} />
          <output aria-live="polite" aria-atomic="true" className="mt-5 block min-h-12 text-sm leading-relaxed text-teal-900">{status}</output>
        </section>
      </div>
      <section className="mt-10 border-t border-slate-300 sm:mt-14">
        <h2><button id={`${id}-explanation-toggle`} type="button" aria-expanded={explanationOpen} aria-controls={`${id}-explanation`} onClick={() => setExplanationOpen(!explanationOpen)} className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium ${focus}`}>
          Why it happens<span aria-hidden="true" className="font-mono text-xl text-teal-800">{explanationOpen ? '−' : '+'}</span>
        </button></h2>
        <div id={`${id}-explanation`} hidden={!explanationOpen} className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-700">
          <p>{CAFE_WALL.explanation}</p>
          <p className="mt-4">{CAFE_WALL.authors}, <a href={CAFE_WALL.paper} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>{CAFE_WALL.paperTitle}</a> {CAFE_WALL.citation}</p>
          <a href={CAFE_WALL.demonstration} className={`mt-2 inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>Michael Bach's Café Wall demonstration ↗</a>
        </div>
      </section>
    </article>
  )
}
