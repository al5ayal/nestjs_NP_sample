import { ProductsController } from './products/products.controller';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminAuthService } from './admin-auth/admin-auth.service';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { UsersController } from './users/users.controller';
import { ProductsModule } from './products/products.module';
// import { ProductsService } from './products/products.service';

@Module({
  imports: [AdminAuthModule, UsersModule, ProductsModule],
  controllers: [AdminController, UsersController, ProductsController],
  providers: [AdminAuthService],
})
export class AdminModule {
  //   configure(consumer: MiddlewareConsumer) {
  //     consumer.apply(AdminAuthMiddleware).forRoutes('/admin');
  //   }
}
