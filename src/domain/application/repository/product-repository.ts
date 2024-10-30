import { Injectable } from "@nestjs/common";
import { Produto } from "src/domain/entities/produto-entity";


@Injectable()
export abstract class ProdutoRepository {
  abstract findAll(): Promise<Produto[]>
  abstract findById(id: string): Promise<Produto | null>
  abstract findByCodProd(codProd: number): Promise<Produto | null>
  abstract create(produto: Produto): Promise<void>
  abstract save(produto: Produto): Promise<void>
  abstract delete(id: string): Promise<void>
}