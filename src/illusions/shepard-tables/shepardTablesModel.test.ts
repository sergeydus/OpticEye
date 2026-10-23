import { describe, expect, it } from 'vitest'
import { COMPARISON_DURATION_MS, comparisonPlacement, comparisonStage, createShepardTablesGeometry, normalizeComparisonProgress, normalizeViewingWidth, placementTransform, RIGHT_ANGLE, smoothstep, STROKE_WIDTH, TABLES, TABLETOP_PATH, TABLETOP_VERTICES, tabletopTransform, transformPoint, VIEWBOX, type Point } from './shepardTablesModel'

const distance = (a: readonly number[], b: readonly number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])

describe('Shepard tabletop construction', () => {
  it('uses one exact parallelogram with equal corresponding sides, diagonals and area under proper rigid placement', () => {
    expect(TABLETOP_VERTICES).toEqual([[-20, -120], [80, -120], [20, 120], [-80, 120]])
    expect(TABLETOP_PATH).toBe('M -20 -120 L 80 -120 L 20 120 L -80 120 Z')
    expect(RIGHT_ANGLE * 180 / Math.PI).toBeCloseTo(-104.036243468, 8)
    const local = TABLETOP_VERTICES
    const areas = []
    for (const table of TABLES) {
      const c = Math.cos(table.placement.angle), s = Math.sin(table.placement.angle)
      expect(c * c + s * s).toBeCloseTo(1, 14)
      expect(c * c - (-s) * s).toBeCloseTo(1, 14)
      const world = local.map((point) => transformPoint(point, table.placement))
      for (let edge = 0; edge < 4; edge++) expect(distance(world[edge], world[(edge + 1) % 4])).toBeCloseTo(edge % 2 === 0 ? 100 : Math.sqrt(61200), 10)
      expect(distance(world[0], world[2])).toBeCloseTo(Math.sqrt(59200), 10)
      expect(distance(world[1], world[3])).toBeCloseTo(Math.sqrt(83200), 10)
      areas.push(Math.abs(world.reduce((sum, [x, y], i) => sum + x * world[(i + 1) % 4][1] - y * world[(i + 1) % 4][0], 0)) / 2)
      expect(placementTransform(table.placement)).not.toMatch(/scale|skew|matrix/)
    }
    expect(areas[0]).toBe(24000)
    expect(areas[1]).toBeCloseTo(24000, 8)
  })

  it('matches the specified initial world vertices and exact overlay destination', () => {
    const [left, right] = createShepardTablesGeometry()
    expect(left.vertices).toEqual([[170, 75], [270, 75], [210, 315], [110, 315]])
    const expected = [[408.433612, 268.507125], [384.180050, 171.492875], [631.566388, 171.492875], [655.819950, 268.507125]]
    right.vertices.forEach(([x, y], i) => { expect(x).toBeCloseTo(expected[i][0], 5); expect(y).toBeCloseTo(expected[i][1], 5) })
    expect(right.vertices[1][1]).toBeCloseTo(right.vertices[2][1], 12)
    expect(tabletopTransform('left', 0)).toBe('translate(190,195)')
    expect(tabletopTransform('left', 1)).toBe(tabletopTransform('right', 0))
    expect(tabletopTransform('right', 1)).toBe(tabletopTransform('right', 0))
    expect(tabletopTransform('right', 0)).toMatch(/^translate\(520,220\) rotate\(-104\.036243/)
  })

  it('derives twelve fixed contextual pieces from initial vertices with the correct visible faces and bounded scene', () => {
    const geometry = createShepardTablesGeometry()
    expect(geometry).toEqual(createShepardTablesGeometry())
    expect(geometry.flatMap((t) => t.legs)).toHaveLength(8)
    expect(geometry.flatMap((t) => t.faces)).toHaveLength(4)
    expect(geometry[0].faces.map((face) => face.edge)).toEqual([1, 2])
    expect(geometry[1].faces.map((face) => face.edge)).toEqual([0, 3])
    for (const [index, table] of geometry.entries()) {
      expect(table.legs).toHaveLength(4)
      table.legs.forEach((leg, corner) => {
        expect([leg.x, leg.y, leg.width, leg.height]).toEqual([table.vertices[corner][0] - 6, table.vertices[corner][1] + 8, 12, 96])
        expect(leg.x - 1).toBeGreaterThanOrEqual(103)
        expect(leg.x + leg.width + 1).toBeLessThanOrEqual(663)
        expect(leg.y + leg.height + 1).toBeLessThanOrEqual(420)
      })
      for (const face of table.faces) {
        const a = table.vertices[face.edge], b = table.vertices[(face.edge + 1) % 4]
        expect(b[0]).toBeLessThan(a[0])
        expect(face.points).toEqual([a, b, [b[0], b[1] + 12], [a[0], a[1] + 12]])
        expect(face.fill).toBe(face.edge === (index === 0 ? 2 : 3) ? '#9B6432' : '#B37A3B')
      }
    }
    // The back-left leg overlaps a tabletop interior; paint order must occlude it.
    const leg = geometry[0].legs[0]
    expect(170).toBeGreaterThan(leg.x)
    expect(170).toBeLessThan(leg.x + leg.width)
    expect(115).toBeGreaterThan(leg.y)
    expect(115).toBeLessThan(leg.y + leg.height)
    expect(new Set(geometry.flatMap((t) => [...t.legs, ...t.faces]).map((p) => p.id)).size).toBe(12)
  })

  it('normalizes only the documented viewing sizes', () => {
    expect([240, 540, 720, 450, 0, -1, NaN, Infinity].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540, 540, 540])
  })
})

