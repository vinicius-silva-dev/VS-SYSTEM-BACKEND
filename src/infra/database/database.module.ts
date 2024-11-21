import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "@/domain/application/repository/user-repository";
import { PrismaUserRepository } from "./prisma/repository/prisma-user-repository";
import { ProdutoRepository } from "@/domain/application/repository/product-repository";
import { PrismaProdutoRepository } from "./prisma/repository/prisma-produto-repository";

@Module({
  providers: [
    PrismaService,

    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    },
    {
      provide: ProdutoRepository,
      useClass: PrismaProdutoRepository
    }
  ],
  exports: [
    PrismaService,
    UserRepository,
    ProdutoRepository
  ]
})
export class DatabaseModule { }