module.exports = {
  name: 'auth-admin-api',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/auth-admin-api',
  setupFiles: ['./test/environment.jest.ts'],
  setupFilesAfterEnv: ['./test/setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.spec.json',
    },
  },
}
