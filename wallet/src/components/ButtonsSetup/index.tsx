
import { Layout} from '@ui-kitten/components';
import React from 'react'
import styles from './styles';

import ButtonImport from './ButtonImport';
import ButtonCreate from './ButtonCreate';


const ButtonsSetup = () => {
  return(
  <Layout style={styles.container}>
      <ButtonImport />
      <ButtonCreate />
  </Layout>)
} 
export default ButtonsSetup


  