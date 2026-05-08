import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      NODE_ENV: "test",
      JWT_SECRET: "test_secret_para_jwt_nos_testes",
    },
    globals: false,
    pool: "forks",
  },
});
