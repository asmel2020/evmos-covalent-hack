import React, {useEffect, useState} from 'react';
import {Layout, Text} from '@ui-kitten/components/ui';
import {useWallet} from '../../lib';
import {FlatList, useWindowDimensions, TouchableOpacity} from 'react-native';

import styles from './styles';
import { NftRespond, NormalizedMetadata } from './interfaces';
import {FadeInImage} from '../FadeInImage';
import {useNavigation} from '@react-navigation/native';

const NftList = () => {
  const {width} = useWindowDimensions();
  const {getNftAddress, activeNetwork, activeWallet, setSession} = useWallet();
  const [nftData, setNftData] = useState<NftRespond[]>([]);
  const [refresh, setRefresh] = useState(false);
  const navigator = useNavigation<any>();
  const getNft = () => {
    setRefresh(true);
    getNftAddress()
      .then(NftRespond => {
        setNftData(NftRespond);
        setRefresh(false);
      })
      .catch(e => {
        if (e.response.status === 401) {
          setSession(false);
        }
        setRefresh(false);
      });
  };

  const image = ({image}: NormalizedMetadata) => {
    let uri: string = 'https://gateway.pinata.cloud/ipfs/';
    let img: string =
      image !== null
        ? image
        : 'https://archive.org/download/no-photo-available/no-photo-available.png';
    if (img.startsWith('ipfs://')) {
      uri = uri + img.slice(7);
    } else {
      uri = img;
    }

    return uri
  };

  const renderItem = ({normalized_metadata,token_address,token_id,name:nameCollection}: NftRespond) => {
    let name =
      normalized_metadata.name !== null ? normalized_metadata.name : '';

    if (name.length >= 20) {
      name = name.slice(0, 20) + '...';
    }

    const uriImage=image(normalized_metadata)
    /* console.log(item) */
    return (
      <TouchableOpacity onPress={() => navigator.navigate('SendNftScreen',{
        uriImage,
        normalized_metadata,
        token_address,
        token_id,
        nameCollection
      })}>
        <Layout style={[styles.card, {width: width * 0.47}]}>
          <FadeInImage uri={uriImage} style={styles.image} />
          <Text style={styles.textFootCard}>{name}</Text>
        </Layout>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getNft();
  }, [activeNetwork, activeWallet]);

  return (
    <Layout style={{flex: 1}}>
      <FlatList
        key={'#'}
        data={nftData}
        numColumns={2}
        renderItem={({item})=>renderItem(item)}
        refreshing={refresh}
        onRefresh={getNft}
      />
    </Layout>
  );
};

export default NftList;
