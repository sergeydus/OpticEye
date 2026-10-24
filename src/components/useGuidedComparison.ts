import { useEffect, useRef, useState } from 'react'

function normalizeComparisonProgress(value: number) {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0
}

type Comparison = { progress: number; active: boolean; playing: boolean; direction: 1 | -1; reducedMotion: boolean }

export default function useGuidedComparison(durationMs: number) {
  const [state, setState] = useState<Comparison>(() => ({ progress: 0, active: false, playing: false, direction: 1, reducedMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false }))
  const current = useRef(state)
  const frame = useRef<number | null>(null)

  function update(patch: Partial<Comparison>) {
    current.current = { ...current.current, ...patch }
    setState(current.current)
  }
  function cancelFrame() {
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = null
  }
  function pause() {
    cancelFrame()
    if (current.current.playing) update({ playing: false })
  }
  function scrub(value: number) {
    const progress = normalizeComparisonProgress(value)
    pause()
    update({ progress, active: true, direction: progress < current.current.progress ? -1 : progress > current.current.progress ? 1 : current.current.direction })
  }
  function playPause() {
    if (current.current.playing) { pause(); return }
    if (current.current.reducedMotion) {
      update({ active: true, progress: current.current.progress === 1 ? 0 : 1 })
      return
    }
    if (document.hidden) return
    const startProgress = current.current.progress
    const direction = startProgress === 1 ? -1 : startProgress === 0 ? 1 : current.current.direction
    const started = performance.now()
    update({ active: true, playing: true, direction })
    function tick(now: number) {
      frame.current = null
      if (!current.current.playing) return
      const progress = normalizeComparisonProgress(startProgress + direction * Math.max(0, now - started) / durationMs)
      const finished = direction === 1 ? progress === 1 : progress === 0
      update({ progress, playing: !finished })
      if (!finished) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }
  function backToStart() {
    pause()
    update({ progress: 0, active: false, direction: 1 })
  }

  useEffect(() => {
    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    function motionChanged() {
      if (preference?.matches) pause()
      update({ reducedMotion: preference?.matches ?? false })
    }
    function visibilityChanged() { if (document.hidden) pause() }
    preference?.addEventListener('change', motionChanged)
    document.addEventListener('visibilitychange', visibilityChanged)
    return () => {
      cancelFrame()
      preference?.removeEventListener('change', motionChanged)
      document.removeEventListener('visibilitychange', visibilityChanged)
    }
  }, [])

  return { ...state, pause, scrub, playPause, backToStart }
}
