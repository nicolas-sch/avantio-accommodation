module.exports = {
    transform: {
      '^.+\\.tsx?$': 'ts-jest',  // Para TypeScript
      '^.+\\.jsx?$': 'babel-jest',  // Para JSX com Babel
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      // Isso é útil se você precisar fazer mocks de módulos não-JS
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };
  