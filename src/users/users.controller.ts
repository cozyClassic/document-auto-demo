import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async save(@Body() createUserDto: CreateUserDto) {
    this.userService.save(createUserDto);
  }

  @Get('/workers/')
  async getFindAllWorkers() {
    return this.userService.findAllWorkers();
  }
}
