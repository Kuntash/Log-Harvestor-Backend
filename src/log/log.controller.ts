import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogBody, GetLogParams } from './log.types';

@Controller('log')
export class LogController {
  constructor(private logService: LogService) {}
  @Post()
  @HttpCode(201)
  createLog(@Body() body: CreateLogBody) {
    return this.logService.create(body);
  }

  @Get()
  @HttpCode(200)
  getLogs(@Query() queryParams: GetLogParams) {
    return this.logService.get(queryParams);
  }
}
