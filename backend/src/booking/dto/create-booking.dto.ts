import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  flightId: number;

  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  seatNo: number;
}
