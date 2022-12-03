import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ComingSoonScreen, MainScreen, MessageScreen} from '../screens';

import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {GlassMorphism} from '../components';
import {Chat, Collections, PieChat, Wallet} from '../assets/Svg';

export type RootStackParamList = {
  MessageScreen: undefined;
  MainScreen: undefined;
  ComingSoonScreen: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  const Send = () => (
    <Image style={styles.icon} source={require('./assets/send.png')} />
  );

  const ButtonSend = ({onPress, style}: any) => {
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 35,
            backgroundColor: '#0F4695',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Send />
        </View>
      </TouchableOpacity>
    );
  };

  const TapNavigator = (props: any) => {
    return (
      <View style={styles.tapNavigatorBottom}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('MainScreen');
          }}>
          <View>
            <Wallet size={30} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('ComingSoonScreen');
          }}>
          <View>
            <Chat size={30} />
          </View>
        </TouchableOpacity>

        <ButtonSend
          {...props}
          style={styles.buttonFloat}
          onPress={() => {
            props.navigation.navigate('SendScreen');
          }}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('ComingSoonScreen');
          }}>
          <View>
            <Collections size={30} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
             props.navigation.navigate('ComingSoonScreen');
          }}>
          <View>
            <PieChat size={30} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="MainScreen"
        tabBar={props => <TapNavigator {...props} />}>
        <Tab.Screen
          name="MainScreen"
          options={{
            title: 'Wallet',
            headerShown: false,
          }}
          component={MainScreen}
        />

        <Tab.Screen
          name="ComingSoonScreen"
          options={{
            title: 'Message',
            headerShown: false,
          }}
          component={ComingSoonScreen}
        />
      </Tab.Navigator>
      <GlassMorphism />
    </>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tapNavigatorBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#59ACF9',
  },
  button: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFloat: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
