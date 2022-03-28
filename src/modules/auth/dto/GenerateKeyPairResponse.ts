import { ApiProperty } from '@nestjs/swagger';

export default class GenerateKeyPairResponse {
  @ApiProperty({ default: '-----BEGIN RSA PUBLIC KEY-----...' })
  publicKey: string;

  @ApiProperty({ default: '-----BEGIN ENCRYPTED PRIVATE KEY-----...' })
  privateKey: string;
}
