import React from 'react'
import Modal from 'react-native-modal';
import { View } from 'react-native';
import { Props } from './interface';
import styles from './styles';

const ModalGenerics = ({loading,TextInfos,style}:Props) => {
  return (
    <View style={styles.container}>
      <Modal style={styles.bottomModal} isVisible={loading}>
        <View style={[styles.card,style]}>
        <TextInfos />
        </View>
      </Modal>
    </View>
  )
}
 export default ModalGenerics