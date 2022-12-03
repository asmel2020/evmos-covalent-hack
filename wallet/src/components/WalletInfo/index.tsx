import React, {useState, useEffect} from 'react';
import {Layout,} from '@ui-kitten/components';
import {useWallet} from '../../lib';
import style from './style';

import {AccountDetails} from './interfaces';
import ChangeNetwork from '../ChangeNetwork';
import AddressBalance from '../AddressBalance';

import ActiveAddress from '../ActiveAddress';
import ChangeAddress from '../ChangeAddress';

export const WalletInfo = () => {
  const {getAddressActive, getBalanceAddress,setBalance,activeNetwork,activeWallet,setActiveWallet} = useWallet();

  const [address, setAddress] = useState<AccountDetails>({} as any);

  const walletDataInit = async () => {
    const address = await getAddressActive();
    setAddress(address);
    const balance = await getBalanceAddress(address.address);
    setBalance(balance);
  };
  
  useEffect(()=>{
    getAddressActive().then((address)=>{
      setActiveWallet(address.address);
    })
  },[]);

  useEffect(() => {
    walletDataInit();
  }, [activeNetwork,activeWallet]);

  return (
    <Layout style={style.container}>
      <ChangeNetwork/>
      <ChangeAddress />
      <ActiveAddress accountDetails={address}/>
      <AddressBalance address={address}/>
    </Layout>
  );
};
