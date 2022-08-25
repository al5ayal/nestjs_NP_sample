import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import flash = require('connect-flash');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // adding sesssion middleware
  app.use(
    session({
      name: 'np_nest_session',
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  // allowing passport to use the session
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  // assign static files folder for admin panel
  const assetsPath = join(__dirname, 'admin/public');
  const viewsPath = join(__dirname, 'admin/views');

  app.useStaticAssets(assetsPath, {
    index: false,
    prefix: '/admin/public/',
  });
  app.setBaseViewsDir(viewsPath);
  // seting default template engine -- hbs
  app.setViewEngine('ejs');

  await app.listen(3000);
}
bootstrap();
