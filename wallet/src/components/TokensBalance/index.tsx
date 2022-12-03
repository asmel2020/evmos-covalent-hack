import React from 'react';
import {Image, Text, View} from 'react-native';
import { tokenMetadata } from './interfaces';
import style from './style';

export const TokensBalance = ({tokenMetadata}:tokenMetadata) => {
  return (
    <View style={style.container}>
       <Image
        style={style.icon}
        source={{
          uri: tokenMetadata.uriToken,
        }}
      />
      <View style={style.containerBalance}>
        <Text style={style.balanceCrypto}> {tokenMetadata.balanceCrypto} BNB</Text>
        <Text style={style.balanceFiat}> ${tokenMetadata.balanceFiat}</Text>
      </View>
    </View>
  );
};
