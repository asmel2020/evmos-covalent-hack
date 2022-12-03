import React, {useState} from 'react';
import {
  Button,
  CheckBox,
  Input,
  Layout,
  ModalService,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {Props} from './interface';
import {VerticalStepIndicator} from '../../components';
import {useWallet} from '../../lib';
import ButtonContinue from '../../components/ButtonContinue';
import styles from './styles';


const ConfirmPhraseScreen = ({route, navigation}: Props) => {
  
  const [{mnemonic, mnemonicSplit}, setParams] = useState(route.params);
  const [firstWord, setFirstWord] = useState<string>('');
  const [lastWord, setLastWord] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);

  const {createWallet, password, salt} = useWallet();
  const handelCreateMnemonic = async (
    mnemonic: string,
    mnemonicSplit: string[],
  ) => {

    if(!isChecked){
      showModal('To proceed please accept the terms and conditions');
      return;

    }

    if (!(mnemonicSplit[0] === firstWord && mnemonicSplit[11] === lastWord)) {
      showModal('The Words Entered are not Correct');
      return;
    }

    showLoading('create wallet');

    setTimeout(async()=>{
      
      const isCreate = await createWallet(
        {password: password as any, salt: salt as any},
        mnemonic,
      );
  
      if (!isCreate) {
        throw new Error('error of creation');
      }

      hideLoading();
      navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabNavigator'}],
      });
      
    },1000)

    
  };

  let modalID = '';

  const hideModal = () => {
    ModalService.hide(modalID);
  };

  const showModal = (message:string) => {
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

  let loadingID = '';
  
  const hideLoading = () => {
    ModalService.hide(loadingID);
  };

  const showLoading = (message:string) => {
    const contentElement = renderLoadingContentElement(message);
    loadingID = ModalService.show(contentElement, {onBackdropPress: hideLoading});
  };

  const renderLoadingContentElement = (text: string) => {
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
          <Spinner size='giant'/>
        </Layout>
      </Layout>
    );
  };

  return (
    <Layout style={{flex: 1}}>
      <VerticalStepIndicator page={2} />

      <Layout style={styles.container}>
      <Text
          style={{
            paddingVertical: 20,
            marginBottom:20,
            textAlign: 'center',
            fontSize: 25,
          }}
          category="h4">
          Confirm your Secret Phrase
        </Text>

        <Input
          label={() => <Text style={styles.inputText}>First Word</Text>}
          value={firstWord}
          onChangeText={value => setFirstWord(value)}
          size="large"
          placeholder="First Word"
        />

        <Input
          style={styles.input}
          value={lastWord}
          label={() => <Text style={styles.inputText}>Last Word</Text>}
          size="large"
          onChangeText={value => setLastWord(value)}
          placeholder="Last Word"
        />

        <Layout style={styles.checkBox}>
          <CheckBox
            checked={isChecked}
            onChange={nextChecked => setIsChecked(nextChecked)}
          />

          <Text style={styles.checkBoxLabel}>
            I understand that the password cannot be recovered
          </Text>
        </Layout>

        <ButtonContinue
          label="Create Wallet"
          onPress={() => handelCreateMnemonic(mnemonic, mnemonicSplit)}
        />
      </Layout>
    </Layout>
  );
};

export default ConfirmPhraseScreen;
