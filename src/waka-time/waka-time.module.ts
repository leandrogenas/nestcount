import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WakaTimeService } from './waka-time.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot()
  ],
  providers: [WakaTimeService],
  exports: [WakaTimeService]
})
export class WakaTimeModule {}
