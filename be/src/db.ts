import { createRequire } from "module";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import "dotenv/config";

const require = createRequire(import.meta.url);
const { PrismaClient } = require("./generated/prisma/index.js");

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

export default prisma;
