//  @ts-check
import drizzle from 'eslint-plugin-drizzle'
import { globalIgnores } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import prettierConfig from 'eslint-config-prettier'
import reactRefresh from 'eslint-plugin-react-refresh'
import pluginQuery from '@tanstack/eslint-plugin-query'
import { tanstackConfig } from '@tanstack/eslint-config'
import pluginRouter from '@tanstack/eslint-plugin-router'
import noBarrelFiles from 'eslint-plugin-no-barrel-files'

export default [
  globalIgnores(['bak-src/**']),
  ...tanstackConfig,
  reactHooks.configs.flat['recommended-latest'],
  reactRefresh.configs.recommended,
  { ignores: ['*.config.js'] },
  {
    plugins: { drizzle },
    rules: { ...drizzle.configs.recommended.rules },
  },
  {
    rules: {
      'react/no-multi-comp': 'off',
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
    },
  },
  ...pluginQuery.configs['flat/recommended'],
  ...pluginRouter.configs['flat/recommended'],
  noBarrelFiles.flat,

  // Forbid importing server-only modules from client bundles
  {
    files: [
      'src/features/**/*.tsx',
      'src/features/**/hooks/**/*.ts',
      'src/shared/components/**/*.tsx',
      'src/routes/**/*.tsx',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/server/!(schemas|queries|mutations)*',
                '@/server/!(schemas|queries|mutations)/**',
                '*/server/!(schemas|queries|mutations)*',
                '*/server/!(schemas|queries|mutations)/**',
              ],
              message:
                'Server modules cannot be imported in client code. (schemas/*, queries/*, mutations/* are allowed)',
            },
            {
              group: ['@/env.server', '*/env.server'],
              message:
                'Server environment variables cannot be imported in client code. Use @/env.client instead.',
            },
            {
              group: ['@/features/*/index'],
              message:
                'Cross-feature barrel imports are not allowed. Import directly from the specific module path.',
            },
          ],
        },
      ],
    },
  },

  // Disallow barrel imports for cross-feature exports
  {
    files: ['src/features/**/*.ts', 'src/features/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/index'],
              message:
                'Cross-feature barrel imports are not allowed. Import directly from the specific module path.',
            },
          ],
        },
      ],
    },
  },

  prettierConfig,
]
