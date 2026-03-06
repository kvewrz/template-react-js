import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist'] },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  eslintPluginUnicorn.configs.recommended,
  ...tseslint.configs.recommended, // Рекомендуемые правила TypeScript ESLint
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin,
    },
    settings: {
      // Настройка разрешения импортов для TypeScript
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // Всегда пытаться резолвить типы
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      react: {
        version: 'detect', // Автоматически определять версию React
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // Общие правила
      'no-undef': 'error', // Запретить использование необъявленных переменных
      'no-console': 'off', // Разрешить использование console.log
      'react/react-in-jsx-scope': 'off', // Не требовать импорт React в файлах JSX (для Next.js/React 17+)
      
      // Запретить неиспользуемые переменные (работает для JS и TS)
      'no-unused-vars': 'off', // Отключить базовое правило для совместимости с TypeScript
      '@typescript-eslint/no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]|^_', // Игнорировать неиспользуемые переменные в UPPER_CASE или начинающиеся с _
        argsIgnorePattern: '^_', // Игнорировать неиспользуемые аргументы, начинающиеся с _
        caughtErrorsIgnorePattern: '^_', // Игнорировать ошибки в catch, начинающиеся с _
      }],
      'default-param-last': 'warn', // Параметры по умолчанию должны быть последними
      'consistent-return': 'warn', // Функции должны всегда возвращать значение или всегда ничего не возвращать
      'no-param-reassign': 'off', // Разрешить переприсваивание параметров функции
      'class-methods-use-this': 'warn', // Методы класса должны использовать this или быть статическими
      
      // Отключить правило unicorn, запрещающее сокращения (props, params и т.д. разрешены)
      'unicorn/prevent-abbreviations': 'off',
      
      // Разрешить классы только со статическими методами
      'unicorn/no-static-only-class': 'off',
      
      // React правила
      'react/no-array-index-key': 'error', // Запретить использование индекса массива в качестве key
      'react/prop-types': 'off', // Отключить проверку PropTypes (для TypeScript или если не используются)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Предупреждать, если экспортируется не компонент (для Fast Refresh)
      ],

      // === Правила импортов для Feature-Sliced Design (FSD) ===
      
      // Сортировка и группировка импортов
      'import/order': [
        'error',
        {
          groups: [
            'builtin',  // Node.js встроенные модули (fs, path, etc)
            'external', // npm пакеты (react, next, etc)
            'internal', // Алиасы проекта (@/app, @/shared, etc)
            'parent',   // Родительские импорты (../)
            'sibling',  // Соседние импорты (./)
            'index',    // Индексные файлы (./)
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before', // React всегда первым среди внешних пакетов
            },
            // Слои FSD в порядке от верхнего к нижнему
            {
              pattern: '@/app/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/views/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/widgets/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/features/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/entities/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/shared/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'], // Исключить из обычной группировки
          'newlines-between': 'never', // Не добавлять пустые строки между группами
          alphabetize: {
            order: 'asc', // Сортировать импорты по алфавиту (возрастание)
            caseInsensitive: true, // Игнорировать регистр при сортировке
          },
        },
      ],
      
      'import/first': 'error', // Все импорты должны быть в начале файла
      'import/newline-after-import': 'error', // Пустая строка после блока импортов
      'import/no-duplicates': 'error', // Запретить дублирование импортов из одного модуля
      'import/no-useless-path-segments': 'error', // Запретить лишние сегменты в путях (./../foo вместо ../foo)
    },
  },
  // Дополнительные правила только для JSX/TSX файлов
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'no-console': 'warn', // Предупреждать о console.log в компонентах
    },
  },
];