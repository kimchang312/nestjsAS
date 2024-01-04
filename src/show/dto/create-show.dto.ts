import { IsArray, IsNotEmpty, IsString, isNotEmpty } from 'class-validator';


export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '공연 내용를 입력해주세요.' })
  description: string;

  @IsArray()
  @IsNotEmpty({ message: "공연 날짜를 최소 하루는 입력해 주세요" })
  showDate: string[];
   
  @IsString()
  @IsNotEmpty({ message: '공연 할 장소를 입력해주세요.' })
  showLocation: string;
  
  @IsString()
  @IsNotEmpty({ message: '공연 좌석이 몇석 인지를 입력해주세요.' })
  seatImformation: number;

  @IsString()
  @IsNotEmpty({ message: '공연 좌석이 얼마인지를 입력해주세요.' })
  seatPoint: number;

  @IsString()
  @IsNotEmpty({ message: '공연 종류를 입력해주세요.' })
  showCategory: string;

  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
  showImg: string;

}