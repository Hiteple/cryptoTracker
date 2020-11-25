import AsyncStorage from '@react-native-community/async-storage';

class Storage {
   static instance = new Storage();

   store = async (key, value) => {
      try {
         await AsyncStorage.setItem(key, value);
      } catch (err) {
         console.log(err);
         return false;
      }
   }

   get = async (key) => {
      try {
         return await AsyncStorage.getItem(key);
      } catch (err) {
         console.log(err);
         throw new Error(err);
      }
   }

   multiGet = async (keys) => {
      try {
         return await AsyncStorage.multiGet(keys);
      } catch (err) {
         console.log(err);
         throw new Error(err);
      }
   }

   getAllKeys = async (allKeys) => {
      try {
         return await AsyncStorage.getAllKeys(allKeys);
      } catch (err) {
         console.log(err);
         throw new Error(err);
      }
   }

   remove = async (key) => {
      try {
         return await AsyncStorage.removeItem(key);
      } catch (err) {
         console.log(err);
         throw new Error(err);
      }
   }
}

export default Storage;