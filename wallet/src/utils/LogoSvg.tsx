import React from 'react';
import {Avax, Bnb, Ethereum, Evmos} from '../assets/Svg';
import Polygon from '../assets/Svg/Polygon';

type chainId =
  | '0x01'
  | '0x05'
  | '0x89'
  | '0x013881'
  | '0x38'
  | '0x61'
  | '0xa86a'
  | '0xa869'
  | '0x19'
  | '0x0152'
  | '0x2329'
  | '0x2328'
  | '0x2329'
  | '0x2328';

interface Props {
  chainId: chainId;
}

export const LogoSvg = ({chainId}: Props) => {
  switch (chainId) {
    case '0x01':
      return <Ethereum />;
      break;
    case '0x05':
      return <Ethereum />;
      break;
    case '0x89':
      return <Polygon />;
      break;
    case '0x013881':
      return <Polygon />;
      break;
    case '0x38':
      return <Bnb />;
      break;
    case '0x61':
      return <Bnb />;
      break;
    case '0xa86a':
      return <Avax />;
      break;
    case '0xa869':
      return <Avax />;
      break;
    case '0x2328':
      return <Evmos />;
      break;
    case '0x2329':
      return <Evmos />;
      break;
    default:
      return <Ethereum />
      break;
  }

 
};
