

import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'authToken') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const user = await AsyncStorage.getItem(`${this.namespace}:token`);
  
      return user ? JSON.parse(user) : [];
    }
  

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:token`,
        JSON.stringify(accessToken),
      );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;