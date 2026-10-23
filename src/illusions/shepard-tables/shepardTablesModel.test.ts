import { describe, expect, it } from 'vitest'
import { createShepardTablesGeometry, normalizeViewingWidth, placementTransform, RIGHT_ANGLE, TABLES, TABLETOP_PATH, TABLETOP_VERTICES, tabletopTransform, transformPoint } from './shepardTablesModel'

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
    expect(tabletopTransform('left', false)).toBe('translate(190,195)')
    expect(tabletopTransform('left', true)).toBe(tabletopTransform('right', false))
    expect(tabletopTransform('right', true)).toBe(tabletopTransform('right', false))
    expect(tabletopTransform('right', false)).toMatch(/^translate\(520,220\) rotate\(-104\.036243/)
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
