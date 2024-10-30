import { User } from "src/domain/entities/user-entiity";
import { UserRepository } from "../../repository/user-repository";
import { Injectable } from "@nestjs/common";

interface DeleteUserRequest {
  id: string
}

type DeleteUserResponse = {
  user: User
}

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private userRepository: UserRepository
  ) { }

  async execute({
    id,
  }: DeleteUserRequest): Promise<DeleteUserResponse> {

    const user = await this.userRepository.findById(id)
    
    if (!user) {
      throw new Error('User not found !')
    }

    await this.userRepository.delete(id)

    return {
      user
    }
  }
}