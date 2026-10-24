import type { ThemeSettings } from './types.ts'
import { paletteSeeds } from './palette.ts'

/** Main customization surface. Six-digit hex colors keep generated CSS safe and predictable. */
export const defaultTheme: ThemeSettings = {
  primaryAccent: '#ad96ff',
  secondaryAccent: '#a892ff',
  background: '#090a10',
  surface: '#101119',
  text: '#f2f0fa',
  mutedText: '#a3a3b5',
  border: '#cfc7ff',
  fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
  radii: { control: 7, card: 11, large: 13 },
}

type Hsl = { h: number; s: number; l: number; alpha: number }
function toHsl(value: string): Hsl {
  let rgb: number[]
  let alpha = 1
  if (value.startsWith('rgba')) {
    const parts = value.match(/[\d.]+/g)!.map(Number)
    rgb = parts.slice(0, 3)
    alpha = parts[3]
  } else {
    let hex = value.slice(1)
    if (hex.length === 3 || hex.length === 4) hex = [...hex].map((char) => char + char).join('')
    rgb = [0, 2, 4].map((index) => parseInt(hex.slice(index, index + 2), 16))
    if (hex.length === 8) alpha = parseInt(hex.slice(6), 16) / 255
  }
  const [r, g, b] = rgb.map((channel) => channel / 255)
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    delta = max - min
  const l = (max + min) / 2
  let h =
    delta === 0
      ? 0
      : max === r
        ? ((g - b) / delta) % 6
        : max === g
          ? (b - r) / delta + 2
          : (r - g) / delta + 4
  h = (h * 60 + 360) % 360
  return { h, s: delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)), l, alpha }
}
const clamp = (value: number) => Math.max(0, Math.min(1, value))
function shiftColor(value: string, anchor: string, target: string): string {
  if (anchor.toLowerCase() === target.toLowerCase()) return value
  const source = toHsl(value),
    from = toHsl(anchor),
    to = toHsl(target)
  const h = (((source.h + to.h - from.h) % 360) + 360) % 360
  const s = clamp(source.s + to.s - from.s),
    l = clamp(source.l + to.l - from.l)
  const chroma = (1 - Math.abs(2 * l - 1)) * s
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - chroma / 2
  const sectors = [
    [chroma, x, 0],
    [x, chroma, 0],
    [0, chroma, x],
    [0, x, chroma],
    [x, 0, chroma],
    [chroma, 0, x],
  ]
  const [r, g, b] = sectors[Math.floor(h / 60)].map((channel) => Math.round((channel + m) * 255))
  return `rgba(${r}, ${g}, ${b}, ${source.alpha})`
}

export function themeVariables(theme: ThemeSettings): Record<string, string> {
  const roles = [
    'primaryAccent',
    'secondaryAccent',
    'background',
    'surface',
    'text',
    'mutedText',
    'border',
  ] as const
  for (const role of roles)
    if (!/^#[\da-f]{6}$/i.test(theme[role]))
      throw new Error(`Theme ${role} must be a six-digit hex color`)
  if (/[<>;{}\n\r]/.test(theme.fontFamily))
    throw new Error('Font family must be a plain CSS font stack')
  for (const value of Object.values(theme.radii))
    if (!Number.isFinite(value) || value < 0 || value > 64)
      throw new Error('Theme radii must be between 0 and 64 pixels')
  const variables: Record<string, string> = {
    '--theme-font-family': theme.fontFamily,
    '--radius-control': `${theme.radii.control}px`,
    '--radius-card': `${theme.radii.card}px`,
    '--radius-large': `${theme.radii.large}px`,
  }
  for (const seed of paletteSeeds)
    variables[seed.name] =
      seed.role === 'fixed'
        ? seed.value
        : shiftColor(seed.value, defaultTheme[seed.role], theme[seed.role])
  return variables
}
export function themeCss(theme: ThemeSettings): string {
  return `:root{${Object.entries(themeVariables(theme))
    .map(([name, value]) => `${name}:${value}`)
    .join(';')}}`
}
