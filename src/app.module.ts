import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTableUser1677268460545 } from './migration/1677268460545-create_table_user';
import { createTableState1677270442985 } from './migration/1677270442985-create_table_state';
import { createTableCity1677270481303 } from './migration/1677270481303-create_table_city';
import { createTableAddress1677270515824 } from './migration/1677270515824-create_table_address';
import { UserModule } from './user/user.module';

const migrations = [
  createTableUser1677268460545,
  createTableState1677270442985,
  createTableCity1677270481303,
  createTableAddress1677270515824,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [...migrations],
      migrationsRun: true,
      autoLoadEntities: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
