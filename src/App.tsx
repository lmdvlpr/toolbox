import { MotionConfig } from 'motion/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Router } from './Router'

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App
