import {NetworkController} from '../class/BD/interfaces';
import {
  WalletSavePassword,
  WalletSession,
  WalletState,
  AddressBalance,
  ActiveWallet,
} from './interface';

export const WalletStateInitial: WalletState = {
  password: undefined,
  salt: undefined,
  session: false,
  balance: '0',
  activeNetwork: undefined,
  activeWallet: undefined,
};

type WalletAction =
  | {type: 'savePassword'; payload: WalletSavePassword}
  | {type: 'valut'; payload: string}
  | {type: 'session'; payload: WalletSession}
  | {type: 'setBalance'; payload: AddressBalance}
  | {type: 'setActiveNetwork'; payload: NetworkController}
  | {type: 'setActiveWallet'; payload: ActiveWallet};

export const WalletReducer = (
  walletState: WalletState,
  action: WalletAction,
): WalletState => {
  switch (action.type) {
    case 'savePassword':
      if (!!action.payload.salt) {
        return {
          ...walletState,
          password: action.payload.password,
          salt: action.payload.salt,
        };
      }

      return {
        ...walletState,
        password: action.payload.password,
      };
    case 'session':
      return {
        ...walletState,
        session: action.payload.session,
      };
    case 'setBalance':
      return {
        ...walletState,
        balance: action.payload.balance,
      };
    case 'setActiveNetwork':
      return {
        ...walletState,
        activeNetwork: action.payload,
      };
    case 'setActiveWallet':
      return {
        ...walletState,
        activeWallet: action.payload.address,
      };
    default:
      return walletState;
  }
};
