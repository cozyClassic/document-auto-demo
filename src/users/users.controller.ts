import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/rolese.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async save(@Body() createUserDto: CreateUserDto) {
    return this.userService.save(createUserDto);
  }

  @Get('/workers/')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async getFindAllWorkers() {
    return this.userService.findAllWorkers();
  }
}
