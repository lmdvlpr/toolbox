import { motion } from 'motion/react'
import { Building2, File, Fingerprint, Type } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 text-center"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <section className="mx-auto w-full max-w-3xl pt-4 sm:pt-8">
        <motion.div
          className="flex flex-col items-center"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
        >
          <div className="mb-8 overflow-hidden rounded-3xl border bg-card shadow-lg shadow-primary/5">
            <img
              src="/toolbox_icon.png"
              alt="Caixa de ferramentas do Toolbox"
              className="size-36 object-cover sm:size-44"
            />
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Seu kit de ferramentas para o cartório.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Quatro utilitários simples para transformar textos, conferir documentos e trabalhar com mais agilidade.
          </p>
        </motion.div>
      </section>

      <section aria-labelledby="tools-title">
        <div className="mb-7">
          <div>
            <h2 id="tools-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">Escolha uma ferramenta</h2>
            <p className="mt-2 text-muted-foreground">Acesse uma das quatro ferramentas disponíveis.</p>
          </div>
        </div>

        <div className="grid gap-4 text-left sm:grid-cols-2">
          {tools.map(({ title, description, to, icon: Icon }, index) => (
            <motion.div key={to} custom={index} variants={cardVariants}>
              <NavLink
                to={to}
                className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
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
