import { useState } from 'react'

function validateCNPJ(cnpj) {
  // Remove todos os caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]+/g, '')

  // Se o campo estiver vazio, retorna falso e consequentemente é inválido
  if (cnpj === '') return false

  // Elimina CNPJs invalidos conhecidos
  if (cnpj.length !== 14) return false

  /* O CNPJ "00.000.000/0000-00" possui um formato válido (14 dígitos), mas é conhecido como um "CNPJ especial" ou "CNPJ nulo" que, na prática, não é atribuído a nenhuma entidade. É utilizado em situações específicas para representar a ausência de um CNPJ válido. */
  if (cnpj === '00000000000000' || cnpj === '00.000.000/0000-00') return false

  // Validação dos dígitos verificadores (DV):
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho)
  let digitos = cnpj.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) {
      pos = 9
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado !== parseInt(digitos.charAt(0))) return false

  tamanho = tamanho + 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) {
      pos = 9
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado !== parseInt(digitos.charAt(1))) return false

  return true
}

// Formata o número de CNPJ para exibição no input.
function formatCnpj(cnpj) {
  const numbers = cnpj.replace(/[^\d]+/g, '');

  if (numbers.length <= 2) {
    return numbers
  }

  if (numbers.length <= 5) {
    return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
  }

  if (numbers.length <= 8) {
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
  }

  if (numbers.length <= 12) {
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
  }

  return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12)}`
}

export function CnpjValidate() {
  const [cnpj, setCnpj] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleInputChange = (event) => {
    const inputValue = event.target.value
    const formattedCjnp = formatCnpj(inputValue)
    setCnpj(formattedCjnp)
  }

  const handleValidateClick = () => {
    const isValidCnpj = validateCNPJ(cnpj)
    if (!isValidCnpj) {
      setErrorMessage('Número de CNPJ inválido! ❌')
      setSuccessMessage('')
    } else {
      setErrorMessage('')
      setSuccessMessage('Número de CNPJ válido! ✅')
    }
  }

  const handleClearClick = () => {
    setCnpj('')
    setErrorMessage('')
    setSuccessMessage('')
  }

  return (
    <div className='w-full p-6 flex flex-col items-center'>
      <h1 className='p-4 text-2xl font-semibold'>Validador de CNPJ</h1>
      <input
        className="text-gray-900 border-2 border-gray-300 p-2 rounded-md placeholder:text-gray-600"
        type="text"
        placeholder="Insira o número de CNPJ"
        value={cnpj}
        onChange={handleInputChange}
        maxLength={18}
      />

      <div className='flex space-x-2 gap-2 pt-2'>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleValidateClick}
        >
          Validar
        </button>
        <button
          className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleClearClick}
        >
          Limpar
        </button>
      </div>

      {errorMessage && <p className="text-red-500 pt-4 font-bold">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 pt-4 font-bold">{successMessage}</p>}
    </div >
  )
}