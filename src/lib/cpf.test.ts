import { describe, expect, it } from 'vitest'
import { formatCpf, validateCpf } from './cpf'

describe('CPF', () => {
  it('keeps validating numeric CPFs', () => {
    expect(validateCpf('529.982.247-25')).toBe(true)
    expect(validateCpf('111.111.111-11')).toBe(false)
  })

  it('formats partial and complete values', () => {
    expect(formatCpf('52998224725')).toBe('529.982.247-25')
    expect(formatCpf('529')).toBe('529')
  })
})
