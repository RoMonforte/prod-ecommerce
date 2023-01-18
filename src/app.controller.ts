import { Controller, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key.guard';




@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
