import Storage from '../../helper/Storage/index';
import {
  AccountDetails,
  CreateDataBankParams,
  DBStorage,
  NetworkController,
  WalletHd,
} from './interfaces';
import Crypto from '../../helper/Crypto/index';
import {ethers} from 'ethers';
import {ethToEvmos} from '@evmos/address-converter';
import BackEnd from '../../helper/BackEnd/BackEnd';


import * as Bip39 from 'bip39';
import {hdkey} from 'ethereumjs-wallet';
import { gasPrice } from '../../helper/BackEnd/interfaces';
class DataBank extends Crypto {
  public static readonly nameStorage = '@Wallet';

  public static async getDataBank(): Promise<DBStorage> {
    const storage: string | null = await Storage.getStorage('@Wallet');
    if (storage === null) {
      throw new Error('fatal error');
    }
    return JSON.parse(storage);
  }

  public static async setDataBank(value: string): Promise<void> {
    Storage.setStorage('@Wallet', value);
  }

  public static async removeDataBank(): Promise<void> {
    await Storage.removeStorage('@Wallet');
    await this.removeTokenSession();
  }

  public static async generateWallet(){
    const r= performance.now()
    
    const mnemonic = ethers.utils.entropyToMnemonic(
      ethers.utils.randomBytes(16),
    );

    const seed = await Bip39.mnemonicToSeed(mnemonic);

    const hdNode = hdkey.fromMasterSeed(seed);

    const node = hdNode.derivePath(`m/44'/60'/0'`);

    const change = node.deriveChild(0);

    const childNode = change.deriveChild(0);
    
    const childWallet = childNode.getWallet();
    console.log(childWallet.getPrivateKey().toString('hex'));
    //const wallet = new Wallet(childWallet.getPrivateKey().toString('hex'));
    const a= performance.now()
    console.log({fin:a-r})
  }

  public static async existDataBank(): Promise<boolean> {
    const storage: string | null = await Storage.getStorage('@Wallet');
    return storage === null ? false : true;
  }

  public static async encryptPassword(password: string): Promise<string> {
    const {
      vault: {salt},
    }: DBStorage = await this.getDataBank();
    const key = await this.encryptKey(password, salt);
    try {
      await this.decryptVault(key);

      return key;
    } catch (error) {
      throw new Error('password error');
    }
  }

  public static async decryptVault(key: string): Promise<WalletHd> {
    const {
      vault: {storage, iv, salt},
    }: DBStorage = await this.getDataBank();
    const vault = await this.decryptData({
      cipher: storage,
      iv: iv,
      key,
    });
    return JSON.parse(vault) as WalletHd;
  }

  public static async getAddressActive(): Promise<AccountDetails> {
    const {accounts}: DBStorage = await this.getDataBank();
    const isActiveNetwork = await this.isActiveNetwork();

    accounts.accountDetails[accounts.isActiveAccount].ticker =
      isActiveNetwork.ticker;

    if (isActiveNetwork.ecosystemCosmo) {
      accounts.accountDetails[accounts.isActiveAccount].addressCosmo =
        ethToEvmos(accounts.isActiveAccount);
      return accounts.accountDetails[accounts.isActiveAccount];
    }

    return accounts.accountDetails[accounts.isActiveAccount];
  }

  public static async setAddressActive(address:string){
    const DBStorage = await this.getDataBank();
    DBStorage.accounts.isActiveAccount=address;
    this.setDataBank(JSON.stringify(DBStorage));
  }
  
  public static async getAllAddress(): Promise<AccountDetails[]> {
    const {accounts}: DBStorage = await this.getDataBank();
    const isActiveNetwork = await this.isActiveNetwork();
    const result = Object.values(accounts.accountDetails);

    if (isActiveNetwork.ecosystemCosmo) {
      for (let index = 0; index < result.length; index++) {
        result[index].addressCosmo = ethToEvmos(result[index].address);
      }
    }

    return result;
  }

  public static async getBalanceAddress(address: string): Promise<string> {
    const {rpcUrl} = await this.isActiveNetwork();

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    return (await provider.getBalance(address, 'latest')).toString();
  }

