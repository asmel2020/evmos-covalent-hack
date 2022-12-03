import React from 'react';
import {Layout} from '@ui-kitten/components/ui';
import {useWallet} from '../../lib';
import {TokenList} from '../../components';

const WalletToken = () => {
  const {session} = useWallet();
  return <Layout style={{flex: 1}}>{session ? <TokenList /> : <></>}</Layout>;
};

export default WalletToken;
