import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet,Linking} from 'react-native';
import styles from './styles';
import {Text,Icon} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import date from 'date-and-time';
import {Props} from './interfaces';
import {ethers} from 'ethers';
import {useWallet} from '../../lib';

const TransactionModal = ({
  isModalVisible,
  toggleModal,
  entry,
  setModalEntry,
}: Props) => {
  const {activeNetwork} = useWallet();

  const Send = () => (
    <Icon style={styles.icon} fill="#000000" name="close-outline" />
  );

  const Header = () => (
    <View style={styles.cardHeader}>
      <Text category="h6">Transaction Description</Text>
      <TouchableOpacity
        style={{position: 'absolute', left: '88%'}}
        onPress={() => {
          toggleModal();
          setModalEntry({});
        }}>
        <Text>{Send()}</Text>
      </TouchableOpacity>
    </View>
  );

  const Body = () => {
    const value = ethers.utils.formatEther(entry?.value || '0').slice(0, 6);
    const taxGasEstimate = ethers.utils
      .formatEther(
        (
          Number(entry?.gas_price || '0') * Number(entry?.gas || '0')
        ).toString(),
      )
      .slice(0, 8);

    return (
      <View style={styles.cardBody}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 90,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>Status</Text>
            <Text>Confirmado</Text>
          </View>

          <View
            style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            <Text>Data</Text>
            <Text>
              {date.format(
                new Date(entry.block_timestamp),
                'MMM DD at HH:mm A',
              )}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 90,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>From</Text>
            <Text>{`${entry.from_address?.slice(
              0,
              5,
            )}....${entry.from_address?.slice(-5)}`}</Text>
          </View>

          <View
            style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            <Text>To</Text>
            <Text>{`${entry.to_address?.slice(
              0,
              5,
            )}....${entry.to_address?.slice(-5)}`}</Text>
          </View>
        </View>

        <View
          style={{
            height: 90,
            width: '100%',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text>NONCE</Text>
            <Text>#{entry.nonce}</Text>
          </View>
        </View>

        <View
          style={{
            borderWidth: 3,
            borderRadius: 10,
            flexDirection: 'row',
            width: '100%',
            height: 100,
            paddingHorizontal: 30,
          }}>
          <View style={{flex: 1, justifyContent: 'space-evenly'}}>
            <Text>Value</Text>
            <Text>Tax Gas Estimate</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'space-evenly',
            }}>
            <Text>{value}</Text>
            <Text>{taxGasEstimate}</Text>
          </View>
        </View>
      </View>
    );
  };

  const Footer = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text 
          style={{fontSize: 20, color: '#59acf9'}}
          onPress={()=>Linking.openURL(`${activeNetwork?.exploreBlock || ''}tx/${entry.hash}`)}
          >
            View in the Explorer Blocks
          </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal style={styles.bottomModal} isVisible={isModalVisible} onBackButtonPress={toggleModal} >
        <View style={styles.card}>
          <Header />
          {<Body />}
          <Footer />
        </View>
      </Modal>
    </View>
  );
};
export default TransactionModal;
