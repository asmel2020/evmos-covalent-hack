import React from 'react';
import {Layout} from '@ui-kitten/components/ui';
import {useWallet} from '../../lib';
import {TransactionList} from '../../components';

const TransactionAddressScreen = () => {
  const {session} = useWallet();

  const transactionList = () => (session ? <TransactionList /> : <></>);

  return <Layout style={{flex: 1}}>{transactionList()}</Layout>;
};

export default TransactionAddressScreen;
