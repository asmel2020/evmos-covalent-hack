import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { BlockNumber } from './entity/blockNumber.entity';
import { GasPrice } from './entity/gasPrice.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    /*TypeOrmModule.forRoot({
      name: 'blockNumberDB',
      type: 'sqlite', 
      database:'db.sqlite',  
      entities:[BlockNumber,GasPrice],
      synchronize:true,
    }),*/
    TypeOrmModule.forRoot({
    type:'postgres',
    host:process.env.DB_HOST,
    port:+process.env.DB_PORT,
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    autoLoadEntities:true,
    synchronize:true,
  }), 
  TypeOrmModule.forFeature([BlockNumber,GasPrice])],
  providers: [AppService],
})
export class AppModule {}
