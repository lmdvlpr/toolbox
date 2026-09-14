import { useRef, useState, type ChangeEvent } from 'react'
import { File, LoaderCircle, RotateCcw, Upload } from 'lucide-react'
import { CopyButton } from '@/components/CopyButton'
import { ToolPage } from '@/components/ToolPage'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const MAX_FILE_SIZE = 50 * 1024 * 1024
const MIN_LOADING_DURATION_MS = 650

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function Encrypt() {
  const [hash, setHash] = useState('')
  const [fileName, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const processingIdRef = useRef(0)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const file = input.files?.[0]
    const processingId = ++processingIdRef.current

    setHash('')
    setFileName('')
    setErrorMessage('')
    setIsLoading(false)

    if (!file) {
      return
    }

    if (file.type !== 'application/pdf') {
      setErrorMessage('Selecione um arquivo PDF.')
      input.value = ''
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('O arquivo deve ter no máximo 50 MB.')
      input.value = ''
      return
    }

    setFileName(file.name)
    setIsLoading(true)

    try {
      const startedAt = performance.now()
      const buffer = await file.arrayBuffer()
      const digest = await crypto.subtle.digest('SHA-256', buffer)

      const remainingLoadingTime = MIN_LOADING_DURATION_MS - (performance.now() - startedAt)
      if (remainingLoadingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingLoadingTime))
      }

      if (processingId !== processingIdRef.current) {
        return
      }

      setHash(toHex(digest))
    } catch {
      if (processingId === processingIdRef.current) {
        setErrorMessage('Não foi possível calcular o hash deste arquivo. Tente novamente.')
        setFileName('')
      }
    } finally {
      if (processingId === processingIdRef.current) {
        setIsLoading(false)
      }
      input.value = ''
    }
  }

  const handleClear = () => {
    processingIdRef.current += 1
    setHash('')
    setFileName('')
    setErrorMessage('')
    setIsLoading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <ToolPage
      title="Hash de Arquivos"
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
              <input ref={fileInputRef} id="file-upload" type="file" accept="application/pdf,.pdf" className="sr-only" onChange={handleFileChange} />
            </label>
          </Button>
        </div>

        {fileName && !errorMessage && (
          <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="min-w-0 break-all text-muted-foreground">
              Arquivo selecionado: <span className="font-medium text-foreground">{fileName}</span>
            </p>
            <Button type="button" variant="ghost" size="sm" className="shrink-0 self-start sm:self-auto" onClick={handleClear}>
              <RotateCcw className="size-4" aria-hidden="true" />
              Limpar seleção
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="space-y-2" role="status" aria-live="polite">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <LoaderCircle className="size-4 animate-spin text-primary" aria-hidden="true" />
                Carregando arquivo e calculando hash...
              </span>
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
            <AlertDescription className="mt-3">
              <div className="flex flex-col gap-3 rounded-lg bg-background/70 p-3 sm:flex-row sm:items-center sm:justify-between">
                <code className="min-w-0 flex-1 break-all font-mono text-xs leading-6 text-foreground sm:text-sm">{hash}</code>
                <CopyButton value={hash} label="Copiar" />
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </ToolPage>
  )
}
