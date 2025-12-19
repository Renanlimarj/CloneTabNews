//Na aula do dia 24, criamos esse arquivo pra configurar o jest com o next.js

const nextJest = require("next/jest");

const createJestConfig = nextJest();
const jestConfig = createJestConfig({
    moduleDirectories: ["node_modules", "<rootDir>"],
});


module.exports = jestConfig;
