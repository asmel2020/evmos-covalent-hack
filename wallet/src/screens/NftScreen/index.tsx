import React from 'react';
import {Layout} from '@ui-kitten/components/ui';
import {useWallet} from '../../lib';
import {NftList} from '../../components';

const WalletNft = () => {
  const {session} = useWallet();
  return <Layout style={{flex: 1}}>{session ? <NftList /> : <></>}</Layout>;
};

export default WalletNft;
