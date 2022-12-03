import {Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {useWallet} from '../../lib';
import styles from './styles';
import {ethers} from 'ethers';
import {AccountDetails, TransactionRespond} from './interfaces';
import {FlatList, TouchableOpacity} from 'react-native';
import TransactionModal from '../TransactionModal';


const TransactionList = () => {
  const {getTransactionAddress, getAddressActive,activeNetwork,activeWallet,setSession} = useWallet();

  const [transactionData, setTransactionData] = useState<TransactionRespond[]>(
    [],
  );

  const [refresh, setRefresh] = useState(false);
  const [address, setAddress] = useState<AccountDetails>({} as any);
  const [isModalVisible, setModalVisible] = useState(false);
  const [entry, setModalEntry] = useState<TransactionRespond>({} as any);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getTransaction = async () => {
   
    setRefresh(true);
    const address = await getAddressActive();
    setAddress(address);
   getTransactionAddress().then((transaction)=>{
      setTransactionData(transaction);
      setRefresh(false);
    }).catch((e)=>{
      if(e.response.status===401){
        setSession(false)
      }
      setRefresh(false);
    });
  };

  const name = ({from_address, to_address}: TransactionRespond) => (
    <Layout style={styles.nameContainer}>
      {/* ignore prettier */}
      <Text style={styles.cardText}>
        From: {`${from_address?.slice(0, 5)}....${from_address?.slice(-5)}`}
      </Text>

      <Text style={styles.cardText}>
        To: {`${to_address?.slice(0, 5)}....${to_address?.slice(-5)}`}
      </Text>
    </Layout>
  );

  const balance = (tokenData: TransactionRespond) => (
    <Layout style={styles.balanceContainer}>
      <Text style={styles.cardText}>
        {ethers.utils.formatEther(tokenData.value).slice(0, 6)}{' '}
        {address.ticker || ' '}
      </Text>
    </Layout>
  );

  const renderItem = ({item,key}: any) => {
    return (
      <>
        <TouchableOpacity style={styles.card} onPress={()=>{
          setModalEntry(item);
          toggleModal()
        }}>
          {name(item)}
          {balance(item)}
        </TouchableOpacity>
      </>
    );
  };

  useEffect(() => {
    getTransaction();
  }, [activeNetwork,activeWallet]);

  return (
    <Layout style={{flex: 1}}>
      <FlatList
        key={'#'}
        data={transactionData}
        renderItem={renderItem}
        refreshing={refresh}
        onRefresh={getTransaction}
      />
      <TransactionModal
          entry={entry}
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
          setModalEntry={setModalEntry}
       />
    </Layout>
  );
};
export default TransactionList;
