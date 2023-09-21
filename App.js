import React, { useState } from 'react'
import RootStack from "./navigators/RootStack";
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { LoginContext } from './components/LoginContext';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedLogin, setStoredLogin] = useState("")

  const checkLogin = () => {
    AsyncStorage.getItem('CHATVIDUSER').then((res) => {
      console.log(res);
      if (res !== null) {
        setStoredLogin(res)
      } else {
        setStoredLogin(null);
      }
    }).catch((e) => console.warn(e))
  }

  if (!appReady) {
    return (<AppLoading
      startAsync={checkLogin}
      onFinish={() => setAppReady(true)}
      onError={console.warn}
    />)
  }
  return (
    <LoginContext.Provider value={{ storedLogin, setStoredLogin }}>
      <RootStack />
    </LoginContext.Provider>
  );
}


