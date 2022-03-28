import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { generateKeyPair } from 'crypto';
import * as bcrypt from 'bcrypt';
import LoginDto from './dto/LoginDto';
import LoginResponse from './dto/LoginResponse';
import GenerateKeyPairResponse from './dto/GenerateKeyPairResponse';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.userService.findOne(email);
    await this.comparePasswords(password, user.password);
    return user;
  }

  async comparePasswords(plaintext: string, hash: string): Promise<void> {
    const result = await bcrypt.compare(plaintext, hash);
    if (!result) throw new HttpException('Incorrect password', 401);
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const user = await this.validateUser({ email, password });
    return {
      authToken: this.jwtService.sign({ email: user.email }),
    };
  }

  async generateKeyPair(passphrase: string): Promise<GenerateKeyPairResponse> {
    return new Promise((resolve, reject) => {
      generateKeyPair(
        'rsa',
        {
          modulusLength: 2048,
          publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase,
          },
        },
        (err, publicKey, privateKey) => {
          if (err) reject(new HttpException('Cannot generate key pair', 500));
          resolve({ publicKey, privateKey });
        },
      );
    });
  }
}
