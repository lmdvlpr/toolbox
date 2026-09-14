import { ArrowLeft, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ToolPageProps {
  title: string
  description: string
  icon: LucideIcon
  children: React.ReactNode
  className?: string
}

export function ToolPage({ title, description, icon: Icon, children, className }: ToolPageProps) {
  return (
    <motion.div
      className={cn('mx-auto w-full max-w-3xl', className)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Voltar para à página inicial
      </Link>

      <div className="mb-8 flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>
        </div>
      </div>

      <Card>
        <CardHeader className="sr-only">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">{children}</CardContent>
      </Card>
    </motion.div>
  )
}
