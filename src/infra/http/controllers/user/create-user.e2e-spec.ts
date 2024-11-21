import {Test} from '@nestjs/testing'
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import request from 'supertest'

import {beforeAll, describe, expect, it } from 'vitest';
// import { PrismaService } from '@/infra/database/prisma/prisma.service';
// import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('[POST] Create user', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    
    app = moduleRef.createNestApplication()    
  
    await app.init()
  });
  it('Deve ser possivel criar um usuário', async () => {
    const user = await request(app.getHttpServer()).post('/user').send({
      name: 'Vinicius Silva Souza',
      username: 'vinicius.silva',
	    email: 'suporteti_jr@gmail.com',
	    password: '123456',
	    role: 'admin'
    })
 
    expect(user.statusCode).toEqual(201)

  })
})