  public static async getTokenAddress() {
    const {address} = await this.getAddressActive();
    const {chainId} = await this.isActiveNetwork();
    const key = await this.getTokenSession();

    if (!key) {
      throw new Error('token session');
    }
    return await BackEnd.getTokenAddress(key, address, chainId);
  }

  public static async getNftAddress() {
    const {address} = await this.getAddressActive();
    const {chainId} = await this.isActiveNetwork();
    const key = await this.getTokenSession();

    if (!key) {
      throw new Error('token session');
    }
    return await BackEnd.getNftAddress(key, address, chainId);
  }

  public static async getTransactionAddress() {
    const {address} = await this.getAddressActive();
    const {chainId} = await this.isActiveNetwork();
    const key = await this.getTokenSession();
    if (!key) {
      throw new Error('token session');
    }
    return await BackEnd.getTransactionAddress(key, address, chainId);
  }

  public static async isActiveNetwork(): Promise<NetworkController> {
    const {NetworkController}: DBStorage = await this.getDataBank();
    return NetworkController.networkDetails[NetworkController.isActiveNetwork];
  }

  public static async getAllNetwork() {
    const {NetworkController}: DBStorage = await this.getDataBank();
    return {
      isActiveNetwork: NetworkController.isActiveNetwork,
      networks: Object.values(NetworkController.networkDetails),
    };
  }

  public static async getNetwork(id: string) {
    const {NetworkController}: DBStorage = await this.getDataBank();
    return NetworkController.networkDetails[id];
  }

  public static async setActiveNetwork(id: string): Promise<void> {
    const bdStorage: DBStorage = await this.getDataBank();
    bdStorage.NetworkController.isActiveNetwork = id;
    await this.setDataBank(JSON.stringify(bdStorage));
  }

  public static async getTokenSession(): Promise<string | undefined> {
    const {sessionId} = await this.getDataBank();
    return sessionId;
  }
  public static async getGasPrice(): Promise<gasPrice>{

    const chainId= (await this.isActiveNetwork()).chainId;

    const token = await this.getTokenSession() || ''

    return BackEnd.getGasPrice(token,chainId);
    
  }
  public static async removeTokenSession() {
    const dataBank = await this.getDataBank();
    dataBank.sessionId = undefined;
    await this.setDataBank(JSON.stringify(dataBank));
  }

  public static async setTokenSession(tokenSession: string) {
    const dataBank = await this.getDataBank();
    dataBank.sessionId = tokenSession;
    await this.setDataBank(JSON.stringify(dataBank));
  }

