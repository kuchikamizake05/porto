import { PrismaClient } from "./generated/prisma/index.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import "dotenv/config";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

export default prisma;
