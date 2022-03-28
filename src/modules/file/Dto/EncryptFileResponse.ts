import { ApiProperty } from '@nestjs/swagger';

export default class EncryptFileResponse {
  @ApiProperty({ default: 'cSC17K+9MU...' })
  key: string;

  @ApiProperty({ default: '0Bo7fkcNSPHva...' })
  data: string;
}
