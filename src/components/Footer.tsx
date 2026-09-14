import { Separator } from '@/components/ui/separator'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pb-8 pt-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
      <Separator className="mb-6" />
      <p className="text-center">
        {currentYear} - Criado e desenvolvido por:{' '}
        <a
          href="https://www.lmdvlpr.com/"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary"
        >
          Lucas Mota
        </a>
      </p>
    </footer>
  )
}
