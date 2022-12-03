import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {ethers} from 'ethers';
import {Button, Spinner} from '@ui-kitten/components';
import {useWallet} from '../../lib';
import DataBank from '../../lib/class/BD';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components/ui';

const MessageScreen = () => {
  
  

    return (
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:"red"
        }}>
          <Text> Mensaje</Text>
      </Layout>
    );
  
};

export default MessageScreen;
