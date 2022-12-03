import React, {useState, useEffect} from 'react';
import {Layout, Text} from '@ui-kitten/components/ui';
import {VerticalStepIndicator} from '../../components';
import {useWallet} from '../../lib';
import {useNavigation} from '@react-navigation/native';
import {mnemonicParams} from './interface';
import {ConfirmPhraseScreenNavigationProp} from '../../Router/type';
import ButtonContinue from '../../components/ButtonContinue';

const PhraseCreateScreen = () => {
  const [{mnemonic, mnemonicSplit}, setMnemonic] = useState<mnemonicParams>({
    mnemonic: '',
    mnemonicSplit: [],
  });

  const {generatePhraseMnemonic} = useWallet();
  const navigator = useNavigation<ConfirmPhraseScreenNavigationProp>();

  const getMnemonic = () => {
    const mnemonic = generatePhraseMnemonic();
    console.log(mnemonic.split(' '));
    setMnemonic({
      mnemonic,
      mnemonicSplit: mnemonic.split(' '),
    });
  };
  useEffect(() => {
    if (
      mnemonicSplit.length <= 0 ||
      mnemonicSplit.length < 12 ||
      mnemonicSplit.length > 12
    ) {
      getMnemonic();
    }
  }, []);

  const handelCreateMnemonic = async (
    mnemonic: string | undefined,
    mnemonicSplit: string[] | undefined,
  ) => {
    if (!mnemonic) {
      throw new Error('error of creation');
    }

    if (!mnemonicSplit) {
      throw new Error('error of creation');
    }

    navigator.navigate('ConfirmPhraseScreen', {
      mnemonic,
      mnemonicSplit,
    });
  };

  return (
    <Layout style={{flex: 1}}>
      <VerticalStepIndicator page={1} />

      <Layout
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Layout>
          <Text
            style={{
              padding: 30,
              textAlign: 'center',
              fontSize: 23,
            }}
            category="h4">
            Write your Secret Recovery Phrase
          </Text>
          <Text
            style={{
              paddingHorizontal: 30,
              textAlign: 'center',
              fontSize: 15,
            }}>
            you don't risk losing your funds, protect your wallet by keeping
            your recovery secret phrase in a trusted place, that's the only way
            to get your wallet back
          </Text>
        </Layout>


        <Layout
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
            marginTop:30,
            borderColor: 'blue',
            borderWidth: 3,
            borderRadius: 30,
            width: '85%',
            height: 200,
          }}>
          <Layout
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                margin: 10,
              }}>
              1 - {mnemonicSplit[0] || ''}
            </Text>

            <Text
              style={{
                margin: 10,
              }}>
              2 - {mnemonicSplit[1] || ''}
            </Text>

            <Text
              style={{
                margin: 10,
              }}>
              3 - {mnemonicSplit[2] || ''}
            </Text>
          </Layout>

          <Layout
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                margin: 10,
              }}>
              4 - {mnemonicSplit[3] || ''}
            </Text>

            <Text
              style={{
                margin: 10,
              }}>
              5 - {mnemonicSplit[4] || ''}
            </Text>

            <Text
              style={{
                margin: 10,
              }}>
              6 - {mnemonicSplit[5] || ''}
            </Text>
          </Layout>

          <Layout
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                margin: 10,
              }}>
              7 - {mnemonicSplit[6] || ''}
            </Text>

            <Text
              style={{
                margin: 10,
              }}>
              8 - {mnemonicSplit[7] || ''}
            </Text>

            <Text
              style={{
                margin: 10,
              }}>
              9 - {mnemonicSplit[8] || ''}
            </Text>
          </Layout>

          <Layout
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                margin: 10,
              }}>
              10 - {mnemonicSplit[9] || ''}
            </Text>

            <Text
              style={{
                margin: 10,
              }}>
              11 - {mnemonicSplit[10] || ''}
            </Text>

            <Text
              style={{
                margin: 10,
              }}>
              12 - {mnemonicSplit[11] || ''}
            </Text>
          </Layout>
        </Layout>

        <ButtonContinue
        style={{marginTop:40}}
        label="Continue"
        onPress={() => handelCreateMnemonic(mnemonic, mnemonicSplit)}
      />
      </Layout>

     
    </Layout>
  );
};

export default PhraseCreateScreen;
