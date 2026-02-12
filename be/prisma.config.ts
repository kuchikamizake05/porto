import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma CLI (migrate, db push) always uses a local SQLite file.
// The runtime app connects to Turso via the libsql adapter in db.ts.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["LOCAL_DATABASE_URL"] || "file:./dev.db",
  },
});
