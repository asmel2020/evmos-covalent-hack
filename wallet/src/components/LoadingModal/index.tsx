import React from 'react'
import Modal from 'react-native-modal';
import { View } from 'react-native';
import { Props } from './interface';
import styles from './styles';
import { Spinner, Text } from '@ui-kitten/components';

const LoadingModal = ({loading,textInfo}:Props) => {
  return (
    <View style={styles.container}>
      <Modal style={styles.bottomModal} isVisible={loading}>
        <View style={styles.card}>
        <Text style={{marginBottom:30,fontSize:24,fontWeight:'bold'}}>{textInfo}</Text>
        <Spinner size='giant'/>
        </View>
      </Modal>
    </View>
  )
}
 export default LoadingModal