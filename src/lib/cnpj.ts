const CNPJ_LENGTH = 14
const CNPJ_BASE_LENGTH = 12

export function normalizeCnpj(value: string) {
  return value.toUpperCase().replace(/[.\-/\s]/g, '')
}

export function formatCnpj(value: string) {
  const normalized = normalizeCnpj(value).slice(0, CNPJ_LENGTH)
  let formatted = normalized.slice(0, 2)

  if (normalized.length > 2) {
    formatted += `.${normalized.slice(2, 5)}`
  }
  if (normalized.length > 5) {
    formatted += `.${normalized.slice(5, 8)}`
  }
  if (normalized.length > 8) {
    formatted += `/${normalized.slice(8, 12)}`
  }
  if (normalized.length > 12) {
    formatted += `-${normalized.slice(12, 14)}`
  }

  return formatted
}

function characterValue(character: string) {
  return character.charCodeAt(0) - 48
}

function calculateDigit(value: string) {
  let weight = 2
  let sum = 0

  for (let index = value.length - 1; index >= 0; index -= 1) {
    sum += characterValue(value[index]) * weight
    weight = weight === 9 ? 2 : weight + 1
  }

  const remainder = sum % 11
  return remainder < 2 ? 0 : 11 - remainder
}

export function validateCnpj(value: string) {
  const normalized = normalizeCnpj(value)

  if (
    normalized.length !== CNPJ_LENGTH ||
    !/^[A-Z0-9]{12}\d{2}$/.test(normalized) ||
    normalized === '00000000000000'
  ) {
    return false
  }

  const base = normalized.slice(0, CNPJ_BASE_LENGTH)
  const firstDigit = calculateDigit(base)
  const secondDigit = calculateDigit(`${base}${firstDigit}`)

  return normalized.endsWith(`${firstDigit}${secondDigit}`)
}

export function getCnpjValidationError(value: string): string | null {
  const normalized = normalizeCnpj(value)

  if (!normalized) {
    return 'Informe um CNPJ para validar.'
  }
  if (normalized.length !== CNPJ_LENGTH) {
    return 'O CNPJ deve ter 14 caracteres.'
  }
  if (!/^[A-Z0-9]{14}$/.test(normalized)) {
    return 'Use apenas números e letras de A a Z.'
  }
  if (!/^[A-Z0-9]{12}\d{2}$/.test(normalized)) {
    return 'Os dois últimos caracteres devem ser dígitos verificadores numéricos.'
  }
  if (normalized === '00000000000000') {
    return 'O CNPJ nulo não é válido.'
  }
  if (!validateCnpj(normalized)) {
    return 'Os dígitos verificadores não conferem.'
  }

  return null
}
