import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {ethers} from 'ethers';
import {Button, Spinner} from '@ui-kitten/components';
import {useWallet} from '../../lib';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

const Web3Screens = () => {
  
    const [first, setFirst] = useState<boolean | null>(null);

    const {existDataBank,password} = useWallet();

    const navigator=useNavigation<any>();
    const handlerExistDataBank = async () => {
      return await existDataBank();
    };

    useEffect(() => {
      if(first===null){
        handlerExistDataBank().then(e => {
          setFirst(e);
        });
      }else{
        setTimeout(()=>{
          if(first){
           
            if(!password){
              navigator.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              });
            }else{
              password
              navigator.reset({
                index: 0,
                routes: [{ name: 'BottomTabNavigator' }],
              });
            }

          }else{
            navigator.reset({
              index: 0,
              routes: [{ name: 'SetupScreen' }],
            });
          }
        },2500);
      }
    }, [first]);

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:"white"
        }}>
          {/* <Spinner size='giant'/> */}
          <Lottie source={require('../../assets/animation.json')} autoPlay loop={false}/>
      </View>
    );
  
};

export default Web3Screens;
