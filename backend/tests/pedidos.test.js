import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { resetDb, seedDb } from "./helpers/setupDb.js";

describe("POST /api/pedidos", () => {
  beforeEach(() => {
    resetDb();
    seedDb();
  });

  it("deve criar pedido com status 201", async () => {
    // Arrange
    const novoPedido = {
      nomeCliente: "João Silva",
      itens: [
        {
          quantidade: 1,
          nomeProduto: "X-bacon",
          categoria: "BIG",
          adicionais: [],
        },
        {
          quantidade: 2,
          nomeProduto: "Coca-Cola",
          categoria: "Bebidas",
          adicionais: [],
        },
      ],
      valorTotal: 39.0,
      observacoes: "Sem cebola",
    };

    // Act
    const response = await request(app).post("/api/pedidos").send(novoPedido);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("idPedido");
    expect(response.body.sucesso).toBe(true);
  });
});

describe("GET /api/pedidos/:id", () => {
  beforeEach(() => {
    resetDb();
    seedDb();
  });

  it("deve retornar pedido criado com status 200", async () => {
    // Arrange: cria um pedido primeiro pra ter o que buscar
    const novoPedido = {
      nomeCliente: "Maria Oliveira",
      itens: [
        {
          quantidade: 1,
          nomeProduto: "X-bacon",
          categoria: "BIG",
          adicionais: [],
        },
      ],
      valorTotal: 25.0,
    };
    const criacao = await request(app).post("/api/pedidos").send(novoPedido);
    const idPedido = criacao.body.idPedido;

    // Act
    const response = await request(app).get(`/api/pedidos/${idPedido}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.idPedido).toBe(idPedido);
    expect(response.body.NomeCliente).toBe("Maria Oliveira");
    expect(response.body.ValorFinalPedido).toBe(25.0);
  });
});
