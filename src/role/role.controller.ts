import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  async allRoles() {
    return this.roleService.all();
  }

  @Post()
  async createRole(
    @Body('name') name: string,
    @Body('permissions') ids: number[],
  ) {
    return this.roleService.create({
      name,
      permissions: ids.map((id) => ({ id })),
    });
  }

  @Get(':id')
  async getRole(@Param('id') id: number) {
    return this.roleService.findOne({ id }, ['permissions']);
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('permissions') ids: number[],
  ) {
    await this.roleService.update(id, {
      name,
    });
    const role = await this.roleService.findOne({ id });

    return this.roleService.create({
      ...role,
      permissions: ids.map((id) => ({ id })),
    });
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: number) {
    return this.roleService.delete(id);
  }
}
