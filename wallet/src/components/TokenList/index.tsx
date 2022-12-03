import {Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {useWallet} from '../../lib';
import styles from './styles';
import {ethers} from 'ethers';
import {getToken} from './interfaces';
import {FlatList} from 'react-native';

const name = (tokenData: getToken) => (
  <Layout style={styles.nameContainer}>
    <Text style={styles.cardText}>{tokenData.name}</Text>
  </Layout>
);

const Balance = (tokenData: getToken) => (
  <Layout style={styles.balanceContainer}>
    <Text style={styles.cardText}>
      {ethers.utils.formatEther(tokenData.balance)} {tokenData.symbol}
    </Text>
  </Layout>
);

const TokenList = () => {
  const {getTokenAddress,activeNetwork,activeWallet,setSession} = useWallet();
  const [tokenData, setTokenData] = useState<getToken[]>([]);
  const [refresh, setRefresh] = useState(false);

  const getTokens=()=>{
    setRefresh(true);
    getTokenAddress().then(tokes => {
      setTokenData(tokes);
      setRefresh(false)
    }).catch((e)=>{
      if(e.response.status===401){
        setSession(false)
      }
      setRefresh(false);
    });
  }

  const renderItem = ({item}: any) => (
    <Layout
      style={styles.card}>
      {name(item)}
      {Balance(item)}
    </Layout>
  );

  useEffect(() => {
    getTokens()
  }, [activeNetwork,activeWallet]);


  return (
    <Layout style={{flex: 1}}>
      <FlatList
        key={'#'}
        data={tokenData}
        renderItem={renderItem}
        refreshing={refresh}
        onRefresh={getTokens}
      />
    </Layout>
  );
};
export default TokenList;