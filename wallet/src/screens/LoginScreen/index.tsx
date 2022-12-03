import React from 'react';
import {Button, Input, Layout, ModalService, Text} from '@ui-kitten/components';
import {StyleSheet,Image} from 'react-native';
import ButtonContinue from '../../components/ButtonContinue/index';
import {useWallet} from '../../lib';
import {useNavigation} from '@react-navigation/native';
import RemoveVault from '../../components/RemoveVault';


const LoginScreen = () => {
  const [password, setPassword] = React.useState<string>('');
  const navigator = useNavigation<any>();
  const {encryptPassword, savePassword} = useWallet();
 
  const handelPasswordVerify = async () => {
    try {
      const key = await encryptPassword(password);

      savePassword(key);

      navigator.reset({
        index: 0,
        routes: [{name: 'BottomTabNavigator'}],
      });

    } catch (error) {
      showModal('Incorrect Password');
    }
  };

  let modalID = '';

  const hideModal = () => {
    ModalService.hide(modalID);
  };

  const showModal = (message: string) => {
    const contentElement = renderModalContentElement(message);
    modalID = ModalService.show(contentElement, {onBackdropPress: hideModal});
  };

  const renderModalContentElement = (text: string) => {
    return (
      <Layout
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Layout
          style={{
            height: 200,
            width: '70%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 20,
            paddingHorizontal: 20,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
            {text}
          </Text>
          <Button status="danger" onPress={hideModal}>
            Cancel
          </Button>
        </Layout>
      </Layout>
    );
  };

  return (
    <Layout style={{flex: 1}}>
      
      <Layout style={styles.logo}>
      <Image
       style={{
        width: 130,
        height: 130,
      }}
        source={require('../../assets/logo.png')}
      />
      </Layout>

      <Layout style={styles.inputContainer}>
        <Input
          style={styles.inputPassword}
          placeholder="Password"
          label={() => <Text style={styles.inputLabel}>Password</Text>}
          value={password}
          size="large"
          secureTextEntry={true}
          onChangeText={nextValue => setPassword(nextValue)}
        />

        <ButtonContinue
          style={styles.button}
          label="Login"
          onPress={() => handelPasswordVerify()}
        />
       
        <RemoveVault />
      </Layout>


    </Layout>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  logo: {
    flex:2,
    justifyContent:'flex-end',
    alignItems: 'center',
  },
  inputContainer: {
    flex:4,
    alignItems: 'center',
  },
  inputPassword: {
    paddingHorizontal: 50,
    marginTop: 100,
  },
  inputLabel: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: '700',
  },
  button: {
    marginTop: 70,
  },
});
