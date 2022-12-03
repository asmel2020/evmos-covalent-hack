import React from 'react';
//Router
import 'react-native-gesture-handler';
import Router from './src/Router';

//components
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {WalletProvider} from './src/lib';
import {default as theme} from './custom-theme.json';
const App = () => {
  return ( 

      <NavigationContainer>
        <WalletProvider>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
            <Router />
          </ApplicationProvider>
        </WalletProvider>
      </NavigationContainer>
  );
};

const AppState = ({children}: {children: JSX.Element[]}) => {
  return <WalletProvider>{children}</WalletProvider>;
};

export default App;
