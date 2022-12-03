import {Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {CircleButton} from '../CircleButton';
import styles from './styles';

export const CircleButtonGroup = () => {
  const Send = () => (
    <Icon style={styles.icon} fill="#ffffff" name="paper-plane" />
  );

  const Buy = () => (
    <Icon style={styles.icon} fill="#ffffff" name="plus-circle" />
  );

  const Swap = () => <Icon style={styles.icon} fill="#ffffff" name="repeat" />;

  const More = () => (
    <Icon style={styles.icon} fill="#ffffff" name="more-horizontal" />
  );

  return (
    <Layout style={styles.container}>
      <Layout style={styles.containerButton}>
        <CircleButton icon={Swap} />
        <Text style={styles.buttonLabel}>Swap</Text>
      </Layout>

      <Layout style={styles.containerButton}>
         <CircleButton icon={Send} />
        <Text style={styles.buttonLabel}>Send</Text>
      </Layout>

      <Layout style={styles.containerButton}>
        <CircleButton icon={More} />
        <Text style={styles.buttonLabel}>More</Text>
      </Layout>
    </Layout>
  );
};
