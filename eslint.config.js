//  @ts-check
import drizzle from 'eslint-plugin-drizzle'
import { globalIgnores } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import prettierConfig from 'eslint-config-prettier'
import reactRefresh from 'eslint-plugin-react-refresh'
import pluginQuery from '@tanstack/eslint-plugin-query'
import { tanstackConfig } from '@tanstack/eslint-config'
import pluginRouter from '@tanstack/eslint-plugin-router'

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
  prettierConfig,
]
