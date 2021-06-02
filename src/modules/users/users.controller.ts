import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersCreateDTO } from './dto/users-crate.dto';
import { UsersUpdateDTO } from './dto/users-update.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() body: UsersCreateDTO): Promise<User> {
    return this.userService.create(body);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.userService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UsersUpdateDTO,
  ): Promise<{ message: string }> {
    return this.userService.update(id, data);
  }
}
