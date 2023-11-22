import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Converter } from './components/Converter';
import { Encrypt } from './components/Encrypt';
import { CpfValidate } from './components/CpfValidate';
import { CnpjValidate } from './components/CnpjValidate';
import Layout from './layouts/Layout';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/conversor-de-textos' element={<Converter />} />
        <Route path='/criptografar-arquivos' element={<Encrypt />} />
        <Route path='/validador-de-cpf' element={<CpfValidate />} />
        <Route path='/validador-de-cnpj' element={<CnpjValidate />} />
      </Route>
    </Routes>
  )
}