import { UserRepository } from "@/domain/application/repository/user-repository";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";

interface AuthenticateRequest {
  email: string
  password: string
}


@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<{ access_token: string }> {

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    const validarSenha = await compare(password, user.password)

    if (!validarSenha) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, username: user.name }
    const token = await this.jwtService.signAsync(payload)

    return {
      access_token: token
    }
  }
}