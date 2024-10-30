import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repository/user-repository";
import { User } from "src/domain/entities/user-entiity";

interface GetUserByIdRequest {
  id: string
}

type GetUserByIdResponse = {
  users: User
}

@Injectable()
export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id
  }: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    
    const users = await this.userRepository.findById(id)

    if (!users) {
      throw new Error('Users not found!!')
    }

    return {
      users
    }
  }
}