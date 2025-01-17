module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  transformIgnorePatterns: ['/node_modules/(?!@vue)'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  globals: {
    'vue-jest': {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'transition'
      }
    }
  }
} 