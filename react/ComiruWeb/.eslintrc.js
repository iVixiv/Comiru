module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "commonjs": true
  },
  "extends": "airbnb",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 9,
    "ecmaFeatures": {
      "arrowFunctions": true,
      "jsx": true,
      "modules": true
    },
    "sourceType": "module"
  },
  "globals": {
    "document": true,
    "navigator": true,
    "window": true,
    "node": true
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "comma-dangle": ["error", "never"],
    "no-multiple-empty-lines": [1, {
      "max": 2
    }],
    "strict": 0,
    "valid-jsdoc": 2,
    "react/jsx-uses-react": 2,
    "react/react-in-jsx-scope": 2,
    "react/prop-types": 0,
    "react/jsx-uses-vars": [2],
    "no-console": 0,
    "react/forbid-prop-types": 0,
    "react/destructuring-assignment": [1, 'always'],
    "linebreak-style": [0, "error", "windows"],
    "react/jsx-one-expression-per-line": "off"
  }
};