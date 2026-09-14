import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, CheckCircle2, Sparkles, X } from 'lucide-react'
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
        className="text-muted-foreground hover:text-foreground"
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
              className="flex max-h-[min(90dvh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-2xl"
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
                <div className="grid gap-3 sm:grid-cols-2">
                  {updates.map(({ title, description }) => (
                    <div key={title} className="rounded-xl border bg-muted/25 p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                        <div>
                          <h3 className="font-medium">{title}</h3>
                          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
