import {describe, it} from 'vitest'
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@/app.module';
import { Test } from '@nestjs/testing'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module';
import { user } from 'test/util/create-user-test';
// import { login } from 'test/util/login-test';
import { sign } from 'jsonwebtoken';

describe('[POST] Criar produto', () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async() => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();
  
    app = moduleRef.createNestApplication()    
    prisma = moduleRef.get(PrismaService)
    
    await app.init()
  })
  it('Deve ser possíver criar um produto', async () => {
    const createUser =  await user()
    await prisma.user.create({
      data: createUser
    })
    
    const token = await sign({id: createUser.id}, process.env.SECRET_KEY)
    const produto = await request(app.getHttpServer())
      .post('/produto')
      .set('Authorization', `Bearer ${token}`)
      .send({
        codigo: 1,
        codigoBarras: 123456789,
        codigoNcm: 254123,
        descricao: "Chinelo Coca-Cola TAM 42",
        categoria: "Calçado",
        ativo: true,
        tipoProduto: "Revenda",
        unidadeMedida: "UN",
        custoMercadoria: "40,00",
        precoVenda: "80,00",
        estoqueInicial: 30,
      })

      expect(produto.statusCode).toEqual(201)
      expect(
        await prisma.produto.findFirst({
          where: {
            codProd: 1 
          }
        })
      ).toEqual(
        expect.objectContaining({
          descricao: "Chinelo Coca-Cola TAM 42",
        })
      )
  })
})