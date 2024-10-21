module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios).+\\.js$',
    ],
    moduleFileExtensions: ['js', 'jsx'],
  };
  