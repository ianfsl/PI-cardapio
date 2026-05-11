import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { resetDb, seedDb } from "./helpers/setupDb.js";

async function obterToken() {
  const response = await request(app).post("/api/admin/login").send({
    email: "admin@teste.com",
    senha: "senha123",
  });
  return response.body.token;
}

describe("GET /api/produtos", () => {
  beforeEach(() => {
    resetDb();
    seedDb();
  });

  it("deve retornar lista de produtos com status 200", async () => {
    // Act
    const response = await request(app).get("/api/produtos");

    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("NomeProduto");
    expect(response.body[0]).toHaveProperty("NomeCategoria");
  });
});

describe("GET /api/produtos/:id", () => {
  beforeEach(() => {
    resetDb();
    seedDb();
  });

  it("deve retornar produto existente com status 200", async () => {
    // Act
    const response = await request(app).get("/api/produtos/1");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.idProduto).toBe(1);
    expect(response.body.NomeProduto).toBe("BIG X-bacon");
    expect(response.body.NomeCategoria).toBe("BIG");
  });

  it("deve retornar 404 quando produto não existe", async () => {
    // Act
    const response = await request(app).get("/api/produtos/999");

    // Assert
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});

describe("POST /api/produtos", () => {
  beforeEach(() => {
    resetDb();
    seedDb();
  });

  it("deve retornar 401 quando token não é fornecido", async () => {
    // Arrange
    const novoProduto = {
      nomeProduto: "BIG X-tudo",
      valorProduto: 30.0,
      categoriaId: 1,
      imagem: null,
    };

    // Act
    const response = await request(app).post("/api/produtos").send(novoProduto);

    // Assert
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  it("deve criar produto quando token é válido", async () => {
    // Arrange
    const token = await obterToken();
    const novoProduto = {
      nomeProduto: "BIG X-tudo",
      valorProduto: 30.0,
      categoriaId: 1,
      imagem: null,
    };

    // Act
    const response = await request(app)
      .post("/api/produtos")
      .set("Authorization", `Bearer ${token}`)
      .send(novoProduto);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.message).toBeDefined();
  });
});
