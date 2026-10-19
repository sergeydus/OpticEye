import { useId } from 'react'
import { NET_VIEWBOX, normalizeOrangesViewingWidth, ORANGES, ORANGES_COMPARISON_GAP, ORANGES_IMAGE, ORANGES_VIEWING_SIZES } from './orangesModel'
import ProduceNetting from './ProduceNetting'

type Props = {
  nettingHidden: boolean
  viewingWidth: number
  onViewingWidthChange: (width: number) => void
  onToggleNetting: () => void
  explanationTarget: string
  onShowExplanation: () => void
}

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function OrangesExample({ nettingHidden, viewingWidth, onViewingWidthChange, onToggleNetting, explanationTarget, onShowExplanation }: Props) {
  const id = useId()
  const caption = 'Orange fine mesh'

  return (
    <section aria-labelledby={`${id}-heading`} className="mt-10 border-t border-slate-300 pt-8">
      <p className="font-mono text-xs tracking-widest text-teal-800 uppercase">03 / Out in the world</p>
      <h2 id={`${id}-heading`} className="mt-3 text-2xl font-semibold tracking-tight">At the produce aisle</h2>
      <p id={`${id}-instructions`} className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">These are deliberately greenish, unripe oranges. Does the net make them look more orange? Compare the two views, then hide the netting.</p>

      <div data-orange-comparison className="mt-6 grid w-full grid-cols-2" style={{ maxWidth: normalizeOrangesViewingWidth(viewingWidth) * 2 + ORANGES_COMPARISON_GAP, gap: ORANGES_COMPARISON_GAP }}>
        <figure aria-label="Greenish oranges with removable orange netting" className="min-w-0">
          <div className="relative overflow-hidden outline outline-slate-300" style={{ containerType: 'inline-size' }}>
            <img src={ORANGES_IMAGE} width={NET_VIEWBOX.width} height={NET_VIEWBOX.height} alt={ORANGES.description} aria-describedby={`${id}-left-caption`} className="block h-auto w-full" />
            {!nettingHidden && <ProduceNetting />}
          </div>
          <figcaption id={`${id}-left-caption`} className="mt-3 min-h-10 text-sm font-medium">{nettingHidden ? 'Netting hidden' : caption}</figcaption>
        </figure>
        <figure aria-label="Greenish oranges without netting" className="min-w-0">
          <div className="relative overflow-hidden outline outline-slate-300">
            <img src={ORANGES_IMAGE} width={NET_VIEWBOX.width} height={NET_VIEWBOX.height} alt={ORANGES.description} aria-describedby={`${id}-right-caption`} className="block h-auto w-full" />
          </div>
          <figcaption id={`${id}-right-caption`} className="mt-3 min-h-10 text-sm font-medium">No netting</figcaption>
        </figure>
      </div>

      <p className="mt-5 text-sm font-medium">Both copies use the identical image file.</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">{ORANGES.origin}. No netting is part of the base illustration.</p>
      <div className="mt-5 max-w-sm">
        <label htmlFor={`${id}-size`} className="text-sm font-medium">Oranges image size</label>
        <select id={`${id}-size`} value={viewingWidth} onChange={(event) => onViewingWidthChange(normalizeOrangesViewingWidth(Number(event.currentTarget.value)))} aria-describedby={`${id}-size-help`} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 bg-transparent px-3 py-2 text-sm ${focus}`}>
          {ORANGES_VIEWING_SIZES.map((size) => <option key={size.width} value={size.width}>{size.label}</option>)}
        </select>
        <p id={`${id}-size-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Resize both views together without changing page zoom. Larger sizes fit your screen; hiding the net keeps your chosen size.</p>
      </div>
      <button type="button" aria-pressed={nettingHidden} aria-describedby={`${id}-instructions`} onClick={onToggleNetting} className={`mt-5 min-h-11 rounded-md border border-slate-400 px-5 py-2 text-sm font-medium hover:bg-white ${focus}`}>Hide netting</button>
      <output aria-live="polite" aria-atomic="true" className="mt-2 block min-h-6 text-sm text-teal-900">{nettingHidden ? 'Netting hidden. Both views are uncovered.' : `${caption} shown on the left.`}</output>

      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-700">{ORANGES.explanation}</p>
      <div className="mt-3 flex max-w-3xl flex-wrap gap-x-6 gap-y-1 text-sm">
        <a href={`#${explanationTarget}`} onClick={onShowExplanation} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>Back to the Confetti explanation</a>
        <a href={ORANGES.source} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>Study: Perceptual ripening of oranges ↗</a>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-600">{ORANGES.citation}.</p>
    </section>
  )
}
