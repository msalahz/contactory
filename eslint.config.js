//  @ts-check
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginRouter from '@tanstack/eslint-plugin-router'
import reactHooks from 'eslint-plugin-react-hooks'
import prettierConfig from 'eslint-config-prettier'
import reactRefresh from 'eslint-plugin-react-refresh'
import drizzle from 'eslint-plugin-drizzle'

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
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
