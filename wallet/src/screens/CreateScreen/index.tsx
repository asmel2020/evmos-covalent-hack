import React from 'react';
import {Layout} from '@ui-kitten/components';
import { FormPasswordCreate, VerticalStepIndicator } from '../../components';

const CreateScreen = () => {
  return (
    <Layout style={{flex: 1}}>
      <VerticalStepIndicator page={0} />
      <FormPasswordCreate />
    </Layout>
  );
};

export default CreateScreen;
