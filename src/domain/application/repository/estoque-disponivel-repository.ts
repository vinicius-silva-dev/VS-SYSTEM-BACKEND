import { EstoqueDisponivel } from "@/domain/entities/estoque-disponivel-entity";
import { Injectable } from "@nestjs/common";



@Injectable()
export abstract class EstoqueDisponivelRepository {
  abstract findAll(): Promise<EstoqueDisponivel[]>
  abstract findByCodProd(CodProd: number): Promise<EstoqueDisponivel | null>
  abstract create(estoque: EstoqueDisponivel): Promise<void>
  abstract save(estoque: EstoqueDisponivel): Promise<void>
  abstract delete(codProd: number): Promise<void>
}