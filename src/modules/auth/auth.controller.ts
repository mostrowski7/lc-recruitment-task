import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.endpoints';
import GenerateKeyPairResponse from './dto/GenerateKeyPairResponse';
import LoginDto from './dto/LoginDto';
import LoginResponse from './dto/LoginResponse';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserInRequest } from './types';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiTags('API')
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: LoginResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'Incorrect password' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('generate-key-pair')
  @ApiBearerAuth()
  @ApiTags('API')
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: GenerateKeyPairResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Cannot generate key pair' })
  async generateKeyPair(@Request() req: UserInRequest) {
    return await this.authService.generateKeyPair(req?.user?.email);
  }
}
