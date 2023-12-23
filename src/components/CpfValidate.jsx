import { useState } from 'react';

function validateCpf(cpf) {
  // Remove os caracteres não numéricos como por exemplo: traços, pontos e hífen
  const numbers = cpf.replace(/[^\d]+/g, '')

  // Verifica se o CPF tem 11 dígitos
  if (numbers.length !== 11) {
    return false
  }

  // Verifica se todos os dígitos são iguais
  const allDigitsAreEqual = numbers.split('').every((digit) => digit === numbers[0])
  if (allDigitsAreEqual) {
    return false
  }

  // Calcula e verificaos dígitos verificadores
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i)
  }

  let rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) {
    rest = 0
  }

  if (rest !== parseInt(numbers[9])) {
    return false
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i)
  }

  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) {
    rest = 0
  }

  if (rest !== parseInt(numbers[10])) {
    return false
  }

  return true
}

// Formata o número de CPF para exibição no input.
function formatCpf(cpf) {
  const numbers = cpf.replace(/[^\d]+/g, '')

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


export function CpfValidate() {
  const [cpf, setCpf] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleInputChange = (event) => {
    const inputValue = event.target.value
    const formattedCpf = formatCpf(inputValue)
    setCpf(formattedCpf)
  }

  const handleValidateClick = () => {
    const isValidCpf = validateCpf(cpf)
    if (!isValidCpf) {
      setErrorMessage('Número de CPF inválido! ❌')
      setSuccessMessage('')
    } else {
      setErrorMessage('')
      setSuccessMessage('Número de CPF válido! ✅')
    }
  }

  const handleClearClick = () => {
    setCpf('')
    setErrorMessage('')
    setSuccessMessage('')
  }

  return (
    <div className='w-full p-6 flex flex-col items-center'>
      <h1 className='p-4 text-2xl font-semibold'>Validador de CPF</h1>
      <input
        className="text-gray-900 border-2 border-gray-300 p-2 rounded-md placeholder:text-gray-600"
        type="text"
        placeholder="Insira o número de CPF"
        value={cpf}
        onChange={handleInputChange}
        maxLength={14}
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
  );
}