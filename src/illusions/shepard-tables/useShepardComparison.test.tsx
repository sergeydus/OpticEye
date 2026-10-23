import { StrictMode } from 'react'
import type { ReactNode } from 'react'
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useShepardComparison from './useShepardComparison'

let clock: number
let reducedMotion: boolean
let hidden: boolean
let nextFrame: number
let frames: Map<number, FrameRequestCallback>
let preferenceListeners: Set<() => void>

function StrictWrapper({ children }: { children: ReactNode }) {
  return <StrictMode>{children}</StrictMode>
}

function stepFrame(now: number) {
  act(() => {
    clock = now
    const pending = [...frames.values()]
    frames.clear()
    for (const callback of pending) callback(now)
  })
}

function changeMotion(value: boolean) {
  act(() => {
    reducedMotion = value
    for (const listener of preferenceListeners) listener()
  })
}

function changeVisibility(value: boolean) {
  act(() => {
    hidden = value
    document.dispatchEvent(new Event('visibilitychange'))
  })
}

beforeEach(() => {
  clock = 1000
  reducedMotion = false
  hidden = false
  nextFrame = 0
  frames = new Map()
  preferenceListeners = new Set()
  const preference = {
    get matches() { return reducedMotion },
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: vi.fn((_event: string, listener: () => void) => preferenceListeners.add(listener)),
    removeEventListener: vi.fn((_event: string, listener: () => void) => preferenceListeners.delete(listener)),
  }
  vi.stubGlobal('matchMedia', vi.fn(() => preference))
  vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
    const id = ++nextFrame
    frames.set(id, callback)
    return id
  }))
  vi.stubGlobal('cancelAnimationFrame', vi.fn((id: number) => { frames.delete(id) }))
  vi.spyOn(performance, 'now').mockImplementation(() => clock)
  vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('Shepard guided comparison lifecycle', () => {
  it('stays idle on mount and after the StrictMode setup/cleanup cycle, with one preference listener', () => {
    const { result, unmount } = renderHook(useShepardComparison, { wrapper: StrictWrapper })
    expect(result.current).toMatchObject({ progress: 0, active: false, playing: false, direction: 1, reducedMotion: false })
    expect(requestAnimationFrame).not.toHaveBeenCalled()
    expect(frames.size).toBe(0)
    expect(preferenceListeners.size).toBe(1)
    unmount()
    expect(preferenceListeners.size).toBe(0)
    expect(frames.size).toBe(0)
  })

  it('uses elapsed time with one frame at a time, completes once, then plays backward from the endpoint', () => {
    const { result } = renderHook(useShepardComparison)
    act(() => result.current.playPause())
    expect(result.current).toMatchObject({ active: true, playing: true, progress: 0, direction: 1 })
    expect(frames.size).toBe(1)
    // A zero-elapsed first frame must not mistake the starting endpoint for completion.
    stepFrame(1000)
    expect(result.current.playing).toBe(true)
    expect(result.current.progress).toBe(0)
    expect(frames.size).toBe(1)
    stepFrame(1400)
    expect(result.current.progress).toBeCloseTo(0.125)
    expect(frames.size).toBe(1)
    stepFrame(2600)
    expect(result.current.progress).toBe(0.5)
    stepFrame(4300)
    expect(result.current).toMatchObject({ progress: 1, active: true, playing: false })
    expect(frames.size).toBe(0)
    const requestsAtFinish = vi.mocked(requestAnimationFrame).mock.calls.length
    stepFrame(9000)
    expect(result.current.progress).toBe(1)
    expect(requestAnimationFrame).toHaveBeenCalledTimes(requestsAtFinish)

    act(() => result.current.playPause())
    expect(result.current.direction).toBe(-1)
    stepFrame(9800)
    expect(result.current.progress).toBe(0.75)
    stepFrame(12200)
    expect(result.current).toMatchObject({ progress: 0, active: true, playing: false, direction: -1 })
    expect(frames.size).toBe(0)
  })

  it('pauses in place, rebases elapsed time on resume, and preserves backward travel direction', () => {
    const { result } = renderHook(useShepardComparison)
    act(() => result.current.scrub(0.8))
    act(() => result.current.scrub(0.6))
    expect(result.current.direction).toBe(-1)
    act(() => result.current.playPause())
    stepFrame(1320)
    expect(result.current.progress).toBeCloseTo(0.5)
    act(() => result.current.playPause())
    expect(result.current.playing).toBe(false)
    expect(frames.size).toBe(0)
    clock = 20000
    act(() => result.current.playPause())
    stepFrame(20000)
    expect(result.current.progress).toBeCloseTo(0.5)
    expect(result.current.direction).toBe(-1)
    stepFrame(20320)
    expect(result.current.progress).toBeCloseTo(0.4)
    act(() => result.current.pause())
    expect(result.current.progress).toBeCloseTo(0.4)
    expect(frames.size).toBe(0)
  })

  it('lets scrubbing take ownership, bounds progress, and keeps comparison active when scrubbed back to zero', () => {
    const { result } = renderHook(useShepardComparison)
    act(() => result.current.playPause())
    stepFrame(1800)
    act(() => result.current.scrub(0.7))
    expect(result.current).toMatchObject({ progress: 0.7, active: true, playing: false, direction: 1 })
    expect(frames.size).toBe(0)
    act(() => result.current.scrub(0.2))
    expect(result.current).toMatchObject({ progress: 0.2, direction: -1 })
    act(() => result.current.scrub(-10))
    expect(result.current).toMatchObject({ progress: 0, active: true, playing: false })
    act(() => result.current.scrub(10))
    expect(result.current).toMatchObject({ progress: 1, active: true, direction: 1 })
    expect(frames.size).toBe(0)
  })

  it('returns to the initial table scene and cancels playback without scheduling idle work', () => {
    const { result } = renderHook(useShepardComparison)
    act(() => result.current.playPause())
    stepFrame(1900)
    act(() => result.current.backToTables())
    expect(result.current).toMatchObject({ progress: 0, active: false, playing: false, direction: 1 })
    expect(frames.size).toBe(0)
    const requestsAtReturn = vi.mocked(requestAnimationFrame).mock.calls.length
    stepFrame(20000)
    expect(requestAnimationFrame).toHaveBeenCalledTimes(requestsAtReturn)
  })

  it('pauses when hidden, rejects hidden playback, and does not resume automatically on return', () => {
    const { result } = renderHook(useShepardComparison)
    act(() => result.current.playPause())
    stepFrame(1800)
    changeVisibility(true)
    expect(result.current).toMatchObject({ progress: 0.25, active: true, playing: false })
    expect(frames.size).toBe(0)
    act(() => result.current.playPause())
    expect(result.current.playing).toBe(false)
    expect(frames.size).toBe(0)
    changeVisibility(false)
    expect(result.current.playing).toBe(false)
    expect(frames.size).toBe(0)
    act(() => result.current.playPause())
    expect(result.current.playing).toBe(true)
    expect(frames.size).toBe(1)
  })

  it('starts with an immediate reduced-motion match/separate fallback and still allows manual progress', () => {
    reducedMotion = true
    const { result } = renderHook(useShepardComparison)
    expect(result.current.reducedMotion).toBe(true)
    act(() => result.current.playPause())
    expect(result.current).toMatchObject({ progress: 1, active: true, playing: false })
    act(() => result.current.playPause())
    expect(result.current).toMatchObject({ progress: 0, active: true, playing: false })
    act(() => result.current.scrub(0.42))
    expect(result.current.progress).toBe(0.42)
    expect(requestAnimationFrame).not.toHaveBeenCalled()
    expect(frames.size).toBe(0)
  })

  it('cancels timed motion when the preference changes and never auto-resumes when it changes back', () => {
    const { result } = renderHook(useShepardComparison)
    act(() => result.current.playPause())
    stepFrame(1800)
    changeMotion(true)
    expect(result.current).toMatchObject({ progress: 0.25, playing: false, reducedMotion: true })
    expect(frames.size).toBe(0)
    changeMotion(false)
    expect(result.current).toMatchObject({ progress: 0.25, playing: false, reducedMotion: false })
    expect(frames.size).toBe(0)
    act(() => result.current.playPause())
    expect(result.current.playing).toBe(true)
    expect(frames.size).toBe(1)
  })

  it('cancels the sole scheduled frame and removes subscriptions when unmounted during playback', () => {
    const { result, unmount } = renderHook(useShepardComparison, { wrapper: StrictWrapper })
    act(() => result.current.playPause())
    stepFrame(1800)
    expect(frames.size).toBe(1)
    unmount()
    expect(frames.size).toBe(0)
    expect(preferenceListeners.size).toBe(0)
    expect(cancelAnimationFrame).toHaveBeenCalled()
    const requestsAtUnmount = vi.mocked(requestAnimationFrame).mock.calls.length
    stepFrame(9000)
    changeMotion(true)
    changeVisibility(true)
    expect(requestAnimationFrame).toHaveBeenCalledTimes(requestsAtUnmount)
  })
})
