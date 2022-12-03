import { ethers } from 'ethers';

class WalletErrors{

    public static walletErrors(error: any){
//ether error code
if (error.code === "CALL_EXCEPTION") {
  return {
    code: ethers.errors.CALL_EXCEPTION,
    message: error.message.split(",")[6],
  };
}

if (error.code === "INSUFFICIENT_FUNDS") {
  return {
    code:  ethers.errors.INSUFFICIENT_FUNDS,
    message: error.message,
  };
}

if (error.code === "NETWORK_ERROR") {
  return {
    code: ethers.errors.NETWORK_ERROR,
    message: error.message,
  };
}

if (error.code === "NONCE_EXPIRED") {
  return {
    code: ethers.errors.NONCE_EXPIRED,
    message: error.message,
  };
}

if (error.code === "TRANSACTION_REPLACED") {
  return {
    code: ethers.errors.TRANSACTION_REPLACED,
    message: error.message,
  };
}

if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
  return {
    code: ethers.errors.UNPREDICTABLE_GAS_LIMIT,
    message: error.message,
  };
}

if (error.code === "REPLACEMENT_UNDERPRICED") {
  return {
    code: ethers.errors.REPLACEMENT_UNDERPRICED,
    message: error.message,
  };
}
//Generic Error Codes
if (error.code === "NOT_IMPLEMENTED") {
  return {
    code:  ethers.errors.NOT_IMPLEMENTED,
    message: error.message,
  };
}

if (error.code === "SERVER_ERROR") {
  return {
    code:  ethers.errors.SERVER_ERROR,
    message: error.message,
  };
}

if (error.code === "TIMEOUT") {
  return {
    code:  ethers.errors.TIMEOUT,
    message: error.message,
  };
}

if (error.code === "UNKNOWN_ERROR") {
  return {
    code:  ethers.errors.UNKNOWN_ERROR,
    message: error.message,
  };
}

if (error.code === "UNSUPPORTED_OPERATION") {
  return {
    code:  ethers.errors.UNSUPPORTED_OPERATION,
    message: error.message,
  };
}


if (error.code === "INVALID_ARGUMENT") {
  return {
    code: ethers.errors.INVALID_ARGUMENT,
    message: error.message,
  };
}

//Safety Error Codes
if (error.code === "BUFFER_OVERRUN") {
  return {
    code: ethers.errors.BUFFER_OVERRUN,
    message: error.message,
  };
}

if (error.code === "NUMERIC_FAULT") {
  return {
    code: ethers.errors.NUMERIC_FAULT,
    message: error.message,
  };
}

//Usage Error Codes

if (error.code === "INVALID_ARGUMENT") {
  return {
    code: ethers.errors.INVALID_ARGUMENT,
    message: error.message,
  };
}

if (error.code === "MISSING_ARGUMENT") {
  return {
    code: ethers.errors.MISSING_ARGUMENT,
    message: error.message,
  };
}

if (error.code === "MISSING_NEW") {
  return {
    code: ethers.errors.MISSING_NEW,
    message: error.message,
  };
}

if (error.code === "UNEXPECTED_ARGUMENT") {
  return {
    code: ethers.errors.UNEXPECTED_ARGUMENT,
    message: error.message,
  };
}



if(!error.code){
  return {
    code: 400,
    message: error.message,
  }
}

return error;
    }

    public static errorProvider(){
      const ErrorProvide = () => {
        return {
          code: 500,
          message: "invalid rpc port",
        };
    }
}
}

export default WalletErrors




