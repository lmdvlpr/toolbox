import { motion } from 'motion/react'
import { CalendarDays, ExternalLink, Sparkles } from 'lucide-react'
import { BackToHomeButton } from '@/components/BackToHomeButton'
import { formattedUpdateDate, updateDateTime, updates } from '@/lib/updates'

export function Updates() {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 py-4 sm:gap-10 sm:py-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="border-b pb-8">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
            Atualizações da plataforma
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Novidades do Toolbox</h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Um resumo do que foi atualizado nesta versão da plataforma.
          </p>
        </div>
      </header>

      <section aria-labelledby="updates-title" className="grid gap-4 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8">
        <time className="flex items-center gap-2 text-sm font-medium text-muted-foreground md:block md:pt-1 md:text-right" dateTime={updateDateTime}>
          <CalendarDays className="size-4 md:ml-auto" aria-hidden="true" />
          <span className="md:mt-2 md:block">{formattedUpdateDate}</span>
        </time>

        <div className="relative border-l border-border pl-6 sm:pl-8">
          <span className="absolute -left-[5px] top-1 size-2.5 rounded-full bg-amber-400 ring-4 ring-background dark:bg-amber-300" aria-hidden="true" />
          <h2 id="updates-title" className="text-xl font-semibold tracking-tight">O que mudou</h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            As principais melhorias que chegaram ao Toolbox nesta atualização:
          </p>

          <ul className="mt-8 space-y-8">
            {updates.map(({ title, description, source }) => (
              <li key={title} className="relative pl-5">
                <span className="absolute left-0 top-2.5 size-1.5 rounded-full bg-amber-400 dark:bg-amber-300" aria-hidden="true" />
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">{description}</p>
                {source && (
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary/80"
                  >
                    {source.label}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="flex justify-end">
        <BackToHomeButton />
      </div>
    </motion.div>
  )
}
