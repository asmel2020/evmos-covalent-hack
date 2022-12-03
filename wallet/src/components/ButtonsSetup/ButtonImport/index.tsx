
import { useNavigation } from '@react-navigation/native';
import {Button} from '@ui-kitten/components';
import React from 'react'
import styles from '../styles';


const ButtonImport = () => {
  const navigator=useNavigation<any>();
  return(
     <Button
      style={[styles.button,styles.buttonImport]}
      appearance='outline'
      size='large'
      onPressIn={()=>navigator.navigate('ComingSoonScreen')}>
        Import using Secret Recovery Phrase
    </Button>)

} 
 export default ButtonImport