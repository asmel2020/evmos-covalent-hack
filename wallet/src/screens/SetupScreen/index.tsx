import React from 'react';
import { Layout} from '@ui-kitten/components/ui';
import {ButtonsSetup, LayoutDescription} from '../../components';


const SetupScreen = () => {
  return (
    <Layout style={{flex: 1}}>
      <LayoutDescription />
      <ButtonsSetup />
    </Layout>
  );
};

export default SetupScreen;
