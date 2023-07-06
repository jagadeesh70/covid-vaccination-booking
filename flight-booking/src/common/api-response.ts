export class ApiResponse<T> {
  constructor(
    public data: T,
    public message: string = 'Success',
    public status: number = 200,
  ) {}
}
