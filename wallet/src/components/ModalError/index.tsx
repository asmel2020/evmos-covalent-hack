
import { Button,Card,Icon,Layout, Modal, Text} from '@ui-kitten/components';
import React from 'react'
import styles from './styles';

const StarIcon = (props:any) => (
    <Icon {...props} name='star'/>
  );

/*interface Props {
    label:string
    onPress?:()=>void
}*/
export const ModalError = (props:any) => {

  return(<Modal
    visible={props.visible}
    backdropStyle={props.style}
    onBackdropPress={() => props.setVisible(false)}
    >
    <Card disabled={true} style={{
        justifyContent:'center',
        alignContent:'center'
    }}>
      <Text style={{marginBottom:30}}>The Words Entered are not Correct</Text>
      <Button status='danger'  onPress={() => props.setVisible(false)}>
        Cancel
      </Button>
       
    </Card>
  </Modal>
    )


} 
export default ModalError;