  public static async createDataBank(
    createDataBankParams: CreateDataBankParams,
  ) {
    try {
      if (!(await this.existDataBank())) {
        const NetworkIdUuid = {
          '0x01': Crypto.uuid(),
          '0x05': Crypto.uuid(),
          '0x38': Crypto.uuid(),
          '0x61': Crypto.uuid(),
          '0xa86a': Crypto.uuid(),
          '0xa869': Crypto.uuid(),
          '0x89': Crypto.uuid(),
          '0x013881': Crypto.uuid(),
          '0x2328': Crypto.uuid(),
          '0x2329': Crypto.uuid(),
        };
        const DataBank: DBStorage = {
          accounts: {
            isActiveAccount: createDataBankParams.address,
            accountDetails: {
              [createDataBankParams.address]: {
                type: createDataBankParams.type,
                address: createDataBankParams.address,
                name: createDataBankParams.name,
                publicKey: createDataBankParams.publicKey,
                path: createDataBankParams.path,
              },
            },
          },
          NetworkController: {
            isActiveNetwork: NetworkIdUuid['0x2328'],
            networkDetails: {
              [NetworkIdUuid['0x01']]: {
                id: NetworkIdUuid['0x01'],
                isActive: false,
                chainId: '0x01',
                nickname: 'Ethereum',
                rpcUrl: 'https://rpc.ankr.com/eth',
                ticker: 'ETH',
                exploreBlock: 'https://etherscan.io/',
                ecosystemCosmo: false,
              },
              [NetworkIdUuid['0x05']]: {
                id: NetworkIdUuid['0x05'],
                isActive: false,
                chainId: '0x05',
                nickname: 'Ethereum Goerli Testnet',
                rpcUrl: 'https://rpc.ankr.com/eth_goerli',
                ticker: 'ETHG',
                exploreBlock: 'https://goerli.etherscan.io/',
                ecosystemCosmo: false,
              },
              [NetworkIdUuid['0x38']]: {
                id: NetworkIdUuid['0x38'],
                isActive: false,
                chainId: '0x38',
                nickname: 'Binance Smart Chain Mainnet',
                rpcUrl: 'https://rpc.ankr.com/bsc',
                ticker: 'BNB',
                exploreBlock: 'https://bscscan.com/',
                ecosystemCosmo: false,
              },
              [NetworkIdUuid['0x61']]: {
                id: NetworkIdUuid['0x61'],
                isActive: false,
                chainId: '0x61',
                nickname: 'Binance Smart Chain Testnet',
                rpcUrl: 'https://rpc.ankr.com/bsc_testnet_chapel',
                ticker: 'tBNB',
                exploreBlock: 'https://testnet.bscscan.com/',
                ecosystemCosmo: false,
              },
              [NetworkIdUuid['0xa86a']]: {
                id: NetworkIdUuid['0xa86a'],
                isActive: false,
                chainId: '0xa86a',
                nickname: 'Avalanche C Chain Mainnet',
                rpcUrl: 'https://rpc.ankr.com/avalanche',
                ticker: 'AVAX',
                exploreBlock: 'https://snowtrace.io/',
                ecosystemCosmo: false,
              },
              [NetworkIdUuid['0xa869']]: {
                id: NetworkIdUuid['0xa869'],
                isActive: false,
                chainId: '0xa869',
                nickname: 'Avalanche Fuji Testnet',
                rpcUrl: 'https://rpc.ankr.com/avalanche_fuji',
                ticker: 'AVAX',
                exploreBlock: 'https://testnet.snowtrace.io/',
                ecosystemCosmo: false,
              },
              [NetworkIdUuid['0x89']]: {
                id: NetworkIdUuid['0x89'],
                isActive: false,
                chainId: '0x89',
                nickname: 'Polygon',
                rpcUrl: 'https://rpc.ankr.com/polygon',
                ticker: 'matic ',
                exploreBlock: 'https://polygonscan.com/',
                ecosystemCosmo: false,
              },
              [NetworkIdUuid['0x013881']]: {
                id: NetworkIdUuid['0x013881'],
                isActive: false,
                chainId: '0x013881',
                nickname: 'Mumbai',
                rpcUrl: 'https://rpc.ankr.com/polygon_mumbai',
                ticker: 'matic ',
                exploreBlock: 'https://mumbai.polygonscan.com/',
                ecosystemCosmo: false,
              },
              [NetworkIdUuid['0x2329']]: {
                id: NetworkIdUuid['0x2329'],
                isActive: false,
                chainId: '0x2329',
                nickname: 'EVMOS',
                rpcUrl: 'https://eth.bd.evmos.org:8545',
                ticker: 'EVMOS',
                exploreBlock: 'https://mintscan.io/evmos/',
                ecosystemCosmo: true,
              },
              [NetworkIdUuid['0x2328']]: {
                id: NetworkIdUuid['0x2328'],
                isActive: false,
                chainId: '0x2328',
                nickname: 'Evmos Testnet',
                rpcUrl: 'https://eth.bd.evmos.dev:8545',
                ticker: 'tEVMOS',
                exploreBlock: 'https://evm.evmos.dev/',
                ecosystemCosmo: true,
              }
            },
          },
          transactionHistory: {
            [createDataBankParams.address]: {},
          },
          TokensController: {
            [createDataBankParams.address]: {},
          },
          NftsController: {
            [createDataBankParams.address]: {},
          },
          vault: {
            storage: createDataBankParams.storage,
            salt: createDataBankParams.salt,
            iv: createDataBankParams.iv,
          },
          sessionId: undefined,
        };
        await this.setDataBank(JSON.stringify(DataBank));
        return true;
      }
      throw new Error('error fatal');
    } catch (error: any) {
      throw new Error(error);
    }
  }

}

export default DataBank;
