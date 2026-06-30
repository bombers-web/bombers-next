import { describe, it, expect } from 'vitest'
import {
  isValidEmail,
  validateEmailPayload,
  MAX_SUBJECT_LENGTH,
  MAX_BODY_LENGTH,
} from './emailValidation'

describe('isValidEmail', () => {
  it('accepts well-formed addresses', () => {
    expect(isValidEmail('person@example.com')).toBe(true)
    expect(isValidEmail('a.b+tag@sub.domain.co')).toBe(true)
  })

  it('rejects malformed addresses', () => {
    expect(isValidEmail('no-at-sign')).toBe(false)
    expect(isValidEmail('missing@domain')).toBe(false)
    expect(isValidEmail('spaces in@example.com')).toBe(false)
    expect(isValidEmail('@example.com')).toBe(false)
    expect(isValidEmail('')).toBe(false)
  })

  it('rejects non-string input', () => {
    expect(isValidEmail(null as unknown as string)).toBe(false)
  })
})

describe('validateEmailPayload', () => {
  const valid = {
    recipientEmail: 'person@example.com',
    subject: 'Hello',
    html: '<p>hi</p>',
  }

  it('passes a well-formed payload', () => {
    expect(validateEmailPayload(valid)).toEqual({ valid: true })
  })

  it('accepts text-only payloads (no html)', () => {
    expect(
      validateEmailPayload({
        recipientEmail: 'person@example.com',
        subject: 'Hello',
        text: 'plain body',
      }),
    ).toEqual({ valid: true })
  })

  it('accepts an array of recipients', () => {
    expect(
      validateEmailPayload({
        ...valid,
        recipientEmail: ['a@example.com', 'b@example.com'],
      }),
    ).toEqual({ valid: true })
  })

  it('rejects missing required fields with 400', () => {
    expect(validateEmailPayload({}).status).toBe(400)
    expect(validateEmailPayload({ subject: 'x', html: 'y' }).status).toBe(400)
    expect(
      validateEmailPayload({ recipientEmail: 'a@example.com', subject: 'x' })
        .status,
    ).toBe(400)
  })

  it('rejects an invalid recipient with 400', () => {
    const result = validateEmailPayload({ ...valid, recipientEmail: 'nope' })
    expect(result.valid).toBe(false)
    expect(result.status).toBe(400)
    expect(result.error).toBe('Invalid email format')
  })

  it('rejects one bad address inside an array', () => {
    const result = validateEmailPayload({
      ...valid,
      recipientEmail: ['ok@example.com', 'bad'],
    })
    expect(result.valid).toBe(false)
    expect(result.status).toBe(400)
  })

  it('rejects an over-long subject with 413', () => {
    const result = validateEmailPayload({
      ...valid,
      subject: 'a'.repeat(MAX_SUBJECT_LENGTH + 1),
    })
    expect(result.valid).toBe(false)
    expect(result.status).toBe(413)
  })

  it('rejects an over-long body with 413', () => {
    const result = validateEmailPayload({
      ...valid,
      html: 'a'.repeat(MAX_BODY_LENGTH + 1),
    })
    expect(result.valid).toBe(false)
    expect(result.status).toBe(413)
  })

  it('allows subject and body exactly at the limit', () => {
    expect(
      validateEmailPayload({
        ...valid,
        subject: 'a'.repeat(MAX_SUBJECT_LENGTH),
        html: 'a'.repeat(MAX_BODY_LENGTH),
      }),
    ).toEqual({ valid: true })
  })
})
