import {Test} from '@nestjs/testing'
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import request from 'supertest'
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import {beforeAll, describe, expect, it } from 'vitest';
import { sign } from 'jsonwebtoken';
// import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('[DELETE] Delete user', () => {
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
  it('Deve ser possivel deletar um usuário', async () => {
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
  
    const editUser = await request(app.getHttpServer())
    .delete(`/user/${user.id}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    
 
    expect(editUser.statusCode).toEqual(204)

    expect(
      await prisma.user.findFirst({
        where:{
          email: 'viniciusvss120@gmail.com'
        } 
      })
    ).toBe(null)

  })
})