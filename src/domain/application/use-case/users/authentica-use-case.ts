import { UserRepository } from "@/domain/application/repository/user-repository";
import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
import {sign} from 'jsonwebtoken'
import { compare } from "bcrypt";

// Esse caso de uso não etá sendo utilizado no momento

interface AuthenticateRequest {
  email: string
  password: string
}

type AuthenticateResponse = {
  token: string
}

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private userRepository: UserRepository
  ) { }

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {

    const user = await this.userRepository.findByEmail(email)
    
    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    const validarSenha = await compare(password, user.password)

    if (!validarSenha) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, username: user.name }
    const token = await sign(payload, process.env.SECRET_KEY, {
      expiresIn: '10h'
    })

    return {
      token
    }
  }
}