import { HttpException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: '0e285638-75d1-4a96-a385-aa732fe260a9',
      email: 'example1@gmail.com',
      password: '$2b$10$wd2FKgUyIztkelRHpkX7RuJN2ZgVMFBTr/BABiaqkSzDs3eZR9YWO',
    },
    {
      id: 'e6b4f29f-6641-44f7-b9f5-1405acd53c11',
      email: 'example2@gmail.com',
      password: '$2b$10$wd2FKgUyIztkelRHpkX7RuJN2ZgVMFBTr/BABiaqkSzDs3eZR9YWO',
    },
  ];

  async findOne(email: string): Promise<User> {
    const userRow = this.users.find((user) => user.email === email);
    if (!userRow) throw new HttpException('User not found', 404);
    return userRow;
  }
}
