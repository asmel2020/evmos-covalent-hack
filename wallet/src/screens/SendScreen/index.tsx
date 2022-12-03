import React, {useEffect, useState} from 'react';
import {Icon, Input, Layout, Spinner, Text} from '@ui-kitten/components/ui';
import {TouchableOpacity,Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useWallet} from '../../lib';
import {ethers} from 'ethers';
import ButtonContinue from '../../components/ButtonContinue';
import {ethToEvmos,evmosToEth} from '@evmos/address-converter';
import {QrCode} from '../../assets/Svg';
import {TransferCryptoNativeRequest} from '../../interface';
import ModalGenerics from '../../components/ModalGenerics';

const SendScreen = ({route}: any) => {
  const {balance, activeNetwork, getGasPrice, transferCryptoNative, password,setSession} =
    useWallet();
  const [address, setAddress] = React.useState<string>('');
  const [value, setValue] = React.useState<string>('0');
  const [gasLimit, setGasLimit] = React.useState<string>('21000');
  const [gasPrice, setGasPrice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [textError, setTextError] = useState<string>('');
  const [hashTransaction, setHashTransaction] = useState<string>('');
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.address) {
      setAddress(route.params?.address);
    }
  }, [route.params?.address]); 
 
  useEffect(() => {
    getGasPrice().then(e => {
      setGasPrice(
        ethers.utils.formatUnits(e.normal || '0', 'gwei'),
      );
    }).catch((e)=>{
      if(e.response.status===401){
        setSession(false);
        navigation.goBack();
      }
    });
  }, [activeNetwork]);

  const openQrCamera = () => {
    navigation.navigate('QrCameraScreen' as never, {} as never);
  };

  const qrIcon = () => {
    return (
      <TouchableOpacity onPress={openQrCamera}>
        <QrCode color="#a39e9e" size={30} />
      </TouchableOpacity>
    );
  };

  const TextModalLoad = () => {
    return (
      <>
        <Text style={{marginBottom: 30, fontSize: 24, fontWeight: 'bold'}}>
            Processing...
        </Text>
        <Spinner size="giant" />
      </>
    );
  };

  const TextModalError = () => {
    return (
      <>
        <Text style={{marginBottom: 30, fontSize: 24, fontWeight: 'bold'}}>
          {textError}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            borderRadius: 15,
            width: '50%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setError(false)}>
          <Text style={{}}>cerrar</Text>
        </TouchableOpacity>
      </>
    );
  };
  
  const TextModalSuccess = () => {
    return (
      <>
        <Text style={{marginBottom: 15, fontSize: 24, fontWeight: 'bold'}}>
          Success Transaction
        </Text>
        <Text
          style={{marginBottom:15, fontSize: 18, fontWeight: 'bold', color:'blue'}}
          onPress={() =>
            Linking.openURL(
              `${activeNetwork?.exploreBlock || ''}tx/${hashTransaction}`,
            )
          }>
          View Scan
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#0F4695',
            borderRadius: 15,
            width: '50%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSuccess(false);
            navigation.goBack();
            }}>
          <Text style={{color:'#ffffff'}}>cerrar</Text>
        </TouchableOpacity>
      </>
    );
  };

  const sendTransaction = () => {
    let to:string =address

    if(activeNetwork?.ecosystemCosmo){
      to=evmosToEth(to)
    }

    if (!ethers.utils.isAddress(to)) {
      setTextError('incorrect address');
      setError(true);
      return;
    }
    const gasFee = ethers.utils.parseUnits((Number(gasLimit) * Number(gasPrice)).toString(), 'gwei')
   
    if (
      !ethers.BigNumber.from(balance).gte(ethers.utils.parseEther(value).add(gasFee)) ||
      ethers.utils.parseEther(value).lte('0')
    ) {
      setTextError('insufficient balance');
      setError(true);
      return;
    }

    

    const parms: TransferCryptoNativeRequest = {
      gasLimit: gasLimit,
      gasPrice: gasPrice,
      key: password || '',
      value: ethers.utils.parseEther(value),
      to,
    };

    setLoading(true);
    transferCryptoNative(parms)
      .then(e => {
        setHashTransaction(e.hash);
        setLoading(false);
        setSuccess(true);
        
      })
      .catch(e => {
        setTextError('error');
        setLoading(false);
        setError(true);
      });
  };

  const onChangeAddress = (address: string) => {
    let to:string=address

    if(activeNetwork?.ecosystemCosmo){
      to=evmosToEth(to)
    }

    if (ethers.utils.isAddress(to)) {
      console.log('es un address');
    } else {
      console.log('no es un address');
    } 
    setAddress(address);
  };

  const onChangedGasLimit = (text: any) => {
    setGasLimit(text.replace(/[^0-9]/g, ''));
  };

  const onChangedGasPrice = (text: any) => {
    setGasPrice(text.replace(/[^0-9\\.]+/g, ''));
  };

  const onChanged = (text: any) => {
    setValue(text.replace(/[^0-9\\.]+/g, ''));
  };

  return (
    <Layout style={{flex: 1, paddingHorizontal: 20}}>
      <Text style={{fontSize: 20}}>
        Balance : {ethers.utils.formatEther(balance).slice(0, 6)}{' '}
        {activeNetwork?.ticker || 'ether'}
      </Text>
      <Input
        style={{marginTop: 30}}
        placeholder="Search public address (0x) or ENS"
        label={() => <Text style={{fontSize: 20}}>To :</Text>}
        accessoryRight={qrIcon}
        accessoryLeft={() => (
          <Icon
            style={{
              width: 30,
              height: 30,
            }}
            fill="#a39e9e"
            name="search"
          />
        )}
        value={address}
        size="large"
        onChangeText={nextValue => onChangeAddress(nextValue)}
      />
      <Input
        style={{
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: 'rgba(0,0,0,0)',
          marginTop: 30,
          width: '50%',
        }}
        placeholder="0.0"
        label={() => <Text style={{fontSize: 20}}>Transfer Amount: </Text>}
        textStyle={{fontSize: 30}}
        accessoryRight={() => <Text style={{fontSize: 20}}>All</Text>}
        value={value}
        size="large"
        onChangeText={nextValue => onChanged(nextValue)}
        keyboardType="numeric"
      />

      <Layout
        style={{
          flexDirection: 'row',
          marginTop: 30,
          justifyContent: 'space-evenly',
        }}>
        <Input
          placeholder="Gas Price (GWEI)"
          label={() => <Text style={{fontSize: 15}}>Gas Price (GWEI) : </Text>}
          textStyle={{fontSize: 15}}
          value={gasPrice}
          size="large"
          onChangeText={nextValue => onChangedGasPrice(nextValue)}
          keyboardType="numeric"
        />
        <Input
          placeholder="Gas limit"
          label={() => <Text style={{fontSize: 15}}>Gas limit : </Text>}
          textStyle={{fontSize: 15}}
          value={gasLimit}
          size="large"
          onChangeText={nextValue => onChangedGasLimit(nextValue)}
          keyboardType="numeric"
        />
      </Layout>
      <ButtonContinue
        style={{marginTop: 70}}
        label="Send"
        onPress={sendTransaction}
      />
      <ModalGenerics loading={loading} TextInfos={TextModalLoad} />
      <ModalGenerics loading={error} TextInfos={TextModalError} />
      <ModalGenerics loading={success} TextInfos={TextModalSuccess} />
    </Layout>
  );
};

export default SendScreen;
