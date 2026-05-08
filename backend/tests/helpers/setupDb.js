import db from "../../src/database/db.js";
import bcrypt from "bcryptjs";

export function resetDb() {
  db.exec(`
    DROP TABLE IF EXISTS Pedidos;
    DROP TABLE IF EXISTS ProdutosAdicionais;
    DROP TABLE IF EXISTS Produtos;
    DROP TABLE IF EXISTS Categoria;
    DROP TABLE IF EXISTS Usuarios;

    CREATE TABLE "Categoria" (
      "idCategoria" INTEGER NOT NULL UNIQUE,
      "NomeCategoria" TEXT NOT NULL,
      PRIMARY KEY("idCategoria")
    );

    CREATE TABLE "Produtos" (
      "idProduto" INTEGER NOT NULL UNIQUE,
      "NomeProduto" TEXT NOT NULL,
      "CategoriaProduto" INTEGER NOT NULL,
      "ValorProduto" REAL NOT NULL,
      "ImagemProdutos" TEXT,
      PRIMARY KEY("idProduto")
    );

    CREATE TABLE "ProdutosAdicionais" (
      "idAdicional" INTEGER NOT NULL UNIQUE,
      "NomeProdutoAdicional" TEXT NOT NULL,
      "ValorExtra" REAL NOT NULL,
      "CategoriaProdutoAdicional" INTEGER NOT NULL,
      "ImagemProdutosAdicionais" TEXT,
      PRIMARY KEY("idAdicional")
    );

    CREATE TABLE "Pedidos" (
      "idPedido" INTEGER NOT NULL UNIQUE,
      "NomeCliente" TEXT NOT NULL,
      "NomeProdutoPedido" TEXT NOT NULL,
      "ValorFinalPedido" REAL NOT NULL,
      "DataPedido" DATETIME DEFAULT CURRENT_TIMESTAMP,
      "Observacoes" TEXT,
      PRIMARY KEY("idPedido")
    );

    CREATE TABLE "Usuarios" (
      "idUsuario" INTEGER NOT NULL UNIQUE,
      "Nome" TEXT NOT NULL,
      "e-mail" TEXT NOT NULL,
      "senha" TEXT NOT NULL UNIQUE,
      PRIMARY KEY("idUsuario")
    );
  `);
}

export function seedDb() {
  // Categorias
  db.prepare(
    "INSERT INTO Categoria (idCategoria, NomeCategoria) VALUES (?, ?)",
  ).run(1, "BIG");
  db.prepare(
    "INSERT INTO Categoria (idCategoria, NomeCategoria) VALUES (?, ?)",
  ).run(2, "Bebidas");

  // Produtos
  db.prepare(
    `INSERT INTO Produtos
     (idProduto, NomeProduto, CategoriaProduto, ValorProduto, ImagemProdutos)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(1, "BIG X-bacon", 1, 25.0, null);

  db.prepare(
    `INSERT INTO Produtos
     (idProduto, NomeProduto, CategoriaProduto, ValorProduto, ImagemProdutos)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(2, "Coca-Cola", 2, 7.0, null);

  // Admin com senha "senha123" hasheada
  const senhaHash = bcrypt.hashSync("senha123", 10);
  db.prepare(
    `INSERT INTO Usuarios (idUsuario, Nome, "e-mail", senha)
     VALUES (?, ?, ?, ?)`,
  ).run(1, "Admin Teste", "admin@teste.com", senhaHash);
}
