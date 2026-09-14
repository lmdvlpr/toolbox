import { motion } from 'motion/react'
import { ArrowUpRight, Building2, File, FileText, Fingerprint, Type, Wrench } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const tools = [
  {
    title: 'Conversor de textos',
    description: 'Alterne rapidamente entre letras maiúsculas e minúsculas.',
    to: '/conversor-de-textos',
    icon: Type,
  },
  {
    title: 'Criptografar arquivos',
    description: 'Gere o hash SHA-256 de um arquivo PDF no próprio navegador.',
    to: '/criptografar-arquivos',
    icon: File,
  },
  {
    title: 'Validador de CPF',
    description: 'Confira o formato e os dígitos verificadores de um CPF.',
    to: '/validador-de-cpf',
    icon: Fingerprint,
  },
  {
    title: 'Validador de CNPJ',
    description: 'Valide CNPJs numéricos e alfanuméricos com módulo 11.',
    to: '/validador-de-cnpj',
    icon: Building2,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export function Home() {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-14"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            <Wrench className="size-4 text-primary" aria-hidden="true" />
            Ferramentas para o dia a dia
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Seu kit de ferramentas para o cartório.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Quatro utilitários simples para transformar textos, conferir documentos e trabalhar com mais agilidade.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border bg-card shadow-lg shadow-primary/5"
          variants={{ hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="/toolbox_icon.png" alt="Caixa de ferramentas do Toolbox" className="aspect-square w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-5 pb-5 pt-14 text-white">
            <p className="text-sm font-medium">Tudo no mesmo lugar</p>
          </div>
        </motion.div>
      </section>

      <section aria-labelledby="tools-title">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 id="tools-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">Escolha uma ferramenta</h2>
            <p className="mt-2 text-muted-foreground">Acesse uma das quatro ferramentas disponíveis.</p>
          </div>
          <FileText className="hidden size-7 text-primary/70 sm:block" aria-hidden="true" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map(({ title, description, to, icon: Icon }, index) => (
            <motion.div key={to} custom={index} variants={cardVariants}>
              <NavLink
                to={to}
                className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                <Card className={cn('h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-md')}>
                  <CardHeader className="flex-row items-start justify-between gap-4">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
