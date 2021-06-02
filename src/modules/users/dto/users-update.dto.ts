import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UsersUpdateDTO {
  @MaxLength(255, {
    message: 'A quantidade máxima de caracteres para o campo nome foi excedido',
  })
  @IsString({ message: 'O campo nome precisa ser uma cadeia de caracteres' })
  @IsOptional()
  name?: string;

  @MaxLength(255, {
    message:
      'A quantidade máxima de caracteres para o campo email foi excedido',
  })
  @IsString({ message: 'O campo email precisa ser uma cadeia de caracteres' })
  @IsOptional()
  email?: string;

  @MaxLength(11, {
    message: 'A quantidade máxima de caracteres para o campo CPF foi excedido',
  })
  @IsString({ message: 'O campo CPF precisa conter apenas números' })
  @IsOptional()
  cpf?: string;
}
