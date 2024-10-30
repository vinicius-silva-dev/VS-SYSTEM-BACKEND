import 'dotenv'
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  SECRET_KEY: z.string()
})

export type Env = z.infer<typeof envSchema>