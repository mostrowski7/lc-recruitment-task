import { ApiProperty } from '@nestjs/swagger';

export default class LoginResponse {
  @ApiProperty({ default: 'eyJhbGciO...' })
  authToken: string;
}
