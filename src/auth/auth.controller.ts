import {
  Controller,
  Request,
  Body,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtGuard } from 'src/guards/jwt-auth.guard';
import { Me } from 'src/guards/me.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authService.sign(req.user);
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  profile(@Me() me) {
    return me;
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }
}
