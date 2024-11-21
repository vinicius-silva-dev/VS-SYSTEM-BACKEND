// import { PrismaClient } from "@prisma/client";

import { PrismaProdutoMappers } from "../mappers/prisma-produto-mappers"

import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { ProdutoRepository } from "@/domain/application/repository/product-repository"
import { Produto } from "@/domain/entities/produto-entity"


// const prisma = new PrismaClient()

@Injectable()
export class PrismaProdutoRepository implements ProdutoRepository {
  constructor(
    private prisma: PrismaService
  ) {}

  async findById(id: string): Promise<Produto | null> {
    try {
      const produto = await this.prisma.produto.findUnique({
        where: {
          id
        }
      })

      return PrismaProdutoMappers.toDomain(produto)
    } catch (error) {
      console.log('err',error)
    }



  }

  async findAll(): Promise<Produto[]> {
    const produtos = await this.prisma.produto.findMany()

    if (!produtos) {
      return null
    }

    return produtos.map(PrismaProdutoMappers.toDomain)
  }

  async findByCodProd(codProd: number): Promise<Produto | null> {
    const produto = await this.prisma.produto.findFirst({
      where: {
        codProd
      }
    })

    if (!produto) {
      return null
    }

    return PrismaProdutoMappers.toDomain(produto)
  }

  async create(produto: Produto): Promise<void> {
    const data = await PrismaProdutoMappers.toPrisma(produto)
  
    const createProduto = await this.prisma.produto.create({
      data
    })

    if(!createProduto) {
      throw new Error('Falha ao criar usuário ')
    }

  }

  async save(produto: Produto): Promise<void> {
    const data = PrismaProdutoMappers.toPrisma(produto)
    const result = await this.prisma.produto.update({
      where: {
        id: produto.id.toString()
      },
      data
    })

    if(!result) {
      throw new Error('Falha ao editar usuário.')
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.prisma.produto.delete({
      where: {
        id
      }
    })

    if(!result) {
      throw new Error('Falha ao editar usuário.')
    }
  }


}