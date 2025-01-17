/* eslint-disable prettier/prettier */
import { config } from 'dotenv'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll } from 'vitest'

config({ path: '.env', override: true})
config({ path: '.env.test', override: true})
const prisma = new PrismaClient()


// O objetivo dessa função é alternar os database de acordo com a url de conexão, aqui vamos transformar o DATABASE_URL em uma url com o new ULR, vamos acessar os parâmetros e trocar pelo schema que for passado para a função.
function generateUniqueDataBaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL enviroment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()

}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDataBaseURL(schemaId)
  
  process.env.DATABASE_URL = databaseURL
  try {
    execSync('npx prisma migrate deploy')
    
  } catch (error) {
    console.log('Deu Ruim', error)
  }
  
  
})

afterAll(async () => {
  try {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
    await prisma.$disconnect()
    
  } catch (error) {
    console.log(error)
  }
 
})