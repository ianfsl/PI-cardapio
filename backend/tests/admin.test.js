import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { resetDb, seedDb } from "./helpers/setupDb.js";

describe("POST /api/admin/login", () => {
  beforeEach(() => {
    resetDb();
    seedDb();
  });

  it("deve retornar token JWT com credenciais corretas", async () => {
    // Arrange
    const credenciais = {
      email: "admin@teste.com",
      senha: "senha123",
    };

    // Act
    const response = await request(app)
      .post("/api/admin/login")
      .send(credenciais);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
    expect(response.body.token.length).toBeGreaterThan(0);
  });

  it("deve retornar 401 com credenciais incorretas", async () => {
    // Arrange
    const credenciais = {
      email: "admin@teste.com",
      senha: "senha_errada",
    };

    // Act
    const response = await request(app)
      .post("/api/admin/login")
      .send(credenciais);

    // Assert
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });
});
