import React, {useState, useEffect} from 'react';
import {Avatar, Radio, Text} from '@ui-kitten/components';
import WrapperModal from '../WrapperModal';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useWallet} from '../../lib';
import {AccountDetails} from '../interfaces';
import LoadingModal from '../LoadingModal';
import { useNavigation } from '@react-navigation/native';

const ChangeAddress = () => {
  const {
    getAllAddress,
    getAddressActive,
    activeNetwork,
    addAddress,
    password,
    activeWallet,
    setActiveWallet,
    savePassword
  } = useWallet();

  const [isModalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<AccountDetails[]>([] as any);
  const navigator=useNavigation<any>();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const CreateNewAddress = async () => {
    setLoading(true);

    setTimeout(async () => {
      await addAddress(password || ' ', 'test');
      setLoading(false);
      toggleModal();
    }, 1000);
  };

  const changeAddress = async (address: string) => {
    await setActiveWallet(address);

    setTimeout(async () => {
      toggleModal();
    }, 400);
  };

  const Logout = async ()=>{
    setModalVisible(false);
    savePassword(undefined);
    navigator.reset({
      index: 0,
      routes: [{ name: 'Web3Screens' }],
    });

  }
  const renderItem = ({item}: any) => {
    const {isAction, name, address, addressCosmo} = item as AccountDetails;

    return (
      <TouchableOpacity onPress={async () => await changeAddress(address)}>
        <View
          style={{
            height: 70,
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 20,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: '#dededc',
          }}>
          <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
            <Avatar
              style={{width: 45, height: 45}}
              size="giant"
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEKWsrQjrLklNeCqRe4FXVCTLKzyQaXWqwWUDyFvq8e1YXaPFu-thyqOzkiwXLshME9H0&usqp=CAU',
              }}
            />

            <Text
              style={{
                fontSize: 18,
                marginLeft: 10,
              }}>{`${(addressCosmo ? addressCosmo : address)?.slice(
              0,
              5,
            )}....${(addressCosmo ? addressCosmo : address)?.slice(-5)}`}</Text>
          </View>

          <View style={{flex: 3, alignItems: 'flex-end'}}>
            <Radio checked={isAction} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const allAddress = async () => {
    const {address} = await getAddressActive();

    const allAddress = (await getAllAddress()) as AccountDetails[];
    for (let index = 0; index < allAddress.length; index++) {
      if (allAddress[index].address === address) {
        allAddress[index].isAction = true;
        continue;
      }

      allAddress[index].isAction = false;
    }

    setData(allAddress);
  };

  const Body = () => {
    return (
      <FlatList
        style={{width: '100%'}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.address}
      />
    );
  };

  const Foot = () => {
    return (
      <>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 60,
            borderTopWidth: 1,
            borderColor: '#dededc',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={CreateNewAddress}>
          <Text style={{color: '#59acf9',fontWeight:'bold',fontSize:18}}>Create new address</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 60,
            borderTopWidth: 1,
            borderColor: '#dededc',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={Logout}>
          <Text style={{color: 'red' ,fontWeight:'bold',fontSize:18}}>Logout</Text>
        </TouchableOpacity>
      </>
    );
  };

  useEffect(() => {
    allAddress();
  }, [activeNetwork, activeWallet]);

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <Avatar
          style={{width: 70, height: 70, marginTop: 20}}
          size="giant"
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEKWsrQjrLklNeCqRe4FXVCTLKzyQaXWqwWUDyFvq8e1YXaPFu-thyqOzkiwXLshME9H0&usqp=CAU',
          }}
        />
      </TouchableOpacity>

      <WrapperModal
        style={{height: '50%'}}
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        Body={Body}
        Foot={Foot}
      />
      <LoadingModal loading={loading} textInfo={'Create new address'} />
    </>
  );
};

export default ChangeAddress;
