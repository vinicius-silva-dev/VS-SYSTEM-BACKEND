import {Test} from '@nestjs/testing'
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import request from 'supertest'
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import {beforeAll, describe, expect, it } from 'vitest';
import { sign } from 'jsonwebtoken';
// import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('[GET] Fetch user', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule, DatabaseModule],
      }).compile();
    
    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    
  
    await app.init()
  });
  it('Deve ser possivel lista todos os usuários', async () => {
  
    const user = await prisma.user.create({
      data: {
        name: 'Vinicius Silva Souza',
        username: 'vinicius.silva',
        email: 'viniciusvss120@gmail.com',
        password: '123456',
        role: 'admin'
      }
    })

    const accessToken = sign({sub: user.id}, process.env.SECRET_KEY)
    const listUser = await request(app.getHttpServer())
    .get('/user')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    
  
    expect(listUser.statusCode).toEqual(200)

    // const findUser = await prisma.user.findUnique({ where:{id: user.id} })
    // console.log('pass',findUser)

  })
})