import { motion } from 'motion/react'
import { Building2, File, Fingerprint, Type } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

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
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-8 text-center"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <section className="mx-auto w-full max-w-3xl">
        <motion.div
          className="flex flex-col items-center"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
        >
          <img
            src="/toolbox_icon.png"
            alt="Caixa de ferramentas do Tollbox"
            className="mb-8 size-36 object-cover sm:size-44"
          />
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Ferramentas úteis para o dia a dia do cartório.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            O Tollbox reúne ferramentas rápidas para transformar textos, gerar hashes de arquivos e validar documentos, tudo em um só lugar.
          </p>
        </motion.div>
      </section>

      <section aria-labelledby="tools-title">
        <h2 id="tools-title" className="sr-only">Ferramentas disponíveis</h2>
        <div className="grid gap-4 text-left sm:grid-cols-2">
          {tools.map(({ title, description, to, icon: Icon }, index) => (
            <motion.div key={to} custom={index} variants={cardVariants}>
              <NavLink
                to={to}
                className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-md">
                  <CardContent className="flex min-h-28 items-center justify-between gap-5 p-5">
                    <div className="min-w-0">
                      <CardTitle className="text-lg">{title}</CardTitle>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                    </div>
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
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
