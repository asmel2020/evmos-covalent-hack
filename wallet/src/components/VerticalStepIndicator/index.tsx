import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { Layout } from '@ui-kitten/components';
import styles from './styles';


const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor:'#008cff',
  separatorFinishedColor: '#008cff',
  separatorUnFinishedColor: '#999999',
  stepIndicatorFinishedColor: '#008cff',
  stepIndicatorUnFinishedColor: '#999999',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#008cff',
};
interface Props {
  page:number
}
export default function VerticalStepIndicator({page}:Props) {
  
  const renderLabel = ({
    position,
    label,
    currentPosition,
  }: {
    position: number;
    stepStatus: string;
    label: string;
    currentPosition: number;
  }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label}
      </Text>
    );
  };

  return (
    <Layout>
      <Layout style={styles.stepIndicator}>
        <StepIndicator
          customStyles={firstIndicatorStyles}
          currentPosition={page}
          stepCount={3}
          labels={['Create Password','Phrase','Phrase Confirm']}
          renderLabel={renderLabel}
        />
      </Layout>
     
    </Layout>
  );
}
