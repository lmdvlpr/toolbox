import { useState } from 'react'

export function Converter() {
  const [inputText, setInputText] = useState('')

  const handleTextChange = (e) => {
    setInputText(e.target.value)
  }

  const convertToUppercase = () => {
    setInputText(inputText.toUpperCase())
  }

  const convertToLowercase = () => {
    setInputText(inputText.toLowerCase())
  }

  return (
    <div className='w-full p-6 flex flex-col items-center'>
      <h1 className='p-4 text-2xl font-semibold'>Conversor de Textos</h1>
      <textarea
        id='texto'
        rows={6}
        className='block w-full max-w-4xl rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-100 placeholder:text-gray-600 focus:ring-1 focus:ring-inset focus:ring-slate-100 sm:text-sm sm:leading-6'
        placeholder='Digite aqui o texto que deseja converter...'
        value={inputText}
        onChange={handleTextChange}
      />

      <div className='flex space-x-6 gap-4 pt-6'>
        <button
          className='flex items-center justify-between px-4 py-2.5 text-base font-semibold bg-blue-500 text-white rounded hover:bg-blue-600'
          onClick={convertToUppercase}
        >
          Maiúsculo
        </button>

        <button
          className='flex items-center justify-between px-4 py-2.5 text-base font-semibold bg-slate-600 text-white rounded hover:bg-slate-500'
          onClick={convertToLowercase}
        >
          Minúsculo
        </button>
      </div>
    </div>
  )
}
