import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // Production: Create new client with libSQL adapter
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL || "",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  
  prisma = new PrismaClient({ adapter });
} else {
  // Development: Reuse existing client to prevent connection exhaustion
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaLibSql({
      url: process.env.DATABASE_URL || "file:./dev.db",
      authToken: process.env.DATABASE_AUTH_TOKEN,
    });
    
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  prisma = globalForPrisma.prisma;
}

export default prisma;
