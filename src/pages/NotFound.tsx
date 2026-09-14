import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFound() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-1 items-center justify-center overflow-hidden px-2 py-10">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
        transition={shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 flex w-full flex-col items-center text-center"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative mb-8 inline-flex" aria-hidden="true">
          <span className="text-[clamp(7rem,22vw,11rem)] font-semibold leading-[0.78] tracking-[-0.12em] text-primary/15">
            404
          </span>
          <motion.div
            className="absolute -right-2 -top-1 text-primary"
            animate={shouldReduceMotion ? undefined : { rotate: [10, -2, 10], y: [0, -5, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Wrench className="size-12 stroke-[1.5] sm:size-14" />
          </motion.div>
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Ferramenta não encontrada</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Essa página saiu da caixa.</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted-foreground">
          O endereço que você acessou não aponta para uma ferramenta do Tollbox.
        </p>
        <Button asChild className="mt-8">
          <Link to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar ao início
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
