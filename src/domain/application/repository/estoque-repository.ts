import { Injectable } from "@nestjs/common";
import { Estoque } from "@/domain/entities/estoque-area-venda-entity";


@Injectable()
export abstract class EstoqueRepository {
  abstract findAll(): Promise<Estoque[]>
  abstract findByCodProd(CodProd: number): Promise<Estoque | null>
  abstract create(estoque: Estoque): Promise<void>
  abstract save(estoque: Estoque): Promise<void>
  abstract delete(codProd: number): Promise<void>
}