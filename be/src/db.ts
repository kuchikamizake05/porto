import prismaModule from "./generated/prisma/index.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import "dotenv/config";

const PrismaClient = prismaModule.PrismaClient;

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

export default prisma;
