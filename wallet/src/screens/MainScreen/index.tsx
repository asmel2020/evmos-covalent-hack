import React, {useEffect} from 'react';
import {Layout} from '@ui-kitten/components/ui';
import {WalletInfo} from '../../components';
import TopTabNavigator from '../../Router/TopTabNavigator';
import {useWallet} from '../../lib';
import useSWR from 'swr';

const MainScreen = () => {
 
  const {isActiveNetwork,setActiveNetwork} = useWallet();


  useEffect(() => {
    isActiveNetwork()
      .then(activeNetwork => {
        setActiveNetwork(activeNetwork.id);
      })
      .catch(() => console.log('error'));
  }, []);



  return (
    <Layout style={{flex: 1}}>
      <WalletInfo />
      <TopTabNavigator />
    </Layout>
  );
};

export default MainScreen;
