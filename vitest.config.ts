import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, 'src') + '/',
      '@site/': path.resolve(__dirname) + '/',
      '@docusaurus/': path.resolve(__dirname, 'test/stubs/docusaurus') + '/',
      '@theme-original/': path.resolve(__dirname, 'test/stubs/theme-original') + '/',
      '@theme/': path.resolve(__dirname, 'test/stubs/theme') + '/',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**', 'build/**', 'coverage/**', '.docusaurus/**'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.d.ts',
        'src/components/icons/**',
        'src/components/sponsors/**',
        'src/components/homepage/**',
        'src/pages/**',
      ],
      thresholds: {
        statements: 45,
        functions: 45,
        lines: 45,
        branches: 35,
      },
    },
  },
});
