import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, "DB-PI-III.db"));

db.pragma("journal_mode = WAL");
const migrarPedidos = () => {
  const colunas = db.pragma("table_info(Pedidos)").map((c) => c.name);

  if (!colunas.includes("StatusPagamento")) {
    db.exec(
      `ALTER TABLE Pedidos ADD COLUMN StatusPagamento TEXT DEFAULT 'pendente'`
    );
    console.log("Coluna StatusPagamento adicionada.");
  }
  if (!colunas.includes("MetodoPagamento")) {
    db.exec(`ALTER TABLE Pedidos ADD COLUMN MetodoPagamento TEXT`);
    console.log("Coluna MetodoPagamento adicionada.");
  }
  if (!colunas.includes("MpPaymentId")) {
    db.exec(`ALTER TABLE Pedidos ADD COLUMN MpPaymentId TEXT`);
    console.log("Coluna MpPaymentId adicionada.");
  }
};

migrarPedidos();

export default db;
