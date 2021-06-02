import { IsInt, IsNotEmpty, MaxLength } from 'class-validator';

export class UsersCreateDTO {
  @MaxLength(255, {
    message: 'O tamanho máximo de 255 caracteres foi excedido',
  })
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  name: string;

  @MaxLength(11, {
    message: 'O tamanho máximo de 11 caracteres foi excedido',
  })
  @IsNotEmpty({ message: 'O campo CPF é obrigatório' })
  cpf: string;

  @IsNotEmpty({ message: 'O campo e-mail é obrigatório ' })
  email: string;

  @IsNotEmpty({ message: 'O campo password é obrigatório' })
  password: string;
}
