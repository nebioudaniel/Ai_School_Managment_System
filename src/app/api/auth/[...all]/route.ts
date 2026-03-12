import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/adapters/nextjs";

export const { POST, GET } = toNextJsHandler(auth);
