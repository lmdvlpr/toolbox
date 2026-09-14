import { Route, Routes } from 'react-router-dom'
import { Converter } from '@/components/Converter'
import { CnpjValidate } from '@/components/CnpjValidate'
import { CpfValidate } from '@/components/CpfValidate'
import { Encrypt } from '@/components/Encrypt'
import Layout from '@/layouts/Layout'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="conversor-de-textos" element={<Converter />} />
        <Route path="criptografar-arquivos" element={<Encrypt />} />
        <Route path="validador-de-cpf" element={<CpfValidate />} />
        <Route path="validador-de-cnpj" element={<CnpjValidate />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
