import { Injectable } from '@angular/core';
import 'capacitor-secure-storage-plugin';
import { Plugins } from '@capacitor/core';

const { SecureStoragePlugin } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {

  constructor() { }

  async set(key: string, value: any) {
     const storage = await SecureStoragePlugin.set({key,value: JSON.stringify(value)});
    return  storage;
    }
    async get(key: string){
      const storage = await SecureStoragePlugin.get({key});
      return  JSON.parse(storage.value);
    }
    async remove(key: string){
      const storage = await SecureStoragePlugin.remove({key});
      return  storage;
    }
}
