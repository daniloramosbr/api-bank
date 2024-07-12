import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

prisma.$connect()
  .then(() => {
    console.log('conectado ao banco de dados!');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o Prisma:', error.message);
  })