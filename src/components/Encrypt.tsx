import { useState, type ChangeEvent } from 'react'
import { File, Upload } from 'lucide-react'
import { CopyButton } from '@/components/CopyButton'
import { ToolPage } from '@/components/ToolPage'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const MAX_FILE_SIZE = 50 * 1024 * 1024

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function Encrypt() {
  const [hash, setHash] = useState('')
  const [fileName, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setHash('')
    setFileName('')
    setErrorMessage('')

    if (!file) {
      return
    }

    if (file.type !== 'application/pdf') {
      setErrorMessage('Selecione um arquivo PDF.')
      event.target.value = ''
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('O arquivo deve ter no máximo 50 MB.')
      event.target.value = ''
      return
    }

    setFileName(file.name)
    setIsLoading(true)

    try {
      const buffer = await file.arrayBuffer()
      const digest = await crypto.subtle.digest('SHA-256', buffer)
      setHash(toHex(digest))
    } catch {
      setErrorMessage('Não foi possível calcular o hash deste arquivo. Tente novamente.')
      setFileName('')
    } finally {
      setIsLoading(false)
      event.target.value = ''
    }
  }

  return (
    <ToolPage
      title="Criptografar arquivos"
      description="Gere o hash SHA-256 de um PDF diretamente no navegador. O arquivo não sai do seu dispositivo."
      icon={File}
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-muted/30 px-6 py-10 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Upload className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium">Escolha um arquivo PDF</p>
            <p className="mt-1 text-sm text-muted-foreground">Tamanho máximo de 50 MB.</p>
          </div>
          <Button asChild variant="outline">
            <label htmlFor="file-upload" className="cursor-pointer">
              Selecionar arquivo
              <input id="file-upload" type="file" accept="application/pdf,.pdf" className="sr-only" onChange={handleFileChange} />
            </label>
          </Button>
        </div>

        {fileName && !errorMessage && <p className="text-sm text-muted-foreground">Arquivo selecionado: <span className="font-medium text-foreground">{fileName}</span></p>}

        {isLoading && (
          <div className="space-y-2" role="status" aria-live="polite">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Calculando hash...</span>
              <span>SHA-256</span>
            </div>
            <Progress value={60} className="animate-pulse" aria-label="Calculando hash" />
          </div>
        )}

        {errorMessage && (
          <Alert variant="destructive">
            <AlertTitle>Não foi possível concluir</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {hash && !isLoading && (
          <Alert variant="success">
            <AlertTitle>Hash gerado com sucesso</AlertTitle>
            <AlertDescription className="mt-3 space-y-4">
              <code className="block break-all rounded-lg bg-background/70 p-3 font-mono text-xs leading-6 text-foreground sm:text-sm">{hash}</code>
              <CopyButton value={hash} label="Copiar hash" />
            </AlertDescription>
          </Alert>
        )}
      </div>
    </ToolPage>
  )
}
