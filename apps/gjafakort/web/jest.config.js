const path = require('path')

module.exports = {
  name: 'gjafakort-web',
  preset: '../../../jest.config.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  moduleNameMapper: {
    '^@island.is/gjafakort-web/(.*)$': path.resolve(__dirname),
  },
  coverageDirectory: '../../../coverage/apps/gjafakort/web',
  setupFiles: ['./jest.setup.js'],
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
}
