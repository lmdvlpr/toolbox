import { useState, type FormEvent } from 'react'
import { Building2 } from 'lucide-react'
import { CopyButton } from '@/components/CopyButton'
import { ToolPage } from '@/components/ToolPage'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCnpj, getCnpjValidationError, validateCnpj } from '@/lib/cnpj'

export function CnpjValidate() {
  const [cnpj, setCnpj] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [hasValidated, setHasValidated] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasValidated(true)
    setValidationError(getCnpjValidationError(cnpj))
  }

  const handleClear = () => {
    setCnpj('')
    setValidationError(null)
    setHasValidated(false)
  }

  const isValid = hasValidated && !validationError && validateCnpj(cnpj)

  return (
    <ToolPage
      title="Validador de CNPJ"
      description="Confira CNPJs numéricos e alfanuméricos com a regra de dígitos verificadores da Receita Federal."
      icon={Building2}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            id="cnpj"
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            placeholder="12.ABC.345/01DE-35"
            value={cnpj}
            onChange={(event) => {
              setCnpj(formatCnpj(event.target.value))
              setValidationError(null)
              setHasValidated(false)
            }}
            maxLength={18}
            aria-describedby="cnpj-ajuda"
            aria-invalid={hasValidated && Boolean(validationError)}
          />
          <p id="cnpj-ajuda" className="text-sm text-muted-foreground">Aceita números e letras de A a Z. Os dois últimos caracteres são dígitos verificadores numéricos.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit">Validar CNPJ</Button>
          <Button type="button" variant="outline" onClick={handleClear}>Limpar</Button>
        </div>

        {isValid && (
          <Alert variant="success">
            <AlertTitle>CNPJ válido</AlertTitle>
            <AlertDescription className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span>O formato e os dígitos verificadores conferem.</span>
              <CopyButton value={cnpj} label="Copiar CNPJ" />
            </AlertDescription>
          </Alert>
        )}

        {hasValidated && validationError && (
          <Alert variant="destructive">
            <AlertTitle>CNPJ inválido</AlertTitle>
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}
      </form>
    </ToolPage>
  )
}
