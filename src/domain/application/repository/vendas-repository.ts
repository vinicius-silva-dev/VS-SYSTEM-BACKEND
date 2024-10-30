import { Injectable } from "@nestjs/common";
import { Vendas } from "src/domain/entities/venda-entity";


@Injectable()
export abstract class VendasRepository {
  // abstract findAll(): Promise<Vendas[]>
  abstract findById(id: string): Promise<Vendas | null>
  abstract create(vendas: Vendas): Promise<void>
  abstract save(vendas: Vendas): Promise<void>
  // abstract delete(id: string): Promise<void>
}