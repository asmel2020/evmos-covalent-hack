import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import DataBank from '../BD';
import {Credential, TransferCryptoNativeRequest, TransferNft} from './interfaces';
import Crypto from '../../helper/Crypto';
import {CreateDataBankParams, WalletHd} from '../BD/interfaces';
import * as Bip39 from 'bip39';
import {hdkey} from 'ethereumjs-wallet';
import BackEnd from '../../helper/BackEnd/BackEnd';
import { erc721 } from '../abi';

class Wallet extends DataBank {
  public static generatePhraseMnemonic(): string {
    return ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
  }

  public static async createWallet(
    credential: Credential,
    mnemonic: string,
  ): Promise<boolean> {

    const seed = await Bip39.mnemonicToSeed(mnemonic);

    const hdNode = hdkey.fromMasterSeed(seed);

    const path = ethers.utils.defaultPath;
    
    const node = hdNode.derivePath(path);

    const childWallet = node.getWallet();

    const {publicKey, address, privateKey,} = new ethers.Wallet(childWallet.getPrivateKey().toString('hex'));
    
    const walletHd: WalletHd = {
      privateKey: {
        [address]: privateKey,
      },
      type: 'HD Key Tree',
      data: {
        mnemonic: mnemonic,
        numberOfAccounts: 0,
        hdPath: path.slice(0, -1),
      },
    };

    const json: string = JSON.stringify(walletHd);

    const encryptWallet = await Crypto.encryptData(json, credential.password);

    const params: CreateDataBankParams = {
      type: 'HD Key Tree',
      address: address,
      name: 'Account 1',
      publicKey,
      path: path,
      salt: credential.salt,
      storage: encryptWallet.cipher,
      iv: encryptWallet.iv,
    };

    return await DataBank.createDataBank(params);
  }

  public static async addAddress(key: string, name: string):Promise<string> {
    const DBStorage = await this.getDataBank();
    
    const WalletHd = await this.decryptVault(key);

    WalletHd.data.numberOfAccounts = WalletHd.data.numberOfAccounts + 1;

    const mnemonic = WalletHd.data.mnemonic;

    const hdPath = `${WalletHd.data.hdPath}${WalletHd.data.numberOfAccounts}`;

    const seed = await Bip39.mnemonicToSeed(mnemonic);

    const hdNode = hdkey.fromMasterSeed(seed);
  
    const node = hdNode.derivePath(hdPath);

    const childWallet = node.getWallet();

    const {publicKey, address, privateKey} = new ethers.Wallet(childWallet.getPrivateKey().toString('hex'));

    DBStorage.accounts.accountDetails[address] = {
      name:`Account ${WalletHd.data.numberOfAccounts+1}`,
      address,
      publicKey,
      type: 'HD Key Tree',
      path: hdPath,
    };

    WalletHd.privateKey[address]=privateKey;

    const params = {
      cipher: JSON.stringify(WalletHd),
      iv: DBStorage.vault.iv,
      key,
    };

    DBStorage.vault.storage=await this.encryptVault(params);

    await this.setDataBank(JSON.stringify(DBStorage));

    return address;
  }

  public static async login(key: string): Promise<void> {
    try {
      const {rpcUrl} = await this.isActiveNetwork();

      let address: string = '';

      const wallet = await this.getAllAddress();

      for (let index = 0; index < wallet.length; index++) {
        
        wallet[index].path;

        if (wallet[index].path === "m/44'/60'/0'/0/0") {
          address = wallet[index].address;
          break;
        }

      }

      const {privateKey} = await this.decryptVault(key);

      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      const msg = "Let's verify the signature of this message!";

      const walletInst = new ethers.Wallet(privateKey[address], provider);

      const paramsSigner = {
        sign: await walletInst.signMessage(msg),
        hash: ethers.utils.hashMessage(msg),
      };

      const tokenSession = await BackEnd.login(paramsSigner);

      await this.setTokenSession(tokenSession);
    } catch (error: any) {
      throw new Error('error login');
    }
  }

  public static async transferCryptoNative(
    transferCryptoNativeRequest: TransferCryptoNativeRequest,
  ): Promise<ethers.providers.TransactionResponse> {
    const {key, to, value, gasPrice, gasLimit} = transferCryptoNativeRequest;
    const {privateKey} = await this.decryptVault(key);

    const {rpcUrl} = await this.isActiveNetwork();

    const {address} = await this.getAddressActive();

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    const signer = new ethers.Wallet(privateKey[address], provider);

    const tx = {
      from: signer.address,
      to,
      value: ethers.BigNumber.from(value),
      nonce: await provider.getTransactionCount(signer.address, 'latest'),
      gasLimit: ethers.BigNumber.from(gasLimit), // 21000
      gasPrice: ethers.utils.parseUnits(gasPrice, 'gwei'),
    };
   
    return signer.sendTransaction(tx);
  }

  public static async transferNft(
    transferNft: TransferNft,
  )/* : Promise<ethers.providers.TransactionResponse> */{
    const {key, to, tokenAddress,tokenId, gasPrice, gasLimit} =transferNft;

    const {privateKey} = await this.decryptVault(key);

    const {rpcUrl} = await this.isActiveNetwork();

    const {address} = await this.getAddressActive();

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    const signer = new ethers.Wallet(privateKey[address], provider);

   const contract= new ethers.Contract(tokenAddress,erc721,signer);

   const tx = {nonce: await provider.getTransactionCount(signer.address, 'latest')};


  const params =[signer.address,to,tokenId];

  const result= await contract.callStatic.transferFrom(...params,tx);

  return await contract.transferFrom(...params,tx)
  }
}
//0xE3166e7E85330473aDC736d438048089f71DD110
export default Wallet;
