import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        resolve: {
          alias: {
            '#shared': fileURLToPath(new URL('./shared', import.meta.url)),
          },
        },
        test: {
          name: 'unit',
          include: ['**/test/**/*.{test,spec}.ts'],
          exclude: ['test/**'],
          environment: 'node',
        },
      }
    ]
  }
})
