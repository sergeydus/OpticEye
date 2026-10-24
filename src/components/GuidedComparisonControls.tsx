import type useGuidedComparison from './useGuidedComparison'

type Props = {
  id: string
  helpId: string
  comparison: ReturnType<typeof useGuidedComparison>
  stage: string
  initialLabel: string
  separateLabel: string
}
const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700'

export default function GuidedComparisonControls({ id, helpId, comparison, stage, initialLabel, separateLabel }: Props) {
  let label = 'Play comparison'
  if (comparison.reducedMotion) label = comparison.progress === 1 ? separateLabel : 'Match instantly'
  else if (comparison.playing) label = 'Pause comparison'
  else if (comparison.progress === 1 || comparison.direction === -1 && comparison.progress > 0) label = 'Play back'
  else if (comparison.progress > 0) label = 'Continue comparison'
  const percentage = Math.round(comparison.progress * 100)

  return (
    <fieldset className="mt-4 min-w-0">
      <legend className="sr-only">Guided comparison</legend>
      <button type="button" aria-describedby={helpId} onClick={comparison.playPause} className={`min-h-12 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 ${focus}`}>{label}</button>
      {comparison.reducedMotion && <p className="mt-3 text-sm text-slate-600">Reduced motion: match instantly or inspect each step with the slider.</p>}
      <label htmlFor={id} className="mt-5 flex justify-between gap-3 text-sm font-medium">Comparison progress<span aria-hidden="true">{percentage}%</span></label>
      <input id={id} type="range" min="0" max="100" step="1" value={percentage} aria-valuetext={`${percentage}% — ${comparison.active ? stage : initialLabel}`} aria-describedby={helpId} onPointerDown={comparison.pause} onKeyDown={(event) => { if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) comparison.pause() }} onChange={(event) => comparison.scrub(Number(event.currentTarget.value) / 100)} className={`block min-h-11 w-full accent-teal-700 ${focus}`} />
    </fieldset>
  )
}
