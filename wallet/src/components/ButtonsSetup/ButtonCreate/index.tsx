
import { Button} from '@ui-kitten/components';
import React from 'react'
import styles from '../styles';
import { useNavigation } from '@react-navigation/core';
import { CreateScreenNavigationProp } from '../../../Router/type';




export const ButtonCreate = (pro:any) => {
    
  const navigator=useNavigation<CreateScreenNavigationProp>();
  return(
    <Button
      style={[styles.button,styles.buttonCreate] }
       size='large'
       onPressIn={()=>navigator.navigate('CreateScreen')} >
        Create a new Wallet
    </Button>)


} 
export default ButtonCreate;