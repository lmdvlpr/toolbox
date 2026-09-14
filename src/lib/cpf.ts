export function normalizeCpf(value: string) {
  return value.replace(/\D/g, '')
}

export function formatCpf(value: string) {
  const numbers = normalizeCpf(value).slice(0, 11)

  if (numbers.length <= 3) {
    return numbers
  }
  if (numbers.length <= 6) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
  }
  if (numbers.length <= 9) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
  }

  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`
}

export function validateCpf(value: string) {
  const numbers = normalizeCpf(value)

  if (numbers.length !== 11 || /^([0-9])\1{10}$/.test(numbers)) {
    return false
  }

  let sum = 0
  for (let index = 0; index < 9; index += 1) {
    sum += Number(numbers[index]) * (10 - index)
  }

  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }

  if (remainder !== Number(numbers[9])) {
    return false
  }

  sum = 0
  for (let index = 0; index < 10; index += 1) {
    sum += Number(numbers[index]) * (11 - index)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }

  return remainder === Number(numbers[10])
}
