import { Injectable } from '@nestjs/common';
import { createCipheriv, publicEncrypt, randomBytes } from 'crypto';

@Injectable()
export class FileService {
  async encryptFile(files: {
    file: Express.Multer.File[];
    key: Express.Multer.File[];
  }): Promise<{ key: string; data: string }> {
    const publicKey: Express.Multer.File = Object.assign({}, ...files.key);
    const file: Express.Multer.File = Object.assign({}, ...files.file);
    const formattedPublicKey = publicKey.buffer
      .toString()
      .replace(/\\n/g, '\n');
    const { encryptedData, symmetricKey } = this.aesEncrypt(file.buffer);
    const encryptedSymmetricKey = this.rsaEncrypt(
      formattedPublicKey,
      symmetricKey,
    );
    return {
      key: encryptedSymmetricKey.toString('base64'),
      data: encryptedData.toString('base64'),
    };
  }

  aesEncrypt(data: Buffer): { encryptedData: Buffer; symmetricKey: Buffer } {
    const key = randomBytes(32);
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const encryptedData = cipher.update(data);
    cipher.final();
    return { encryptedData, symmetricKey: key };
  }

  rsaEncrypt(publicKey: string, symmetricKey: Buffer): Buffer {
    return publicEncrypt(publicKey, symmetricKey);
  }
}
