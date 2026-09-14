import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const updates = [
  {
    title: 'Mais segurança e estabilidade',
    description: 'Atualizamos a plataforma para oferecer uma experiência mais segura, estável e preparada para continuar evoluindo.',
  },
  {
    title: 'Visual mais agradável',
    description: 'A página ficou mais organizada, confortável de ler e fácil de usar, com transições leves que ajudam na navegação.',
  },
  {
    title: 'Escolha o seu tema',
    description: 'Você pode escolher entre os temas claro e escuro. O Tollbox lembra sua preferência no próximo acesso.',
  },
  {
    title: 'CNPJ com letras e números',
    description: 'O validador agora confere tanto os CNPJs tradicionais quanto os novos CNPJs que combinam letras e números.',
  },
  {
    title: 'Mais privacidade para você',
    description: 'Os textos, documentos e arquivos usados nas ferramentas são processados no seu próprio dispositivo e não são enviados para a internet.',
  },
  {
    title: 'Uma experiência mais completa',
    description: 'O Tollbox ganhou um novo ícone, uma página especial para quando algo não for encontrado e uma Política de Privacidade acessível no rodapé.',
  },
]

const formattedDate = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date())

export function UpdatesDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus()
      return
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="sm"
        className="border border-amber-400/50 bg-amber-50/70 text-amber-800 shadow-sm shadow-amber-500/20 hover:bg-amber-100/80 hover:text-amber-900 dark:border-amber-300/30 dark:bg-amber-300/10 dark:text-amber-200 dark:hover:bg-amber-300/20 dark:hover:text-amber-100"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Sparkles className="size-4 text-primary" aria-hidden="true" />
        Confira as novidades da plataforma
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={handleOverlayMouseDown}
          >
            <motion.div
              className="flex max-h-[min(90dvh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border bg-card text-left text-card-foreground shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="updates-title"
              aria-describedby="updates-description"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-6">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Atualizado em {formattedDate}
                  </div>
                  <h2 id="updates-title" className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                    Novidades do Tollbox
                  </h2>
                  <p id="updates-description" className="mt-1 text-sm leading-6 text-muted-foreground">
                    Um resumo do que foi atualizado nesta versão da plataforma.
                  </p>
                </div>
                <Button
                  ref={closeButtonRef}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="-mr-2 -mt-1 shrink-0"
                  aria-label="Fechar novidades"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="size-5" aria-hidden="true" />
                </Button>
              </div>

              <div className="overflow-y-auto px-5 py-5 sm:px-6">
                <div className="grid gap-3 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-6">
                  <time className="text-xs font-medium text-muted-foreground md:pt-1 md:text-right" dateTime="2026-09-14">
                    {formattedDate}
                  </time>
                  <div className="relative border-l border-border pl-6">
                    <span className="absolute -left-[5px] top-1 size-2.5 rounded-full bg-amber-400 ring-4 ring-card dark:bg-amber-300" aria-hidden="true" />
                    <h3 className="text-lg font-semibold tracking-tight">O que mudou</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      As principais melhorias que chegaram ao Tollbox nesta atualização:
                    </p>
                    <ul className="mt-5 space-y-5">
                      {updates.map(({ title, description }) => (
                        <li key={title} className="relative pl-5">
                          <span className="absolute left-0 top-2.5 size-1.5 rounded-full bg-amber-400 dark:bg-amber-300" aria-hidden="true" />
                          <h4 className="font-medium">{title}</h4>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
