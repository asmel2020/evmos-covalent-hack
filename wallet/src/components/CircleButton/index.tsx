
import React from 'react'
import {Layout } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

interface CircleButton{
  icon:()=>any
}

export const CircleButton = (props:CircleButton) => {
  
  return (
    <Layout style={styles.container}>
      <TouchableOpacity
        //onPress={buttonClickedHandler}
        style={styles.roundButton}>
        {props.icon()}
      </TouchableOpacity>
    </Layout>
  )
}