import React, {useEffect} from 'react';
import styles from './styles';
import {Button, Layout, Text} from '@ui-kitten/components/ui';
import {useWallet} from '../../lib';
import { useWindowDimensions } from 'react-native';

export const GlassMorphism = () => {
  const window = useWindowDimensions();

  const {login, password, getTokenSession,session,setSession} = useWallet();
 
  const loginWallet = async () => {
    await login(password || '').then(() => {
      setSession(true)
    }).catch((e) => console.log('Error'));
  }; 

  const glass = () => {
    return (
      <> 
        <Layout
        style={{
          backgroundColor: 'rgba(18, 22, 59, 0.7)',
          position: 'absolute',
          
          width: window.width,
          height: window.height,
          justifyContent:"center",
          alignItems:"center"
        }}>
            <Button style={styles.button} size="large" onPress={loginWallet}>
          {() => (
            <Text style={{fontSize: 22, fontWeight: 'bold', color: '#ffffff'}}>
              Log in
            </Text>
          )}
        </Button>

        </Layout>
      </>
    );
  };

  const isTokenSessionActive = async () => {
    const tokenSession = await getTokenSession();
    if (!!tokenSession) {
      setSession(true);
    }
  };
  const s=()=>session?<></>:glass();

  useEffect(() => {
      isTokenSessionActive();
  }, []);

  return s();
};
