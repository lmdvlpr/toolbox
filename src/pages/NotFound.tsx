import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
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
        <motion.div
          className="mb-1"
          animate={shouldReduceMotion ? undefined : { y: [0, -5, 0], rotate: [-1, 1, -1] }}
          transition={shouldReduceMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src="/open_box.png"
            alt="Caixa de ferramentas vazia"
            className="size-40 object-cover drop-shadow-xl sm:size-48"
            style={{
              maskImage: 'radial-gradient(circle at center, black 55%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 55%, transparent 80%)',
            }}
          />
        </motion.div>

        <div className="relative mb-5 inline-flex" aria-hidden="true">
          <span className="text-[clamp(5rem,16vw,8rem)] font-semibold leading-[0.78] tracking-[-0.12em] text-primary/15">
            404
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Essa ferramenta não está na caixa.</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted-foreground">
          O endereço que você acessou não aponta para uma ferramenta disponível no Tollbox.
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
