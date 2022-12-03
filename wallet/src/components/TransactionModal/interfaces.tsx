
export interface TransactionRespond {
  hash: string;
  nonce: string;
  transaction_index: string;
  from_address: string;
  to_address: string | null;
  value: string;
  gas: string;
  gas_price: string;
  input: string;
  receipt_cumulative_gas_used: string;
  receipt_gas_used: string;
  receipt_contract_address: string | null;
  receipt_root: string | null;
  receipt_status: string;
  block_timestamp: string;
  block_number: string;
  block_hash: string;
  transfer_index: any;
}
 export interface Props{
  isModalVisible:boolean,
  toggleModal:()=>void,
  entry:TransactionRespond,
  setModalEntry:any
 }