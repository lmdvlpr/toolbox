import { describe, expect, it } from 'vitest'
import { formatCnpj, getCnpjValidationError, validateCnpj } from './cnpj'

describe('CNPJ', () => {
  it('validates a legacy numeric CNPJ', () => {
    expect(validateCnpj('04.252.011/0001-10')).toBe(true)
  })

  it('validates the official alphanumeric example', () => {
    expect(validateCnpj('12.ABC.345/01DE-35')).toBe(true)
  })

  it('formats both numeric and alphanumeric values', () => {
    expect(formatCnpj('04252011000110')).toBe('04.252.011/0001-10')
    expect(formatCnpj('12ABC34501DE35')).toBe('12.ABC.345/01DE-35')
  })

  it('normalizes lowercase letters and rejects invalid check digits', () => {
    expect(validateCnpj('12.abc.345/01de-35')).toBe(true)
    expect(getCnpjValidationError('12.ABC.345/01DE-36')).toBe('Os dígitos verificadores não conferem.')
  })

  it('rejects invalid characters, incomplete values and the null CNPJ', () => {
    expect(getCnpjValidationError('12.ABC.345/01D@-35')).toBe('Use apenas números e letras de A a Z.')
    expect(getCnpjValidationError('12.ABC')).toBe('O CNPJ deve ter 14 caracteres.')
    expect(getCnpjValidationError('00.000.000/0000-00')).toBe('O CNPJ nulo não é válido.')
  })
})
