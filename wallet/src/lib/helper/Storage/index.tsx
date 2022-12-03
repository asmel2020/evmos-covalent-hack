import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage{
    
    public static async getStorage(path:string):Promise<string | null>{
        return await AsyncStorage.getItem(path);
    }

    public static async setStorage(path:string,value:string):Promise<void>{
        await AsyncStorage.setItem(path, value);
    }

    public static async removeStorage(path:string):Promise<void> {
      await AsyncStorage.removeItem(path);
    }
}

export default Storage;


