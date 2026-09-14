import { useState, type FormEvent } from 'react'
import { Fingerprint } from 'lucide-react'
import { CopyButton } from '@/components/CopyButton'
import { ToolPage } from '@/components/ToolPage'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCpf, validateCpf } from '@/lib/cpf'

export function CpfValidate() {
  const [cpf, setCpf] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsValid(validateCpf(cpf))
  }

  const handleClear = () => {
    setCpf('')
    setIsValid(null)
  }

  return (
    <ToolPage
      title="Validador de CPF"
      description="Confira o formato e os dígitos verificadores de um CPF sem enviar dados para a internet."
      icon={Fingerprint}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(event) => {
              setCpf(formatCpf(event.target.value))
              setIsValid(null)
            }}
            maxLength={14}
            aria-describedby="cpf-ajuda"
          />
          <p id="cpf-ajuda" className="text-sm text-muted-foreground">Digite os 11 números do CPF.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit">Validar CPF</Button>
          <Button type="button" variant="outline" onClick={handleClear}>Limpar</Button>
        </div>

        {isValid === true && (
          <Alert variant="success">
            <AlertTitle>CPF válido</AlertTitle>
            <AlertDescription className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span>Os dígitos verificadores conferem.</span>
              <CopyButton value={cpf} label="Copiar CPF" />
            </AlertDescription>
          </Alert>
        )}

        {isValid === false && (
          <Alert variant="destructive">
            <AlertTitle>CPF inválido</AlertTitle>
            <AlertDescription>Confira os números informados e tente novamente.</AlertDescription>
          </Alert>
        )}
      </form>
    </ToolPage>
  )
}
