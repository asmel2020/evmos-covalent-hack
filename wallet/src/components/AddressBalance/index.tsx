
import React,{useEffect,useRef} from 'react'
import { ethers } from 'ethers';
import { Text } from 'react-native'
import { useWallet } from '../../lib';

export const AddressBalance = ({address}:any) => {
    const {balance,getAddressActive,getBalanceAddress,setBalance,activeNetwork} = useWallet();

    const timer = useRef<any>(0);

    useEffect(() => {
      clearInterval(timer.current);
      timer.current = setInterval(() => {
        getAddressActive().then(({address}) => {
          getBalanceAddress(address)
            .then(balance => setBalance(balance))
            .catch(error => console.log(error.message));
        });
      }, 10000);
    }, [activeNetwork]);
    
  return (
    <>
    <Text style={{
        fontSize:20,
        marginTop:5
    }}>
        {ethers.utils.formatEther(balance).slice(0, 6)}{' '}
        {address?.ticker || 'ether'}
      </Text>
    </>
  )
}

export default AddressBalance
