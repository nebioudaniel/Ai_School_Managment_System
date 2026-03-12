// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "@prisma/config";

export default defineConfig({
  // This tells Prisma where to find the file from the root
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DIRECT_URL"), // Use DIRECT_URL for migrations
  },
});
