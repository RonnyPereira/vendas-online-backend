import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTableUser1677268460545 } from './migration/1677268460545-create_table_user';
import { createTableState1677270442985 } from './migration/1677270442985-create_table_state';
import { createTableCity1677270481303 } from './migration/1677270481303-create_table_city';
import { createTableAddress1677270515824 } from './migration/1677270515824-create_table_address';
import { alterTableState1677330328709 } from './migration/1677330328709-alter_table_state';
import { insertInState1677330407175 } from './migration/1677330407175-insert_in_state';
import { insertInCity1677330493477 } from './migration/1677330493477-insert_in_city';
import { UserModule } from './user/user.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';

const migrations = [
  createTableUser1677268460545,
  createTableState1677270442985,
  createTableCity1677270481303,
  createTableAddress1677270515824,
  alterTableState1677330328709,
  insertInState1677330407175,
  insertInCity1677330493477,
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
    StateModule,
    CityModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
