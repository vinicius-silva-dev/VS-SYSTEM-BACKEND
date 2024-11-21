import { AppModule } from "@/app.module"
import { DatabaseModule } from "@/infra/database/database.module"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { sign } from "jsonwebtoken"
import request from 'supertest'
import { user } from "test/util/create-user-test"

describe('[DELETE] Delete produto', () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule]
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    app.init()
  })
  it('Deve ser possível deletar um produto', async () => {
    const produto = await prisma.produto.create({
      data: {
        codProd: 1,
        codBarras: 123456789,
        codNcm: 254123,
        descricao: "Camisa Regata Petti TAM G",
        categoria: "Confeccao",
        ativo: true,
        tipoProd: "Revenda",
        unidadeMedida: "UN",
        custoMercadoria: "10,00",
        precoVenda: "25,00",
        estoqueInicial: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    const createUser =  await user()
    await prisma.user.create({
      data: createUser
    })
    
    const token = await sign({id: createUser.id}, process.env.SECRET_KEY)
    const result = await request(app.getHttpServer())
      .delete(`/produto/${produto.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(result.statusCode).toEqual(204)
    console.log(await prisma.$queryRaw`
      SELECT * 
      FROM produtos
      WHERE cod_prod = ${produto.codProd}
    `)
    expect(
      await prisma.$queryRaw`
        SELECT * 
        FROM produtos
        WHERE cod_prod = ${produto.codProd}
      `
    ).toHaveLength(0)
  })
})