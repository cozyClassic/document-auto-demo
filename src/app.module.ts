import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // ----------------- 추가 start
      type: 'sqlite',
      database: process.env.DB_PATH,
      autoLoadEntities: true,
      synchronize: true,
      logging: true, // - orm 사용시 로그 남기기
      dropSchema: true, // - 구동시 해당 테이블 삭제 synchronize와 동시 사용
    }), // ----------------- 추가 end
  ],
})
export class AppModule {}
