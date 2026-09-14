import { Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          aria-label="Tollbox, início"
          className="group flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <img
            src="/toolbox_icon.png"
            alt=""
            className="size-10 object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
          <span className="text-lg font-semibold tracking-tight">Tollbox</span>
        </Link>

        <ThemeToggle />
      </div>
    </header>
  )
}
