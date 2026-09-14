import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Página não encontrada</h1>
      <p className="mt-3 text-muted-foreground">O endereço informado não corresponde a uma ferramenta do Toolbox.</p>
      <Button asChild className="mt-7">
        <Link to="/">Voltar para a home</Link>
      </Button>
    </div>
  )
}
