import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersCreateDTO } from './dto/users-crate.dto';
import { UsersUpdateDTO } from './dto/users-update.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ cpf, email, name, password }: UsersCreateDTO) {
    try {
      const user = this.usersRepository.create({
        cpf,
        email,
        name,
        password,
      });

      return this.usersRepository.save(user);
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOne(id);

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, data: UsersUpdateDTO): Promise<{ message: string }> {
    try {
      const user = await this.usersRepository.findOne(id);

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      await this.usersRepository.update(id, data);

      return { message: 'Atualizado com sucesso' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      const user = await this.usersRepository.findOne(id);

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      await this.usersRepository.softDelete(id);

      return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
