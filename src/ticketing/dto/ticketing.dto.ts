import { IsNotEmpty, IsString } from 'class-validator';

export class TicketingDto {
  @IsString()
  @IsNotEmpty({ message: '예매할 날짜를 입력해주세요.' })
  date: string;
}