import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }

  const url = new URL(databaseUrl);
  url.searchParams.delete("pgbouncer");
  return url.toString();
}

if (process.env.NODE_ENV === "production") {
  const adapter = new PrismaPg({
    connectionString: getDatabaseUrl(),
  });

  prisma = new PrismaClient({ adapter });
} else {
  // Development: Reuse existing client to prevent connection exhaustion
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaPg({
      connectionString: getDatabaseUrl(),
    });

    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  prisma = globalForPrisma.prisma;
}

export default prisma;
