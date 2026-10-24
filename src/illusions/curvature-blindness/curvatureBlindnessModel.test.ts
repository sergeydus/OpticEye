import { describe, expect, it } from 'vitest'
import { DEFAULT_WAVE_DETAIL, normalizeViewingWidth, normalizeWaveDetail, WAVE_GEOMETRY } from './curvatureBlindnessModel'

const profiles = [
  { id: 'original', cycles: 8, scale: 1, amplitude: 10, wavelength: 80, stroke: 6, first: 72, pitch: 48 },
  { id: 'smaller', cycles: 12, scale: 2 / 3, amplitude: 20 / 3, wavelength: 160 / 3, stroke: 4, first: 64, pitch: 32 },
  { id: 'fine', cycles: 18, scale: 4 / 9, amplitude: 40 / 9, wavelength: 320 / 9, stroke: 8 / 3, first: 176 / 3, pitch: 64 / 3 },
] as const

describe.each(profiles)('$id curvature geometry', (expected) => {
  const geometry = WAVE_GEOMETRY[expected.id]
  const { segments, path, amplitude, wavelength, strokeWidth, scale, rows, lightIntervals, errorBound } = geometry
  it('builds one shared smooth master with the exact profile dimensions, periodic knots and C1 tangents', () => {
    expect(segments).toHaveLength(4 * expected.cycles)
    expect(path.match(/[A-Za-z]/g)).toEqual(['M', ...Array(expected.cycles * 4).fill('C')])
    expect(amplitude).toBeCloseTo(expected.amplitude, 12)
    expect(wavelength).toBeCloseTo(expected.wavelength, 12)
    expect(strokeWidth).toBeCloseTo(expected.stroke, 12)
    expect(scale).toBe(expected.scale)
    const serialized = path.match(/[-+]?\d*\.?\d+(?:e[-+]?\d+)?/gi)!.map(Number)
    expect(serialized.slice(0, 2)).toEqual([40, amplitude])
    expect(serialized).toHaveLength(2 + expected.cycles * 24)
    for (let n = 0; n < segments.length; n++) {
      const { start, control1, control2, end } = segments[n]
      expect(start.x).toBeCloseTo(40 + n * expected.wavelength / 4, 10)
      expect(start.y).toBe([amplitude, 0, -amplitude, 0][n % 4])
      expect(end.y).toBe([0, -amplitude, 0, amplitude][n % 4])
      expect(serialized.slice(2 + n * 6, 8 + n * 6)).toEqual([control1.x, control1.y, control2.x, control2.y, end.x, end.y])
      expect((control1.y - start.y) / (control1.x - start.x)).toBeCloseTo(-Math.PI / 4 * Math.sin(n * Math.PI / 2), 11)
      expect((end.y - control2.y) / (end.x - control2.x)).toBeCloseTo(-Math.PI / 4 * Math.sin((n + 1) * Math.PI / 2), 11)
      if (n < segments.length - 1) {
        const next = segments[n + 1]
        expect(end).toEqual(next.start)
        expect(end.y - control2.y).toBeCloseTo(next.control1.y - next.start.y, 11)
        expect(end.x - control2.x).toBeCloseTo(next.control1.x - next.start.x, 11)
      }
      if (n >= 4) {
        const previous = segments[n - 4]
        expect(start.y).toBe(previous.start.y)
        expect(control1.y).toBe(previous.control1.y)
        expect(control2.y).toBe(previous.control2.y)
        expect(end.x - previous.end.x).toBeCloseTo(expected.wavelength, 11)
      }
      // Each quarter retains one concavity; its sign changes only at inflection knots.
      const sign = [-1, 1, 1, -1][n % 4]
      expect(Math.sign(start.y - 2 * control1.y + control2.y)).toBe(sign)
      expect(Math.sign(control1.y - 2 * control2.y + end.y)).toBe(sign)
    }
    expect(segments.at(-1)!.end).toEqual({ x: 680, y: amplitude })
    expect(segments.at(-1)!.control2.y).toBe(amplitude)
  })

  it('stays inside the Hermite error bound and exact stroked envelopes without adding geometric corners', () => {
    expect(errorBound).toBeCloseTo(expected.amplitude * Math.PI ** 4 / (16 * 384), 14)
    expect(errorBound).toBeLessThan(0.159 * scale)
    let maxError = 0
    for (const { start: a, control1: b, control2: c, end: d } of segments) {
      for (let i = 0; i <= 60; i++) {
        const t = i / 60, u = 1 - t
        const x = u ** 3 * a.x + 3 * u ** 2 * t * b.x + 3 * u * t ** 2 * c.x + t ** 3 * d.x
        const y = u ** 3 * a.y + 3 * u ** 2 * t * b.y + 3 * u * t ** 2 * c.y + t ** 3 * d.y
        maxError = Math.max(maxError, Math.abs(y - expected.amplitude * Math.cos(2 * Math.PI * (x - 40) / expected.wavelength)))
        expect(Math.abs(y)).toBeLessThanOrEqual(expected.amplitude + 1e-10)
        const dx = 3 * u ** 2 * (b.x - a.x) + 6 * u * t * (c.x - b.x) + 3 * t ** 2 * (d.x - c.x)
        const dy = 3 * u ** 2 * (b.y - a.y) + 6 * u * t * (c.y - b.y) + 3 * t ** 2 * (d.y - c.y)
        expect(dx).toBeCloseTo(expected.wavelength / 4, 10)
        for (const side of [-1, 1]) {
          const nx = x - side * strokeWidth / 2 * dy / Math.hypot(dx, dy)
          const ny = y + side * strokeWidth / 2 * dx / Math.hypot(dx, dy)
          expect(nx).toBeGreaterThanOrEqual(40 - 1e-10)
          expect(nx).toBeLessThanOrEqual(680 + 1e-10)
          expect(Math.abs(ny)).toBeLessThanOrEqual(13 * expected.scale + 1e-10)
        }
      }
    }
    expect(maxError).toBeGreaterThan(0)
    expect(maxError).toBeLessThan(errorBound)
  })

  it('uses the specified row count, exact color-switch phases, bounds and positive clearance', () => {
    expect(rows).toHaveLength(expected.cycles)
    for (const [index, row] of rows.entries()) {
      expect(row.index).toBe(index)
      expect(row.y).toBeCloseTo(expected.first + index * expected.pitch, 11)
      expect(row.phase).toBe(index % 2)
      if (index > 0) expect(row.y - rows[index - 1].y - 26 * scale).toBeCloseTo(22 * expected.scale, 11)
    }
    expect(rows[0].y - amplitude - strokeWidth / 2).toBeCloseTo(48 + 11 * expected.scale, 11)
    expect(rows.at(-1)!.y + amplitude + strokeWidth / 2).toBeCloseTo(432 - 11 * expected.scale, 11)
    expect(lightIntervals).toHaveLength(2)
    for (const [phase, intervals] of lightIntervals.entries()) {
      expect(intervals).toHaveLength(expected.cycles)
      for (const [k, rect] of intervals.entries()) {
        expect(rect.x).toBeCloseTo(40 + phase * expected.wavelength / 4 + k * expected.wavelength, 11)
        expect(rect.width).toBeCloseTo(expected.wavelength / 2, 11)
        expect(rect.y).toBe(-20 * scale)
        expect(rect.height).toBe(40 * scale)
        expect(rect.x).toBeGreaterThanOrEqual(40)
        expect(rect.x + rect.width).toBeLessThanOrEqual(680)
      }
    }
  })
})

it('matches the former Compact feature dimensions at Medium without shrinking the frame', () => {
  const original = WAVE_GEOMETRY.original, fine = WAVE_GEOMETRY.fine
  for (const key of ['amplitude', 'wavelength', 'strokeWidth'] as const) expect(fine[key] * 540 / 720).toBeCloseTo(original[key] * 240 / 720, 12)
  expect(48 * fine.scale * 540 / 720).toBe(16)
  expect(fine.rows.length).toBeGreaterThan(original.rows.length)
})

it('normalizes unsupported choices to Medium and Fine, keeping the bounded alternatives available', () => {
  expect([240, 540, 720, 450, -1, NaN, Infinity].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540, 540])
  expect(DEFAULT_WAVE_DETAIL).toBe('fine')
  expect(['original', 'smaller', 'fine', '', 'unknown'].map(normalizeWaveDetail)).toEqual(['original', 'smaller', 'fine', 'fine', 'fine'])
})
