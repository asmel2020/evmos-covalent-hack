
import { Button} from '@ui-kitten/components';
import React from 'react'
import styles from './styles';


interface Props {
    label:string
    onPress?:()=>void
    style?:{}
}
export const ButtonContinue = (props:Props) => {

  
  return(
    <>
    <Button
      style={[styles.button,props.style]}
      onPress={props.onPress}
      size="large"
      >
      {props.label}
      
    </Button>
  </>)


} 
export default ButtonContinue;