import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}
  @Get()
  async allPermissions() {
    return this.permissionService.all();
  }
  @Post()
  async createRole(@Body('name') name: string) {
    return this.permissionService.createPermission({ name });
  }
}
