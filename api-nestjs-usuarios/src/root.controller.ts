import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  @Get()
  root() {
    return { message: 'API Usuarios (Nest) — OK', status: 'running' };
  }
}
