import { Controller,Post, Body,Get,UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from '../entities/users.entity';
import { GetUser } from '../decorators/GetUser';


@Controller('signer-login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.authService.create(createUserDto);
  }

  
  
 


}
