export class CreateFlightDto {
  flightNo: string;
  date: Date;
  source: string;
  destination: string;
  availableSeats: number;
}
