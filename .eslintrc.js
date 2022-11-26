module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/vue3-essential', 'airbnb-base'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'max-len': ['error', { code: 120 }],
    semi: ['error', 'never'],
    'import/no-unresolved': 'off',
    'vue/multi-word-component-names': 'off',
  },
}
