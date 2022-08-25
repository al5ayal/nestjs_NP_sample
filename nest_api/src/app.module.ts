import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './entites/product.entity';
import { User } from './entites/user.entity';
import { FrontendModule } from './frontend/frontend.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FrontendModule,
    AdminModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
    ]),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
