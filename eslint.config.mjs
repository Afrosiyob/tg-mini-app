import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import _import from 'eslint-plugin-import';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  globalIgnores([
    'node_modules/*',
    'build/*',
    'public/*',
    'tools/*',
    'electron/*',
    '**/commitlint.config.js',
    '**/jest.config.js',
    'src/react-app-env.d.ts',
    'src/serviceWorker.ts',
    'src/**/*.stories.tsx'
  ]),
  {
    extends: fixupConfigRules(compat.extends('plugin:prettier/recommended')),

    plugins: {
      prettier: fixupPluginRules(prettier),
      '@typescript-eslint': typescriptEslint,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      import: fixupPluginRules(_import)
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: './tsconfig.json'
      }
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      }
    },

    rules: {
      'import/no-cycle': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'react/button-has-type': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'class-methods-use-this': 'off',
      'no-param-reassign': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      '@typescript-eslint/no-shadow': 'off',
      'no-return-assign': 'off',
      'no-debugger': 'off',
      'global-require': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'newline-after-var': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'simple-import-sort/exports': 'error',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^react$', '^react-dom$', '^react-router$', '^react-router-dom$', '^@?\\w'],
            ['^config'],
            ['^store'],
            ['^services(/.*|$)'],
            ['^helpers(/.*|$)'],
            ['^modules(/.*|$)'],
            ['^containers(/.*|$)'],
            ['^layouts(/.*|$)'],
            ['^pages(/.*|$)'],
            ['^components(/.*|$)'],
            ['^translations(/.*|$)'],
            ['^assets(/.*|$)'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.(svg|jpg|png)$'],
            ['^.+\\.s?css$'],
            ['^']
          ]
        }
      ],

      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'unused-imports/no-unused-imports': 'error',
      'object-curly-spacing': ['warn', 'always'],

      'max-len': [
        'warn',
        {
          code: 120,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true
        }
      ],

      'no-plusplus': [
        'error',
        {
          allowForLoopAfterthoughts: true
        }
      ],

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.js',
            '**/*.test.jsx',
            '**/*.test.ts',
            '**/*.test.tsx',
            'src/tests/**/*',
            'src/setupTests.ts'
          ]
        }
      ],

      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off',
      'react/jsx-boolean-value': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-wrap-multilines': 'off',
      'react/destructuring-assignment': 'off',

      'comma-dangle': [
        'error',
        {
          arrays: 'only-multiline',
          objects: 'only-multiline',
          imports: 'only-multiline',
          exports: 'only-multiline',
          functions: 'never'
        }
      ]
    }
  }
]);
