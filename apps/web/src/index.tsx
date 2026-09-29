import { createRoot } from 'react-dom/client'
import { router } from './router'
import { App } from './app'

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(<App />)
