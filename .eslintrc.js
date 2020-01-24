module.exports = {
  extends: "prettier",
  env: {
    browser: true
  },
  parser: "babel-eslint",
  plugins: ["babel"],
  rules: {
    "babel/semi": 1
  }
};
