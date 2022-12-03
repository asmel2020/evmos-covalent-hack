import {ethers} from 'ethers';
import React, {useContext, useReducer} from 'react';
import {AccountDetails, NetworkController} from '../class/BD/interfaces';
import Wallet from '../class/Wallet';
import {TransferCryptoNativeRequest, TransferNft} from '../class/Wallet/interfaces';
import { gasPrice } from '../helper/BackEnd/interfaces';
import {WalletContext} from './context';
import {WalletContextProps} from './interface';
import {WalletReducer, WalletStateInitial} from './reducer';

const WalletProvider = ({children}: {children: JSX.Element[]}) => {
  const [
    {password, salt, session, balance, activeNetwork, activeWallet},
    dispatch,
  ] = useReducer(WalletReducer, WalletStateInitial);

  const savePassword = (password: string | undefined, salt?: string | undefined) => {
    if (!!salt) {
      dispatch({
        type: 'savePassword',
        payload: {
          password: password,
          salt: salt,
        },
      });
      return;
    }

    dispatch({
      type: 'savePassword',
      payload: {
        password: password,
      },
    });
  };

  const setSession = (isSession: boolean) => {
    dispatch({
      type: 'session',
      payload: {
        session: isSession,
      },
    });
  };

  const setBalance = (balance: string) => {
    dispatch({
      type: 'setBalance',
      payload: {
        balance,
      },
    });
  };

  const setActiveNetwork = async (id: string) => {
    const networkController = await Wallet.getNetwork(id);
    await Wallet.setActiveNetwork(id);
    dispatch({
      type: 'setActiveNetwork',
      payload: {
        ...networkController,
      },
    });
  };

  const setActiveWallet = async (address: string) => {
    await Wallet.setAddressActive(address);
    dispatch({
      type: 'setActiveWallet',
      payload: {
        address,
      },
    });
  };

  const addAddress = async (key: string, name: string): Promise<string> => {
    const address = await Wallet.addAddress(key, name);
    await setActiveWallet(address);
    return address;
  };

  const getAddressActive = () => {
    return Wallet.getAddressActive();
  };

  const getBalanceAddress = async (address: string) => {
    return await Wallet.getBalanceAddress(address);
  };

  const getTokenAddress = async () => {
    return await Wallet.getTokenAddress();
  };

  const getNftAddress = async () => {
    return await Wallet.getNftAddress();
  };

  const getTransactionAddress = async () => {
    return await Wallet.getTransactionAddress();
  };

  const encryptPassword = async (password: string) => {
    return await Wallet.encryptPassword(password);
  };

  const getTokenSession = (): Promise<string | undefined> => {
    return Wallet.getTokenSession();
  };

  const isActiveNetwork = () => {
    return Wallet.isActiveNetwork();
  };

  const login = async (key: string) => {
    await Wallet.login(key);
  };

  const removeDataBank = async () => {
    Wallet.removeDataBank();
  };

  const transferCryptoNative = async (
    transferCryptoNativeRequest: TransferCryptoNativeRequest,
  ): Promise<ethers.providers.TransactionResponse> => {
    return Wallet.transferCryptoNative(transferCryptoNativeRequest);
  };

  const getAllNetwork = async () => {
    return Wallet.getAllNetwork();
  };

  const getAllAddress = async (): Promise<AccountDetails[]> => {
    return Wallet.getAllAddress();
  };

  const getGasPrice = async (): Promise<gasPrice> => {
    return Wallet.getGasPrice();
  };

 const transferNft=async(transferNft: TransferNft) =>{
    return  await Wallet.transferNft(transferNft)
  }

  const params: WalletContextProps = {
    password,
    salt,
    session,
    balance,
    activeNetwork,
    generateKey: Wallet.generateKey,
    encryptData: Wallet.encryptData,
    decryptData: Wallet.decryptData,
    encryptPassword,
    generatePhraseMnemonic: Wallet.generatePhraseMnemonic,
    createWallet: Wallet.createWallet,
    existDataBank: Wallet.existDataBank,
    removeDataBank,
    getAddressActive,
    getBalanceAddress,
    savePassword,
    login,
    getTokenAddress,
    getNftAddress,
    getTransactionAddress,
    getTokenSession,
    setSession,
    setBalance,
    setActiveNetwork,
    isActiveNetwork,
    transferCryptoNative,
    getAllNetwork,
    addAddress,
    getAllAddress,
    setActiveWallet,
    activeWallet,
    getGasPrice,
    transferNft
  };

  return (
    <WalletContext.Provider value={params}>{children}</WalletContext.Provider>
  );
};

const useWallet = () => useContext(WalletContext);

export {WalletProvider, useWallet};
