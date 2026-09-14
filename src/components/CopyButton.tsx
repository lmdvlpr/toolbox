import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CopyButtonProps {
  value: string
  label?: string
}

export function CopyButton({ value, label = 'Copiar resultado' }: CopyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      setStatus('error')
      return
    }

    try {
      await navigator.clipboard.writeText(value)
      setStatus('copied')
      timeoutRef.current = setTimeout(() => setStatus('idle'), 1800)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button type="button" variant="outline" size="sm" onClick={handleCopy} disabled={!value}>
        {status === 'copied' ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        {status === 'copied' ? 'Copiado' : label}
      </Button>
      <span className="sr-only" role="status" aria-live="polite">
        {status === 'copied' ? 'Resultado copiado.' : status === 'error' ? 'Não foi possível copiar o resultado.' : ''}
      </span>
    </div>
  )
}
