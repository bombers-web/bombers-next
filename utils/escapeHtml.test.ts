import { describe, it, expect } from 'vitest'
import { escapeHtml } from './escapeHtml'

describe('escapeHtml', () => {
  it('escapes all HTML-significant characters', () => {
    expect(escapeHtml(`<script>alert("x & y")</script>`)).toBe(
      '&lt;script&gt;alert(&quot;x &amp; y&quot;)&lt;/script&gt;',
    )
  })

  it('escapes single quotes', () => {
    expect(escapeHtml("O'Brien")).toBe('O&#39;Brien')
  })

  it('escapes ampersands before other entities (no double-encoding gaps)', () => {
    expect(escapeHtml('&lt;')).toBe('&amp;lt;')
  })

  it('returns an empty string for null or undefined', () => {
    expect(escapeHtml(null)).toBe('')
    expect(escapeHtml(undefined)).toBe('')
  })

  it('coerces non-string values to strings', () => {
    expect(escapeHtml(42)).toBe('42')
    expect(escapeHtml(0)).toBe('0')
  })

  it('leaves safe text unchanged', () => {
    expect(escapeHtml('Hello world 123')).toBe('Hello world 123')
  })
})
