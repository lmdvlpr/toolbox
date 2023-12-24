import { NavLink } from 'react-router-dom';

export function Home() {
  const date = new Date()
  const currentYear = date.getFullYear()
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="flex justify-center items-center gap-4">
        <h1
          className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent sm:text-5xl"
        >
          Toolbox
        </h1>
        <span className="text-5xl">🧰</span>
      </div>

      <h2 className="mx-auto mt-4 max-w-4xl sm:text-xl/relaxed">
        <span className="font-bold italic">Toolbox</span>, como o próprio nome diz, é uma: <span className="font-bold underline underline-offset-4">caixa de ferramentas</span>.
      </h2>

      <p className="mx-auto mt-4 max-w-4xl sm:text-xl/relaxed">
        O projeto foi criado com o intuito de oferecer uma gama de
        ferramentas úteis e que estão sempre à mão para aqueles que precisam.
      </p>

      <div className="mt-8 flex flex-col md:grid grid-cols-2 gap-4">
        <NavLink
          className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          to="/conversor-de-textos"
        >
          📝 Conversor de Textos
        </NavLink>

        <NavLink
          className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          to="/criptografar-arquivos"
        >
          🔐 Criptografar Arquivos
        </NavLink>

        <NavLink
          className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          to="/validador-de-cpf"
        >
          ✅ Validador de CPF
        </NavLink>

        <NavLink
          className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          to="/validador-de-cnpj"
        >
          ☑️ Validador de CNPJ
        </NavLink>

      </div>

      <footer className="mx-auto mt-20 max-w-4xl text-base sm:text-base/relaxed">
        <p>🧰 Toolbox - {currentYear}</p>
        <p>💻 Criado e desenvolvido por: <a href="https://github.com/lmdvlpr" target="_blank" rel="noopener noreferrer"><span className="font-bold underline underline-offset-4">Lucas Mota</span></a></p>
      </footer>
    </div >
  )
}
