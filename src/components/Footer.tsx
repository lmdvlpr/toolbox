import { Separator } from '@/components/ui/separator'

export function Footer() {
  const currentDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date())

  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pb-8 pt-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
      <Separator className="mb-6" />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>Atualizado em {currentDate}</p>
        <p>
          Criado e desenvolvido por{' '}
          <a
            href="https://www.lmdvlpr.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary"
          >
            Lucas Mota
          </a>
        </p>
      </div>
    </footer>
  )
}
