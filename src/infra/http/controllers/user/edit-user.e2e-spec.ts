import {Test} from '@nestjs/testing'
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import request from 'supertest'
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import {beforeAll, describe, expect, it } from 'vitest';
import { sign } from 'jsonwebtoken';
// import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('[PUT] Edit user', () => {
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
  it('Deve ser possivel editar um usuário', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Vinicius Silva Souza',
        username: 'vinicius.silva',
        email: 'viniciusvss120@gmail.com',
        password: '123456',
        role: 'padrao'
      }
    })

    // console.log('pass 3 ',user)
    const accessToken = sign({sub: user.id}, process.env.SECRET_KEY)
  
    const editUser = await request(app.getHttpServer())
    .put(`/user/${user.id}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      email: 'viniciusvss120@gmail.com',
      password: '654321',
      role: 'padrao'
    })
    
    expect(editUser.statusCode).toEqual(201)


  })
})