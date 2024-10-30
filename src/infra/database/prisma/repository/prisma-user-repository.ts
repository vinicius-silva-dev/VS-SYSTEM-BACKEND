// import { PrismaClient } from "@prisma/client";
import { UserRepository } from "@/domain/application/repository/user-repository"
import { PrismaUserMappers } from "../mappers/prisma-user-mappers"
import { User } from "src/domain/entities/user-entiity"
import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"


// const prisma = new PrismaClient()

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private prisma: PrismaService
  ) {}


  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id
        }
      })

      return PrismaUserMappers.toDomain(user)
    } catch (error) {
      console.log('err',error)
    }



  }


  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    if (!users) {
      return null
    }

    return users.map(PrismaUserMappers.toDomain)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return null
    }

    return PrismaUserMappers.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = await PrismaUserMappers.toPrisma(user)
    const createUser = await this.prisma.user.create({
      data
    })

    if(!createUser) {
      throw new Error('Falha ao criar usuário ')
    }

  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMappers.toPrisma(user)
    const result = await this.prisma.user.update({
      where: {
        id: user.id.toString()
      },
      data
    })

    if(!result) {
      throw new Error('Falha ao editar usuário.')
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.prisma.user.delete({
      where: {
        id
      }
    })

    if(!result) {
      throw new Error('Falha ao editar usuário.')
    }
  }


}