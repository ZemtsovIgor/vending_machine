import ConfigInterface from "../lib/ConfigInterface";
import * as Networks from "../lib/Networks";

const Config: ConfigInterface = {
  testnet: Networks.ethereumTestnet,
  mainnet: Networks.ethereumMainnet,
  contractName: "VendingMachine",
  chocolatesAmount: 30,
  watersAmount: 40,
  chipsAmount: 50,
  contractAddress: "0x1b50a812f732B9b0826bc733EAcC5aBcd62AcBb9",
};

export default Config;
