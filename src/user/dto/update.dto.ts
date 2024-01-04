import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsNotEmpty({ message: '바꿀 이름을 입력해 주세요, ' })
  name: string;
}