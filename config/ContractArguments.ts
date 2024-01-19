import Config from './Config';

const ContractArguments = [
  Config.chocolatesAmount,
  Config.watersAmount,
  Config.chipsAmount,
] as const;

export default ContractArguments;
