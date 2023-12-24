import { File } from "lucide-react"
import { useState } from 'react'
import jsSHA from "jssha"
import LinearProgress from '@mui/material/LinearProgress'

export function Encrypt() {
  const [hash, setHash] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    setIsLoading(true)

    reader.onload = function (event) {
      const shaObj = new jsSHA("SHA-256", "ARRAYBUFFER")
      shaObj.update(event.target.result)
      const hash = shaObj.getHash("HEX")
      setHash(hash)
      setIsLoading(false)
    }

    reader.onerror = function (event) {
      setIsLoading(false)
      setErrorMessage(`Ocorreu um erro ao ler o arquivo: ${event.target.error}`)
    }
    reader.readAsArrayBuffer(file)
  }
  return (
    <div className='w-full p-6 flex flex-col items-center'>
      <h1 className='p-4 text-2xl font-semibold'>Criptografar Arquivos</h1>

      <div className="block w-full max-w-2xl mt-2 grid-cols-1 gap-x-6 gap-y-8">
        <div className="col-span-full">
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-100 px-6 py-10">
            <div className="text-center">
              <File className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-white">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span className="px-2">Escolher arquivo...</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                </label>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-300">PDF de até 50MB</p>
            </div>
          </div>

          <div className=" pt-1 flex flex-col items-center">
            {isLoading && <LinearProgress />}
            {errorMessage && <p className="text-center text-red-500 pt-2 font-bold"> Ops! Não é possível criptografar este arquivo 🙅{errorMessage}</p>}
            {!isLoading && !errorMessage && hash && <p className="px-2 text-center text-green-500 pt-2 font-bold break-all"> Arquivo criptografado com sucesso! ✅<br /> <br />{hash}</p>}
          </div>

        </div>
      </div>
    </div>
  )
}