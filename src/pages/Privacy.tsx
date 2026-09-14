import { motion } from 'motion/react'
import {
  ArrowLeft,
  Database,
  FileText,
  Fingerprint,
  Globe2,
  Scale,
  Settings2,
  ShieldCheck,
  Type,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const processedLocally = [
  {
    title: 'Textos',
    description: 'O conteúdo do conversor permanece em memória enquanto a página está aberta e não é enviado para um servidor.',
    icon: Type,
  },
  {
    title: 'Arquivos PDF',
    description: 'O PDF é lido pelo navegador para gerar o hash SHA-256. O arquivo não é carregado nem armazenado pelo Toolbox.',
    icon: FileText,
  },
  {
    title: 'CPF e CNPJ',
    description: 'A validação dos documentos acontece no seu dispositivo. Os números informados não são transmitidos pela aplicação.',
    icon: Fingerprint,
  },
]

export function Privacy() {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 py-4 sm:py-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-primary">Transparência em primeiro lugar</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">Política de Privacidade</h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            O Toolbox foi criado para oferecer ferramentas simples, privadas e úteis. Esta página explica, em linguagem direta, o que acontece com as informações usadas em cada ferramenta.
          </p>
        </div>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShieldCheck className="size-6" aria-hidden="true" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="size-5 text-primary" aria-hidden="true" />
            Seus dados não saem do dispositivo
          </CardTitle>
          <CardDescription>O processamento das ferramentas acontece localmente no seu navegador.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
          <p>
            O Toolbox não coleta, armazena ou envia para servidores próprios os textos digitados, os números de CPF ou CNPJ informados, nem os arquivos PDF selecionados nas ferramentas.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {processedLocally.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-foreground">
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                  <p className="font-medium">{title}</p>
                </div>
                <p className="mt-2 text-sm leading-6">{description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="size-5 text-primary" aria-hidden="true" />
            O que é salvo no navegador?
          </CardTitle>
          <CardDescription>Apenas uma preferência visual, para lembrar sua escolha.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>
            A escolha entre os temas claro e escuro é guardada localmente no seu navegador usando <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">localStorage</code>. Essa preferência não é enviada ao Toolbox e pode ser removida ao limpar os dados do site no navegador.
          </p>
          <p>
            O Toolbox não utiliza cookies de rastreamento, não possui cadastro de usuários e não implementa ferramentas de analytics na aplicação.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe2 className="size-5 text-primary" aria-hidden="true" />
            Acesso ao site e terceiros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>
            A aplicação não envia dados das ferramentas para APIs externas. Como acontece com qualquer site, a infraestrutura de hospedagem pode processar registros técnicos necessários para entregar a página, como endereço IP, data e hora do acesso. Esses registros dependem da configuração e das políticas do provedor de hospedagem.
          </p>
          <p>
            Esta política se refere ao funcionamento do Toolbox e não cobre sites de terceiros acessados por links externos.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="size-5 text-primary" aria-hidden="true" />
            Seus direitos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>
            A Lei Geral de Proteção de Dados (LGPD) garante direitos às pessoas titulares de dados pessoais. Como o Toolbox não mantém os dados inseridos nas ferramentas, não há uma base de dados de documentos para consultar ou excluir.
          </p>
          <p>
            Se você tiver uma dúvida sobre privacidade ou acreditar que houve algum tratamento relacionado ao site, entre em contato com o responsável:
          </p>
          <p className="font-medium text-foreground">
            <a href="https://www.lmdvlpr.com/" target="_blank" rel="noreferrer" className="underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary">
              Lucas Mota
            </a>
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>Última atualização: 14 de setembro de 2026.</p>
        <Button asChild variant="outline">
          <Link to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar para o início
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}
