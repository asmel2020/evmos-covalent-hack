import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TransactionAddressScreen, NftScreen, TokenScreen} from '../screens';
import {StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
      <Tab.Navigator
        style={styles.navigator}

        screenOptions={{
          tabBarLabelStyle: styles.tap,
          tabBarIndicatorStyle:{
            backgroundColor:'#0F4695'
          }
        }}
        
        >
        <Tab.Screen name="Token" component={TokenScreen} />
        <Tab.Screen name="Nft" component={NftScreen} />
        <Tab.Screen name="History" component={TransactionAddressScreen} />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigator: {
    marginTop: 20,
  },
  tap: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TopTabNavigator;
