import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { styles,screenOptionsStyles } from './styles';
import {RootStackParamList} from './type';
import { Icon} from '@ui-kitten/components';
//Screen
import {
  CreateScreen,
  PhraseCreateScreen,
  SetupScreen,
  Web3Screens,
  ConfirmPhraseScreen,
  LoginScreen,
  SendScreen,
  MainScreen,
  QrCameraScreen,
  ComingSoonScreen,
  SendNftScreen,
} from '../screens';
import BottomTabNavigator from './BottomTabNavigator';



const Stack = createStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Web3Screens"
      screenOptions={screenOptionsStyles}>
      <Stack.Screen
        name="Web3Screens"
        component={Web3Screens}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ComingSoonScreen"
        component={ComingSoonScreen}
        options={{
          title: 'Coming Soon',
        }}
      />
    
      {/*  routers create  */}
      <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
        <Stack.Screen
          name="SetupScreen"
          component={SetupScreen}
          options={{
            title: 'GIZLI WALLET',
          }}
        />

        <Stack.Screen name="CreateScreen" component={CreateScreen}  options={{
            title: 'Create Password',
          }} />
        <Stack.Screen
          name="PhraseCreateScreen"
          component={PhraseCreateScreen}
          options={{
            title: 'Phrase',
          }}
        />
        <Stack.Screen
          name="ConfirmPhraseScreen"
          component={ConfirmPhraseScreen}
          options={{
            title: 'Phrase Confirm ',
          }}
        />
      </Stack.Group>


      {/* routers  */}
      <Stack.Group
        screenOptions={{presentation: 'transparentModal', headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Group>
       
      {/* send tokens */}
      <Stack.Group screenOptions={{
        presentation: 'modal',
        headerStyle:{
        
        },
        headerBackImage:()=>(<Icon style={styles.icon} fill="#000000" name="close" />)
        }} >
        <Stack.Screen name="SendScreen" options={{title:"Send Token"}} component={SendScreen} />
        <Stack.Screen name="SendNftScreen" options={{title:"Send Nft"}} component={SendNftScreen} />
        <Stack.Screen name="QrCameraScreen" options={{title:"send active"}} component={QrCameraScreen} />

      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Router;
