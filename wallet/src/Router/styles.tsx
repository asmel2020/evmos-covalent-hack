import type { StackNavigationOptions } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

export const screenOptionsStyles:StackNavigationOptions = {
    headerStyle:{
      elevation:0,
    },
    headerTitleAlign:"center",

  }

export const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
})