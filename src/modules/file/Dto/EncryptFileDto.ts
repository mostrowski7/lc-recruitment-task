import { ApiProperty } from '@nestjs/swagger';

export default class EncryptFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to encrypt with pdf extension',
  })
  file: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Public key file with pem format and extension',
  })
  key: string;
}
