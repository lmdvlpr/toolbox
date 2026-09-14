import { Link, NavLink } from 'react-router-dom'
import { File, FileText, Fingerprint, Type } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'

const navigationItems = [
  { to: '/conversor-de-textos', label: 'Textos', icon: Type },
  { to: '/criptografar-arquivos', label: 'Arquivos', icon: File },
  { to: '/validador-de-cpf', label: 'CPF', icon: Fingerprint },
  { to: '/validador-de-cnpj', label: 'CNPJ', icon: FileText },
]

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <img src="/toolbox_icon.png" alt="" className="size-11 rounded-xl object-cover shadow-sm transition-transform duration-200 group-hover:scale-[1.03]" />
          <span className="text-lg font-semibold tracking-tight">Toolbox</span>
        </Link>

        <ThemeToggle />

        <nav className="order-3 flex w-full min-w-0 gap-1 overflow-x-auto pb-1 md:order-2 md:w-auto md:flex-1 md:justify-center md:pb-0" aria-label="Ferramentas">
          {navigationItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => cn(
                'inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive && 'bg-accent text-accent-foreground',
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
