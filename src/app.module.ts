import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WakaTimeModule } from './waka-time/waka-time.module';
import { WakaTimeService } from './waka-time/waka-time.service';

@Module({
  imports: [WakaTimeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
