import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgresurl: process.env.DATABASE_URL,
    postgres: {
      dbName: process.env.POSTGRES_DB,
      dbUser: process.env.POSTGRES_USER,
      dbPassword: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
