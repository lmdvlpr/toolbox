import { useState, type FormEvent } from 'react'
import { Type } from 'lucide-react'
import { CopyButton } from '@/components/CopyButton'
import { ToolPage } from '@/components/ToolPage'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function Converter() {
  const [inputText, setInputText] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <ToolPage
      title="Conversor de textos"
      description="Transforme rapidamente um texto para maiúsculas ou minúsculas, sem sair do navegador."
      icon={Type}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <Label htmlFor="texto">Texto para converter</Label>
          <Textarea
            id="texto"
            rows={8}
            placeholder="Digite aqui o texto que deseja converter..."
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            aria-describedby="texto-ajuda"
          />
          <p id="texto-ajuda" className="text-sm text-muted-foreground">
            A conversão acontece localmente e o texto não é enviado para nenhum servidor.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="button" onClick={() => setInputText((text) => text.toUpperCase())}>
            Maiúsculo
          </Button>
          <Button type="button" variant="secondary" onClick={() => setInputText((text) => text.toLowerCase())}>
            Minúsculo
          </Button>
        </div>

        {inputText && (
          <Alert>
            <AlertTitle>Resultado pronto</AlertTitle>
            <AlertDescription className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="max-h-32 overflow-auto break-words text-foreground">{inputText}</span>
              <CopyButton value={inputText} label="Copiar texto" />
            </AlertDescription>
          </Alert>
        )}
      </form>
    </ToolPage>
  )
}
