import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';




async function bootstrap() {
  const provider =[
    'https://rpc.ankr.com/eth',
    'https://rpc.ankr.com/eth_goerli',
    'https://rpc.ankr.com/polygon',
    'https://rpc.ankr.com/polygon_mumbai',
    'https://rpc.ankr.com/bsc',
    "https://rpc.ankr.com/bsc_testnet_chapel",
    'https://rpc.ankr.com/avalanche_fuji',
    'https://rpc.ankr.com/avalanche',
    "https://evm.cronos.org",
    "https://evm-t3.cronos.org",
    "https://eth.bd.evmos.org:8545",
    "https://eth.bd.evmos.dev:8545",
    "https://rpc.ankr.com/klaytn",
    "https://rpc.ankr.com/klaytn_testnet"

  ]
  const app = await NestFactory.create(AppModule);

  const appService = app.get(AppService);

  const gasPrice= (provider:string)=>{
    appService.getGasPrice(provider).catch(()=>{
      console.log('reconnect')
      gasPrice(provider) 
    });
  
  }
 
 for (let index = 0; index < provider.length; index++) {
    gasPrice(provider[index]);
    appService.getGasPricse(provider[index]); 
  }
  /* gasPrice(provider[0]);
  appService.getGasPricse(provider[0]);  */
}
bootstrap();
