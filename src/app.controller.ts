import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { WakaTimeService } from './waka-time/waka-time.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly wakaService: WakaTimeService
  ) 
  {

  }

  @Get('authenticate')
  getAuthenticate()
  {
    this.wakaService.authenticate();
    return 'naosei'
  }

  @Get('authorize')
  getAuthorize(@Query('code') code: string): string 
  {

    let tst = this.wakaService.authorize(code)
      .then(resp => {
        const { access_token, expires_at, expires_in, refresh_token } = resp.data;

        console.log(resp);
      })
      .catch(resp => {

        console.log(resp.data);
      })

    return "pleeeei";
  }

  @Get()
  getHello(): string {
    let test = this.wakaService
      .allTimeSinceToday()
      .then(data => {
        console.log(data);
      })
      .catch(data => {
        console.log(data.response);
      })

    return this.appService.getHello();
  }
}
