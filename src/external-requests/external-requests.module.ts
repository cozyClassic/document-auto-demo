import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExternalRequestService } from './external-requests.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [ExternalRequestService],
  exports: [ExternalRequestService],
})
export class ExternalRequestModule {}
