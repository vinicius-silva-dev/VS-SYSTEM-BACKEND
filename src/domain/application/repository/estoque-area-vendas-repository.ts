import { Injectable } from "@nestjs/common";
import { EstoqueAreaVendas } from "@/domain/entities/estoque-area-venda-entity";


@Injectable()
export abstract class EstoqueAreaVendasRepository {
  abstract findAll(): Promise<EstoqueAreaVendas[]>
  abstract findByCodProd(CodProd: number): Promise<EstoqueAreaVendas | null>
  abstract create(estoque: EstoqueAreaVendas): Promise<void>
  abstract save(estoque: EstoqueAreaVendas): Promise<void>
  abstract delete(codProd: number): Promise<void>
}