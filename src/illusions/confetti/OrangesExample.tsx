import { useId } from 'react'
import { getOrangesImage, normalizeOrangesViewingWidth, ORANGES, ORANGES_AI_URL, ORANGES_VIEWING_SIZES, type OrangeImageId } from './orangesModel'
import ProduceNetting from './ProduceNetting'

type Props = {
  nettingHidden: boolean
  viewingWidth: number
  onViewingWidthChange: (width: number) => void
  imageId: OrangeImageId
  onImageChange: (id: OrangeImageId) => void
  onToggleNetting: () => void
  explanationTarget: string
  onShowExplanation: () => void
}

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function OrangesExample({ nettingHidden, viewingWidth, onViewingWidthChange, imageId, onImageChange, onToggleNetting, explanationTarget, onShowExplanation }: Props) {
  const id = useId()
  const image = getOrangesImage(imageId)

  return (
    <section aria-labelledby={`${id}-heading`} className="mt-10 border-t border-slate-300 pt-8">
      <p className="font-mono text-xs tracking-widest text-teal-800 uppercase">03 / Out in the world</p>
      <h2 id={`${id}-heading`} className="mt-3 text-2xl font-semibold tracking-tight">At the produce aisle</h2>
      <p id={`${id}-instructions`} className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">{image.id === 'illustration' ? 'These oranges are deliberately illustrated as greenish and unripe.' : 'This AI-generated image depicts unripe green citrus.'} Does the net make the skin look more orange? Look between the strands, then hide the netting to compare.</p>

      <figure aria-label="Oranges with removable orange netting" data-orange-viewing-frame className="mt-6 w-full min-w-0" style={{ maxWidth: normalizeOrangesViewingWidth(viewingWidth) }}>
        <div data-orange-frame className="relative isolate overflow-hidden outline outline-slate-300">
          <img src={image.src} width={image.width} height={image.height} alt={image.description} aria-describedby={`${id}-caption`} className="block h-auto w-full" />
          {!nettingHidden && <ProduceNetting />}
        </div>
        <figcaption id={`${id}-caption`} className="mt-3 min-h-12 text-sm font-medium">
          <span className="block">{nettingHidden ? 'Netting hidden' : 'Orange netting'}</span>
          {image.id !== 'illustration' && <span className="mt-1 block text-xs font-normal text-slate-600">AI-generated image; the net is drawn on top.</span>}
        </figcaption>
      </figure>

      <p className="mt-5 text-sm font-medium">Both states use the same image file.</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">{image.origin} The netting is a separate layer.</p>
      {ORANGES_AI_URL && <div className="mt-5 max-w-sm">
        <label htmlFor={`${id}-source`} className="text-sm font-medium">Image source</label>
        <select id={`${id}-source`} value={image.id} onChange={(event) => onImageChange(getOrangesImage(event.currentTarget.value).id)} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 bg-transparent px-3 py-2 text-sm ${focus}`}>
          <option value="illustration">Illustration</option>
          <option value="ai">Citrus in a crate</option>
        </select>
      </div>}
      <div className="mt-5 max-w-sm">
        <label htmlFor={`${id}-size`} className="text-sm font-medium">Oranges image size</label>
        <select id={`${id}-size`} value={viewingWidth} onChange={(event) => onViewingWidthChange(normalizeOrangesViewingWidth(Number(event.currentTarget.value)))} aria-describedby={`${id}-size-help`} className={`mt-2 min-h-11 w-full rounded-md border border-slate-400 bg-transparent px-3 py-2 text-sm ${focus}`}>
          {ORANGES_VIEWING_SIZES.map((size) => <option key={size.width} value={size.width}>{size.label}</option>)}
        </select>
        <p id={`${id}-size-help`} className="mt-2 text-xs leading-relaxed text-slate-600">Try a smaller image as a viewing-scale comparison without changing page zoom. Grid cells stay 6 CSS pixels wide. Larger sizes fit your screen.</p>
      </div>
      <button type="button" aria-pressed={nettingHidden} aria-describedby={`${id}-instructions`} onClick={onToggleNetting} className={`mt-5 min-h-11 rounded-md border border-slate-400 px-5 py-2 text-sm font-medium hover:bg-white ${focus}`}>Hide netting</button>
      <output aria-live="polite" aria-atomic="true" className="mt-2 block min-h-6 text-sm text-teal-900">{nettingHidden ? 'Netting hidden. Same image, uncovered.' : 'Orange netting shown.'}</output>

      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-700">{ORANGES.explanation}</p>
      <div className="mt-3 flex max-w-3xl flex-wrap gap-x-6 gap-y-1 text-sm">
        <a href={`#${explanationTarget}`} onClick={onShowExplanation} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>Back to the Confetti explanation</a>
        <a href={ORANGES.source} className={`inline-flex min-h-11 items-center text-teal-800 underline underline-offset-4 ${focus}`}>Study: Perceptual ripening of oranges ↗</a>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-600">{ORANGES.citation}.</p>
    </section>
  )
}
