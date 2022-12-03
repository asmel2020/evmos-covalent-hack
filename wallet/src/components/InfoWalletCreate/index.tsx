import React from 'react';

import {Text, Layout} from '@ui-kitten/components';
import styles from './styles';


export const InfoWalletCreate = () => {
  return (
    <Layout style={styles.container}>
      <Text style={styles.title} category="h4">Create Password</Text>
      <Text style={styles.text}>This password unlocks your wallet only on this device</Text>
    </Layout>
  );
};
