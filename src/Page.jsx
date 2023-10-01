import { Header } from './components/Header'
import { Services } from './components/Services'

export default function Page() {
  return (
    <div className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black'>
      <div className='mx-auto h-screen max-w-2xl py-32 sm:py-48 lg:py-56'>
        <div className='text-center'>
          <Header />
          <div className='mt-10 p-4 grid grid-cols-2 gap-6'>
            <Services>Conversor de Textos</Services>
            <Services>Validador de CPF</Services>
            <Services>Validador de CNPJ</Services>
            <Services>Criptografar Arquivos</Services>
          </div>
        </div>
      </div>
    </div>
  )
}
