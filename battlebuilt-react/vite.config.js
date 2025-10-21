import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  // load .env files
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.VITE_PTCG_KEY

  return defineConfig({
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // Proxy /api/tcg/* to the Pokemon TCG API to avoid CORS in development
        '/api/tcg': {
          target: 'https://api.pokemontcg.io/v2',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tcg/, ''),
          configure: (proxy) => {
            // inject API key into proxied requests on the dev server side
            proxy.on('proxyReq', (proxyReq, req, res) => {
              if (apiKey) proxyReq.setHeader('X-Api-Key', apiKey)
            })
          },
        },
      },
    },
  })
}
