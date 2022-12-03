import React from 'react';
import {Layout} from '@ui-kitten/components/ui';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import { useWindowDimensions } from 'react-native';


export const QrCameraScreen = ({ navigation }:any) => {

 const {height,width}= useWindowDimensions();
  

  const onSuccess = ({data}:any) => {
    let address:string=data.trim();
    
    if(address.startsWith('ethereum:')){
      address=address.slice(9)
    }
   
    console.log({address});
    navigation.navigate({
      name: 'SendScreen',
      params: {address},
      merge: true,
    })
  };

  const QR = () => {
    return (
      <QRCodeScanner
        onRead={onSuccess}
        showMarker={true}
    
        flashMode={RNCamera.Constants.FlashMode.off}
        topViewStyle={{flex:0}}
        bottomViewStyle={{flex:0}}
        cameraStyle={{height:height,width:width}}
      />
    );
  };

  return (
    <Layout style={{flex: 1}}>
      <QR />
    </Layout>
  );

};

export default QrCameraScreen;
