import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { resetDb, seedDb } from "./helpers/setupDb.js";

describe("GET /api/categorias", () => {
  beforeEach(() => {
    // Arrange
    resetDb();
    seedDb();
  });

  it("deve retornar lista de categorias com status 200", async () => {
    // Act
    const response = await request(app).get("/api/categorias");

    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("NomeCategoria");
  });
});
