import { CaseLower, CaseUpper } from 'lucide-react'
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
    <div className='max-w-3xl mx-auto mt-8 p-6 flex flex-col items-center'>
      <textarea
        id='texto'
        rows={6}
        className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        placeholder='Digite aqui o texto que deseja converter...'
        value={inputText}
        onChange={handleTextChange}
      />

      <div className='flex space-x-6 p-6'>
        <button
          className='flex items-center justify-between px-4 py-2.5 text-base font-semibold bg-blue-500 text-white rounded hover:bg-blue-600'
          onClick={convertToUppercase}
        >
          Maiúsculo - {' '}
          <CaseUpper size={24} />
        </button>

        <button
          className='flex items-center justify-between px-4 py-2.5 text-base font-semibold bg-slate-600 text-white rounded hover:bg-slate-500'
          onClick={convertToLowercase}
        >
          Minúsculo - <CaseLower size={24} />
        </button>
      </div>
    </div>
  )
}