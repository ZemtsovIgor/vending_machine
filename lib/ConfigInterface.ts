import NetworkConfigInterface from '../lib/NetworkConfigInterface';

export default interface ConfigInterface {
  testnet: NetworkConfigInterface;
  mainnet: NetworkConfigInterface;
  contractName: string;
  chocolatesAmount: number;
  watersAmount: number;
  chipsAmount: number;
  contractAddress: string|null;
};
