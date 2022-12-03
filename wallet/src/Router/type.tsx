import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    SetupScreen:undefined;
    CreateScreen:undefined;
    PhraseCreateScreen:undefined;
    Web3Screens:undefined,
    MainScreen:undefined,
    ConfirmPhraseScreen:{
      mnemonic:string,
      mnemonicSplit:string[]
    },
    LoginScreen:undefined,
    SendScreen:undefined
    BottomTabNavigator:undefined,
    QrCameraScreen:undefined,
    ComingSoonScreen:undefined,
    SendNftScreen:undefined
  };

export type PhraseCreateScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
  'PhraseCreateScreen'
>;

export type  CreateScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
  'CreateScreen'
>;

export type  ConfirmPhraseScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
  'ConfirmPhraseScreen'
>;