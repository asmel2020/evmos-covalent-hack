import React, {useState} from 'react';
import {Button} from '@ui-kitten/components';
import {useWallet} from '../../lib';
import {useNavigation} from '@react-navigation/native';
import ButtonContinue from '../ButtonContinue';
import {Text} from '@ui-kitten/components/ui';
import {TouchableOpacity, View} from 'react-native';
import {styles} from '../../Router/styles';
import ModalGenerics from '../ModalGenerics';

export const RemoveVault = (pro: any) => {
  const {removeDataBank} = useWallet();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const navigator = useNavigation<any>();
  const removeWallet = async () => {
    removeDataBank().then(() => {
      setOpenModal(!openModal)
      navigator.reset({
        index: 0,
        routes: [{name: 'Web3Screens'}],
      });
    });
  };

  const modalContent = () => {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text
          style={{
            color: 'red',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 30,
            textAlign: 'center',
          }}>
          Are you sure you want to exclude your wallet?
        </Text>

        <TouchableOpacity
          style={{
            width: '70%',
            height: 40,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            marginTop: 40,
          }}
          
          onPress={removeWallet}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Remove</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '70%',
            height: 40,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:20,
          }}
          onPress={()=>setOpenModal(!openModal)}>
          <Text style={{fontWeight: 'bold'}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        width: '80%',
      }}>
      <Text  style={{fontSize:16}}>
        Can't unlock your wallet? you can exclude your wallet and set up a new
        one
      </Text>
      <Text
        onPress={()=>setOpenModal(!openModal)}
        style={{color: 'blue', marginTop: 20, fontWeight: 'bold'}}>
        Remover Wallet
      </Text>
      <ModalGenerics
        style={{
          width: '85%',
          height: '35%',
          justifyContent: 'flex-start',
        }}
        loading={openModal}
        TextInfos={modalContent}
      />
    </View>
  );
};

export default RemoveVault;
