//Na aula do dia 24, criamos esse arquivo pra configurar o jest com o next.js

process.env.NODE_ENV = "development";
const dotenv = require("dotenv");
dotenv.config({
    path: ".env.development",
});


const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: ".",
});
const jestConfig = createJestConfig({
    moduleDirectories: ["node_modules", "<rootDir>"],
});


module.exports = jestConfig;
