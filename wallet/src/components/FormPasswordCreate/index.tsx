import React, {useState} from 'react';
import {
  Layout,
  Input,
  Icon,
  Text,
  Button,
  CheckBox,
} from '@ui-kitten/components';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {InfoWalletCreate} from '../InfoWalletCreate';
import styles from './styles';
import { useNavigation } from '@react-navigation/core';
import { PhraseCreateScreenNavigationProp } from '../../Router/type';
import { useWallet } from '../../lib';

const FormPasswordCreate = () => {

  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [isEnableButton, setIsEnableButton] = useState<boolean>(false);
  const [isPasswordsEqual, setIsPasswordsEqual] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);

  const navigation=useNavigation<PhraseCreateScreenNavigationProp>()
  const {generateKey,savePassword}= useWallet()
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIconEnableVisible = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        style={styles.icon}
        fill="#8F9BB3"
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );

  const renderIconConfirm = () => {
    let icon = (
      <Icon style={styles.icon} fill="#ff0000" name={'close-circle-outline'} />
    );

    if (isPasswordsEqual) {
      icon = (
        <Icon
          style={styles.icon}
          fill="#11d642"
          name={'checkmark-circle-2-outline'}
        />
      );
    }
    return (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        {icon}
      </TouchableWithoutFeedback>
    );
  };

  const renderLabel = (label: string) => {
    return <Text style={styles.label}>{label}</Text>;
  };

  const comparePassword = (textInput: string, type: number) => {
    let confirm = false;

    if (type === 1) {
      confirm = textInput === confirmPassword;

      confirm ? setIsPasswordsEqual(true) : setIsPasswordsEqual(false);
    }

    if (type === 2) {
      confirm = textInput === newPassword;
      confirm ? setIsPasswordsEqual(true) : setIsPasswordsEqual(false);
    }

    if (isChecked) {
      confirm ? setIsEnableButton(true) : setIsEnableButton(false);
    }
  };

  const compareCheck = () => {
    if (isPasswordsEqual) {
      isChecked ? setIsEnableButton(false) : setIsEnableButton(true);
    }
  };

  const handelCreatePassword = () => {
    if (isChecked && isPasswordsEqual && isEnableButton) {
      generateKey(newPassword).then(({key,salt})=>{
          savePassword(key,salt);
          navigation.navigate('PhraseCreateScreen');
      });
    }
  };

  return (
    <Layout style={styles.container}>
      <InfoWalletCreate />
      <Input
        value={newPassword}
        style={styles.input}
        textStyle={{width: 30}}
        size="large"
        label={() => renderLabel('New Password')}
        placeholder="Place your Text"
        accessoryRight={renderIconEnableVisible}
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => {
          setNewPassword(nextValue);
          comparePassword(nextValue, 1);
        }}
      />

      <Input
        value={confirmPassword}
        style={styles.input}
        size="large"
        label={() => renderLabel('Confirm Password')}
        placeholder="Place your Text"
        secureTextEntry={secureTextEntry}
        accessoryRight={renderIconConfirm}
        onChangeText={nextValue => {
          setConfirmPassword(nextValue);
          comparePassword(nextValue, 2);
        }}
      />

      <Layout  style={styles.checkBox}>
        <CheckBox
          checked={isChecked}
          onChange={nextChecked => {
            setIsChecked(nextChecked);
            compareCheck();
          }}
        />

        <Text style={styles.checkBoxLabel}>
          I understand that the password cannot be recovered
        </Text>
      </Layout>

      <Button
        style={styles.button}
        onPress={handelCreatePassword}
        disabled={!isEnableButton}>
        Create password
      </Button>
    </Layout>
  );
};


export default FormPasswordCreate;
