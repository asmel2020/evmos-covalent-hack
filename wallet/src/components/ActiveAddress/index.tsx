import React, {useState} from 'react';
import {Icon, Text} from '@ui-kitten/components';
import {AccountDetails} from '../interfaces';
import WrapperModal from '../WrapperModal';
import style from './style';
import {TouchableOpacity, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
export const ActiveAddress = ({accountDetails}: any) => {
  
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const AddressSlice = () => {
    const {addressCosmo, address} = accountDetails as AccountDetails;
    if (!!addressCosmo) {
      return (
          <Text style={style.address}>{`${addressCosmo?.slice(
            0,
            5,
          )}....${addressCosmo?.slice(-5)}`}</Text>
      );
    }

    return (
      <Text style={style.address}>{`${address?.slice(0, 5)}....${address?.slice(
        -5,
      )}`}</Text>
    );
  };

  const CopyToClipAddress = ({address, style}: any) => {
    return (
      <TouchableOpacity
        onPress={() => Clipboard.setString(address)}
        style={{
          ...style,
          backgroundColor: '#dededc',
          borderRadius: 35,
          paddingHorizontal: 20,
          paddingVertical: 7,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{marginRight: 10}}>
          <Text
            style={{
              fontSize: 20,
              marginTop: 5,
            }}>{`${address?.slice(0, 5)}....${address?.slice(-5)}`}</Text>
        </View>

        <Icon
          style={{
            width: 25,
            height: 25,
          }}
          fill="#ffffff"
          name="clipboard"
        />
      </TouchableOpacity>
    );
  };

  const CopyToClip = () => {
    const {addressCosmo, address} = accountDetails as AccountDetails;
    if (addressCosmo) {
      return (
        <View>
          <CopyToClipAddress
            style={{marginBottom: 20}}
            address={addressCosmo}
          />
          <CopyToClipAddress style={{marginBottom: 20}} address={address} />
        </View>
      );
    }

    return <CopyToClipAddress style={{marginBottom: 20}} address={address} />;
  };

  const body = () => {
    const {addressCosmo, address} = accountDetails as AccountDetails;

    return (
      <>
        <Text style={{marginVertical: 20, fontSize: 24, fontWeight: 'bold'}}>
          Account
        </Text>

        <QRCode value={`ethereum:${address}`} size={200} />
        <Text style={{marginVertical: 30, fontSize: 18}}>
          scan the qr to receive a transfer
        </Text>
        <CopyToClip />
      </>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={{
          marginVertical:10,
          backgroundColor: '#dededc',
          borderRadius: 35,
          paddingHorizontal: 20,
          paddingVertical: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={toggleModal}>
        <AddressSlice />
      </TouchableOpacity>

      <WrapperModal
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        Body={body}
      />
    </>
  );
};

export default ActiveAddress;
