import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decoraors/skip-auth.decorator';
import { AdminLogInReqDto } from './dto/admin.log-in.req.dto';
import { AdminService } from './services/admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiUnauthorizedResponse()
  @SkipAuth()
  @Post('login')
  public async logIn(@Body() dto: AdminLogInReqDto): Promise<any> {
    return await this.adminService.logIn(dto);
  }
}
