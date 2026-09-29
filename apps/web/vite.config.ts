import { defineConfig, loadEnv } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../..')
  return {
    envDir: '../..',
    server: {
      port: parseFloat(env.VITE_WEB_PORT) ? Number(env.VITE_WEB_PORT) : 3001,
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [viteReact(), tailwindcss()],
  }
})
