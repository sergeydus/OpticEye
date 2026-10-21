import { describe, expect, it } from 'vitest'
import { createPonzoContext, normalizeTopGap, normalizeViewingWidth, TARGETS } from './ponzoModel'

describe('Ponzo geometry', () => {
  it('keeps equal fixed bar spans and the documented default rail faces', () => {
    expect(TARGETS).toEqual([
      { id: 'upper', x1: 290, y1: 148, x2: 430, y2: 148 },
      { id: 'lower', x1: 290, y1: 332, x2: 430, y2: 332 },
    ])
    for (const bar of TARGETS) {
      expect(bar.y1).toBe(bar.y2)
      expect(Math.hypot(bar.x2 - bar.x1, bar.y2 - bar.y1)).toBe(140)
    }
    expect(TARGETS[1].y1 - TARGETS[0].y1).toBe(184)
    const { rails } = createPonzoContext(8)
    expect(rails.map((rail) => rail.id)).toEqual(['left', 'right'])
    const expected = [
      [[309.6778593913956, 137.76612659398512], [311.6512766701644, 137.76612659398512], [126.10998307952622, 445.82500215090766], [116.56345177664971, 445.82500215090766]],
      [[408.3487233298356, 137.76612659398512], [410.3221406086044, 137.76612659398512], [603.4365482233503, 445.82500215090766], [593.8900169204737, 445.82500215090766]],
    ]
    rails.forEach((rail, i) => rail.points.forEach((point, j) => {
      expect(point.x).toBeCloseTo(expected[i][j][0], 10)
      expect(point.y).toBeCloseTo(expected[i][j][1], 10)
    }))
  })

  it('recovers equal ground-plane track dimensions and pitch from all polygon corners at every gap', () => {
    for (let q = 0; q <= 24; q += 4) {
      const context = createPonzoContext(q)
      expect(context).toEqual(createPonzoContext(q))
      expect(context.rails).toHaveLength(2)
      expect(context.ties).toHaveLength(26)
      expect(new Set([...context.rails, ...context.ties].map((part) => part.id)).size).toBe(28)
      // Independent inverse derived from the specified camera calibration anchors,
      // rather than calling the projection under test or importing its dimensions.
      const slope = (240 - q / 2) / 384
      const horizon = 64 - (q / 2) / slope
      const depthScale = 440 - horizon
      const horizontalScale = slope * depthScale
      const farDepth = 1 + 25 * 0.15 + 0.015
      const nearDepth = 1 - 0.015
      const farY = horizon + depthScale / farDepth
      const nearY = horizon + depthScale / nearDepth
      const invert = ({ x, y }: { x: number; y: number }) => {
        const z = depthScale / (y - horizon)
        return { x: (x - 360) * z / horizontalScale, z }
      }
      const centerYs: number[] = []
      const projectedLengths: number[] = []
      const projectedDepths: number[] = []
      const recoveredDepths: number[] = []
      context.ties.forEach((tie, i) => {
        expect(tie.id).toBe(`tie-${i}`)
        expect(tie.points).toHaveLength(4)
        const ground = tie.points.map(invert)
        const expectedWorldX = [-1.25, 1.25, 1.25, -1.25]
        expectedWorldX.forEach((x, j) => expect(ground[j].x).toBeCloseTo(x, 10))
        expect(ground[1].x - ground[0].x).toBeCloseTo(2.5, 10)
        expect(ground[2].x - ground[3].x).toBeCloseTo(2.5, 10)
        expect(ground[0].z).toBeCloseTo(ground[1].z, 10)
        expect(ground[2].z).toBeCloseTo(ground[3].z, 10)
        expect(ground[3].z - ground[0].z).toBeCloseTo(0.03, 10)
        const centerDepth = (ground[0].z + ground[3].z) / 2
        expect(centerDepth).toBeCloseTo(1 + 0.15 * i, 10)
        recoveredDepths.push(centerDepth)
        centerYs.push(horizon + depthScale / centerDepth)
        const [frontLeft, frontRight, backRight, backLeft] = tie.points
        expect(frontLeft.y).toBe(frontRight.y)
        expect(backLeft.y).toBe(backRight.y)
        expect(frontLeft.x + frontRight.x).toBeCloseTo(720, 10)
        expect(backLeft.x + backRight.x).toBeCloseTo(720, 10)
        expect(frontRight.x - frontLeft.x).toBeGreaterThan(backRight.x - backLeft.x)
        projectedLengths.push(frontRight.x - frontLeft.x)
        projectedDepths.push(frontLeft.y - backLeft.y)
      })
      expect(centerYs[0]).toBeCloseTo(440, 10)
      expect(centerYs[0] - centerYs[1]).toBeGreaterThan(49)
      expect(centerYs[0] - centerYs[1]).toBeLessThan(52)
      expect(centerYs.filter((y) => y > TARGETS[1].y1)).toHaveLength(3)
      for (let i = 1; i < context.ties.length; i++) {
        expect(recoveredDepths[i] - recoveredDepths[i - 1]).toBeCloseTo(0.15, 10)
        expect(projectedLengths[i]).toBeLessThan(projectedLengths[i - 1])
        expect(projectedDepths[i]).toBeGreaterThan(0)
        expect(projectedDepths[i]).toBeLessThan(projectedDepths[i - 1])
        expect(centerYs[i]).toBeLessThan(centerYs[i - 1])
        if (i > 1) expect(centerYs[i - 1] - centerYs[i]).toBeLessThan(centerYs[i - 2] - centerYs[i - 1])
        // Even the smallest supported drawing avoids the former subpixel
        // density cascade. This is a clearance bound, not an alias-free claim.
        const clearGap = context.ties[i - 1].points[3].y - context.ties[i].points[0].y
        expect(clearGap * 240 / 720).toBeGreaterThanOrEqual(0.68)
      }
      if (q === 8) {
        expect(centerYs[1]).toBeCloseTo(390.1076, 4)
        expect(centerYs[25]).toBeCloseTo(138.0196, 4)
        expect(projectedDepths[0]).toBeCloseTo(11.4778, 4)
      }
      context.rails.forEach((rail, i) => {
        expect(rail.points).toHaveLength(4)
        const expectedX = i === 0 ? [-1.02, -0.98, -0.98, -1.02] : [0.98, 1.02, 1.02, 0.98]
        rail.points.forEach((point, j) => {
          const expectedDepth = j < 2 ? farDepth : nearDepth
          expect(point.y).toBeCloseTo(j < 2 ? farY : nearY, 10)
          expect(point.x).toBeCloseTo(360 + horizontalScale * expectedX[j] / expectedDepth, 10)
          expect(invert(point).x).toBeCloseTo(expectedX[j], 10)
          expect(invert(point).z).toBeCloseTo(expectedDepth, 10)
          // Rails end at the exact terminal sleeper edges at both ends;
          // neither end may retain the old bare rail extensions.
          expect(point.y).toBeCloseTo(j < 2 ? context.ties[25].points[3].y : context.ties[0].points[0].y, 10)
        })
        const [topLeft, topRight, bottomRight, bottomLeft] = rail.points
        expect(bottomRight.x - bottomLeft.x).toBeGreaterThan(topRight.x - topLeft.x)
        expect(topLeft.y).toBeLessThan(144)
        expect(bottomLeft.y).toBeGreaterThan(336)
        // Every face edge converges to the same horizon point. At the upper
        // target both face edges must fit beneath its full opaque orange span.
        const faceX = (worldX: number, y: number) => 360 + worldX * slope * (y - horizon)
        for (const y of [144, 152]) for (const x of expectedX.slice(0, 2)) {
          expect(faceX(x, y)).toBeGreaterThan(TARGETS[0].x1)
          expect(faceX(x, y)).toBeLessThan(TARGETS[0].x2)
        }
        for (const y of [328, 336]) {
          if (i === 0) expect(faceX(-0.98, y)).toBeLessThan(TARGETS[1].x1)
          else expect(faceX(0.98, y)).toBeGreaterThan(TARGETS[1].x2)
        }
      })
      for (const polygon of [...context.rails, ...context.ties]) for (const { x, y } of polygon.points) {
        expect([x, y].every(Number.isFinite)).toBe(true)
        expect(x).toBeGreaterThan(0)
        expect(x).toBeLessThan(720)
        expect(y).toBeGreaterThanOrEqual(farY)
        expect(y).toBeLessThanOrEqual(nearY)
      }
    }
  })

  it('normalizes stepped gaps, clamps finite outliers and falls back safely for invalid input', () => {
    expect([-100, 0, 1, 2, 23, 24, 1000].map(normalizeTopGap)).toEqual([0, 0, 0, 4, 24, 24, 24])
    for (const value of [NaN, Infinity, -Infinity]) {
      expect(normalizeTopGap(value)).toBe(8)
      expect(createPonzoContext(value)).toEqual(createPonzoContext(8))
    }
    expect([240, 540, 720, 0, 450, NaN].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540])
  })
})
