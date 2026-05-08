import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath =
  process.env.NODE_ENV === "test"
    ? ":memory:"
    : path.join(__dirname, "DB-PI-III.db");

const db = new Database(dbPath);

if (process.env.NODE_ENV !== "test") {
  db.pragma("journal_mode = WAL");
}

export default db;
