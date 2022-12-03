import React, {useState, useEffect, useRef} from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import {useWallet} from '../../lib';
import {NetworkController} from './interface';
import {Avatar, Radio} from '@ui-kitten/components';
import { Image } from 'react-native-svg';
import { LogoSvg } from '../../utils/LogoSvg';


const ChangeNetwork = ({style}: any) => {

  const {getAllNetwork, setActiveNetwork, activeNetwork} = useWallet();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<NetworkController[]>([]);

  const setNetwork = async (id: string) => {
    await setActiveNetwork(id);

    setTimeout(async () => {
      toggleModal();
    },400);

  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const AllNetwork = async () => {
    const {isActiveNetwork, networks} = await getAllNetwork();
    for (let index = 0; index < networks.length; index++) {
      if (isActiveNetwork === networks[index].id) {
        networks[index].isActive = true;
      }
    }
    setData(networks);
  };

  useEffect(() => {
    AllNetwork();
  }, [activeNetwork]);

  const chainList = ({item}: any) => {
   
    return (
      <TouchableOpacity onPress={() => setNetwork(item.id)}>
        <View
          style={{
            height: 60,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#dededc',
            paddingLeft: '10%',
            flexDirection: 'row',
          }}>
          <LogoSvg chainId={item.chainId} />

          <Text style={{marginLeft: 10, fontSize: 16}}>{item.nickname}</Text>
          <View style={{flex: 1, alignItems: 'flex-end' ,paddingRight:30}}>
            <Radio checked={item.isActive} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const Head = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 50,
          borderBottomWidth: 1,
          borderColor: '#dededc',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Networks</Text>
      </View>
    );
  };

  const Body = ({data}: any) => {
    return (
      <FlatList
        style={{width: '100%'}}
        data={data}
        renderItem={chainList}
        keyExtractor={item => item.id}
      />
    );
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal} style={{alignItems:'center',marginTop: 20}}>
        <Text style={{}}>Network</Text>
        <Text style={{marginTop: 5}}>{activeNetwork?.nickname}</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Modal
          style={styles.bottomModal}
          isVisible={isModalVisible}
          onBackButtonPress={toggleModal}
          onBackdropPress={toggleModal}
          animationOutTiming={1000}>
          <View style={styles.card}>
            <Head />
            <Body data={data} />
          </View>
        </Modal>
      </View>
    </>
  );
};

export default ChangeNetwork;