describe('Shepard guided rigid comparison', () => {
  it('bounds continuous progress without quantizing and eases the two separate phases', () => {
    expect(COMPARISON_DURATION_MS).toBe(3200)
    expect([0, 0.123456, 1, -1, 2, NaN, Infinity, -Infinity].map(normalizeComparisonProgress)).toEqual([0, 0.123456, 1, 0, 1, 0, 0, 0])
    expect([-1, 0, 0.25, 0.5, 0.75, 1, 2, NaN].map(smoothstep)).toEqual([0, 0, 0.15625, 0.5, 0.84375, 1, 1, 0])
    expect(comparisonPlacement(0)).toBe(TABLES[0].placement)
    expect(comparisonPlacement(1)).toBe(TABLES[1].placement)
    expect(comparisonPlacement(-2)).toBe(TABLES[0].placement)
    expect(comparisonPlacement(2)).toBe(TABLES[1].placement)
    expect(comparisonPlacement(NaN)).toBe(TABLES[0].placement)
    for (const [progress, angleFraction] of [[0.125, 0.15625], [0.25, 0.5], [0.375, 0.84375], [0.5, 1]]) {
      expect(comparisonPlacement(progress)).toEqual({ x: 190, y: 195, angle: RIGHT_ANGLE * angleFraction })
    }
    expect(comparisonPlacement(0.625)).toEqual({ x: 241.5625, y: 198.90625, angle: RIGHT_ANGLE })
    expect(comparisonPlacement(0.75)).toEqual({ x: 355, y: 207.5, angle: RIGHT_ANGLE })
    expect(comparisonPlacement(0.875)).toEqual({ x: 468.4375, y: 216.09375, angle: RIGHT_ANGLE })
    expect([0, 0.499, 0.5, 0.999, 1].map(comparisonStage)).toEqual(['Rotate', 'Rotate', 'Slide', 'Slide', 'Exact fit'])
  })

  it('keeps proper rigid geometry and a fixed destination through forward and backward progress', () => {
    const fixedTransform = tabletopTransform('right', 0)
    const progress = Array.from({ length: 101 }, (_, i) => i / 100)
    for (const p of [...progress, ...progress.toReversed()]) {
      const placement = comparisonPlacement(p)
      const c = Math.cos(placement.angle), s = Math.sin(placement.angle)
      expect(c * c + s * s).toBeCloseTo(1, 14)
      expect(c * c - (-s) * s).toBeCloseTo(1, 14)
      const vertices = TABLETOP_VERTICES.map((point) => transformPoint(point, placement))
      for (let i = 0; i < 4; i++) expect(distance(vertices[i], vertices[(i + 1) % 4])).toBeCloseTo(i % 2 === 0 ? 100 : Math.sqrt(61200), 10)
      expect(distance(vertices[0], vertices[2])).toBeCloseTo(Math.sqrt(59200), 10)
      expect(distance(vertices[1], vertices[3])).toBeCloseTo(Math.sqrt(83200), 10)
      expect(tabletopTransform('right', p)).toBe(fixedTransform)
      expect(tabletopTransform('left', p)).not.toMatch(/scale|skew|matrix/)
    }
    expect(tabletopTransform('left', 1)).toBe(fixedTransform)
    TABLETOP_VERTICES.forEach((point) => expect(transformPoint(point, comparisonPlacement(1))).toEqual(transformPoint(point, TABLES[1].placement)))
    expect(createShepardTablesGeometry()[0].vertices).toEqual([[170, 75], [270, 75], [210, 315], [110, 315]])
  })

  it('keeps the complete mitered outline within the frame across the analytic rotation and slide sweeps', () => {
    // Intersect independently offset edges to include miter corners, not only path vertices.
    const outline = TABLETOP_VERTICES.map((point, i): Point => {
      const previous = TABLETOP_VERTICES[(i + 3) % 4], next = TABLETOP_VERTICES[(i + 1) % 4]
      const before = [point[0] - previous[0], point[1] - previous[1]]
      const after = [next[0] - point[0], next[1] - point[1]]
      const beforeLength = Math.hypot(...before), afterLength = Math.hypot(...after)
      const a = [before[1] / beforeLength, -before[0] / beforeLength]
      const b = [after[1] / afterLength, -after[0] / afterLength]
      const factor = (STROKE_WIDTH / 2) / (1 + a[0] * b[0] + a[1] * b[1])
      return [point[0] + (a[0] + b[0]) * factor, point[1] + (a[1] + b[1]) * factor]
    })
    const rotationSweep: Point[] = []
    for (const point of outline) {
      const angles = [RIGHT_ANGLE, 0]
      // Each coordinate extremum occurs at an endpoint or at its zero derivative.
      for (const critical of [Math.atan2(-point[1], point[0]), Math.atan2(point[0], point[1])]) {
        for (let k = -2; k <= 2; k++) {
          const angle = critical + k * Math.PI
          if (angle >= RIGHT_ANGLE && angle <= 0) angles.push(angle)
        }
      }
      rotationSweep.push(...angles.map((angle) => transformPoint(point, { x: 190, y: 195, angle })))
    }
    const slideSweep = [0.5, 1].flatMap((p) => outline.map((point) => transformPoint(point, comparisonPlacement(p))))
    const bounds = (points: Point[]) => ({
      minX: Math.min(...points.map(([x]) => x)), maxX: Math.max(...points.map(([x]) => x)),
      minY: Math.min(...points.map(([, y]) => y)), maxY: Math.max(...points.map(([, y]) => y)),
    })
    const rotation = bounds(rotationSweep), slide = bounds(slideSweep)
    expect(rotation.minX).toBeCloseTo(52.899273573, 8)
    expect(rotation.maxX).toBeCloseTo(327.100726427, 8)
    expect(rotation.minY).toBeCloseTo(49.234556176, 8)
    expect(rotation.maxY).toBeCloseTo(340.765443824, 8)
    expect(slide.minX).toBeCloseTo(52.899273573, 8)
    expect(slide.maxX).toBeCloseTo(657.100726427, 8)
    expect(slide.minY).toBeCloseTo(145.492874993, 8)
    expect(slide.maxY).toBeCloseTo(269.507125007, 8)
    for (const [x, y] of [...rotationSweep, ...slideSweep]) {
      expect(x).toBeGreaterThanOrEqual(0)
      expect(x).toBeLessThanOrEqual(VIEWBOX.width)
      expect(y).toBeGreaterThanOrEqual(0)
      expect(y).toBeLessThanOrEqual(VIEWBOX.height)
    }
    const rotated = bounds(outline.map((point) => transformPoint(point, comparisonPlacement(0.5))))
    const destination = bounds(outline.map((point) => transformPoint(point, TABLES[1].placement)))
    expect(destination.minX - rotated.maxX).toBeCloseTo(55.798547146, 8)
  })
})
