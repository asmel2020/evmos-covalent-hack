import Aes from 'react-native-aes-crypto'
import uuid from 'react-native-uuid';
import { DecryptDataPrams, EncryptDataRespond, GenerateKeyRespond} from './interface'

class Crypto{

    public static async generateKey(password:string):Promise<GenerateKeyRespond>{
        const salt:string=await Aes.randomKey(256)
        const cost:number=5000
        const length:number=256
        const key:string = await Aes.pbkdf2(password, salt, cost, length);
        return {
            key,
            salt
        }
    }

    public static async encryptKey(password:string,salt:string):Promise<string>{
        const cost:number=5000

        const length:number=256

        const key:string = await Aes.pbkdf2(password, salt, cost, length);

        return key
           
    }
    
    public static async encryptData (text:string, key:string):Promise<EncryptDataRespond>{

        const iv:string = await Aes.randomKey(16);

        const cipher:string= await Aes.encrypt(text, key, iv, 'aes-256-cbc')
        
        return {
            cipher,
            iv
        }

    }

    public static async decryptData(decryptDataPrams:DecryptDataPrams):Promise<string>{
        const {cipher,iv,key}=decryptDataPrams
      return await Aes.decrypt(cipher,key,iv, 'aes-256-cbc');
    }

    public static async encryptVault(decryptDataPrams:DecryptDataPrams):Promise<string>{
      const {cipher,iv,key}=decryptDataPrams
      return await Aes.encrypt(cipher,key,iv, 'aes-256-cbc');
    }
    public static uuid(){
        return uuid.v4() as string
    }
}

export default Crypto