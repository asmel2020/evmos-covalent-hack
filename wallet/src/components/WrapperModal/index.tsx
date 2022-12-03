import React, {useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';

interface Props {
  toggleModal:()=>void,
  isModalVisible:boolean,
  Body:() => JSX.Element,
  Foot?:() => JSX.Element,
  style?:{}
}

const WrapperModal = (props:Props) => {

  const {toggleModal, isModalVisible, Body,Foot,style}=props;
  const Head = () => {
    return (
      <View
        style={styles.head}>
        <View
          style={styles.headContent}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        style={styles.bottomModal}
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationOutTiming={1000}>
        <View style={[styles.modalContent,style]}>
          <Head />
          <Body />
          {Foot?<Foot />:<></>}
         
        </View>
      </Modal>
    </View>
  );
};
export default WrapperModal;

