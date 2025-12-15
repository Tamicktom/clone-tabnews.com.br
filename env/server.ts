//* Libraries imports
import z from 'zod';

const databasetEnvSchema = z.object({
  POSTGRES_HOST: z.string().min(1, 'POSTGRES_HOST is required'),
  POSTGRES_PORT: z.coerce.number().default(5432),
  POSTGRES_USER: z.string().min(1, 'POSTGRES_USER is required'),
  POSTGRES_PASSWORD: z.string().min(1, 'POSTGRES_PASSWORD is required'),
  POSTGRES_DB: z.string().min(1, 'POSTGRES_DB is required'),
  DATABASE_URL: z.string(),
});

const serverEnvSchema = z.object({
  ...databasetEnvSchema.shape,
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const env = serverEnvSchema.parse(process.env);