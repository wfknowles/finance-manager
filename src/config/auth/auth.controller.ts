import { Controller, Request, Post, UseGuards, Logger, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {

  private readonly logger: Logger;

  constructor(private service: AuthService) {
    this.logger = new Logger(this.constructor.name);
  }

  // @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    console.log({ req });
    return this.service.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }

  // curl -X POST "http://localhost:3000/v1/api/auth/login" -d '{"username": "admin", "password": "admin"}' -H "Content-Type: application/json"

  // curl "http://localhost:3000/v1/api/auth/user" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjEsImlhdCI6MTY2NDY1NDExOSwiZXhwIjoxNjY0NjU3NzE5fQ.RyoHXPQOFBvu-GuiJ3ayjMcXr29Lc0epYbvwi4aX1YA"

}
