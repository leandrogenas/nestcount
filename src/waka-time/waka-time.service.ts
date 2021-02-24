import { HttpException, HttpService, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

@Injectable()
export class WakaTimeService 
{
  private URL_BASE: string = 'https://wakatime.com/api/v1/';

  protected secret: string;
  protected refresh: string;
  protected appId: string;
  protected access: string;


  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  )
  {
    this.appId = configService.get<string>('WAKA_APPID');
    this.secret = configService.get<string>('WAKA_SECRET');
    this.refresh = configService.get<string>('WAKA_REFRESH');
    this.access = configService.get<string>('WAKA_ACCESS');
  }

  authenticate()
  {
    const open = require('open');

    let params = new URLSearchParams()
    params.append('client_id', this.appId);
    params.append('response_type', 'code');
    params.append('redirect_uri', 'http://localhost:3000/authorize');
    params.append('scope', 'read_logged_time');

    console.log(params.toString());

    open(`https://wakatime.com/oauth/authorize?${params.toString()}`)
  }

  authorize(code: string): Promise<AxiosResponse> 
  {
    if(code === undefined)
      throw new HttpException('Código não informado', HttpStatus.BAD_REQUEST);

      console.log(code);
    const params = new URLSearchParams()
    params.append('client_id', this.appId)
    params.append('client_secret', this.secret)
    params.append('redirect_uri', 'http://localhost:3000/authorize')
    params.append('grant_type', 'authorization_code')
    params.append('code', code)

    return this.httpService
      .post('https://wakatime.com/oauth/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .toPromise();
    
  }

  allTimeSinceToday(): Promise<AxiosResponse>
  {
    return this.httpService
      .get(this.URL_BASE + 'users/current/all_time_since_today', {
        headers: {
          'Authorization': `Bearer ${this.access}`
        }
      })
      .toPromise();
  }

  

}
