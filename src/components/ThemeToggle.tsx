import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme, type Theme } from './theme-context'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const selectTheme = (nextTheme: Theme) => {
    setTheme(nextTheme)
  }

  return (
    <div className="flex items-center rounded-lg border bg-card p-1" aria-label="Escolher tema" role="group">
      <Button
        type="button"
        variant={theme === 'light' ? 'secondary' : 'ghost'}
        size="sm"
        className="h-8 px-2.5"
        aria-pressed={theme === 'light'}
        onClick={() => selectTheme('light')}
      >
        <Sun className="size-4" aria-hidden="true" />
        <span className="sr-only">Tema claro</span>
      </Button>
      <Button
        type="button"
        variant={theme === 'dark' ? 'secondary' : 'ghost'}
        size="sm"
        className="h-8 px-2.5"
        aria-pressed={theme === 'dark'}
        onClick={() => selectTheme('dark')}
      >
        <Moon className="size-4" aria-hidden="true" />
        <span className="sr-only">Tema escuro</span>
      </Button>
    </div>
  )
}
