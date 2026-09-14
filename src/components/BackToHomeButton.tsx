import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function BackToHomeButton() {
  return (
    <Button asChild variant="outline">
      <Link to="/">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Voltar para o início
      </Link>
    </Button>
  )
}
