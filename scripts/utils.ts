import * as dotenv from 'dotenv'
dotenv.config()

const contractAddress = process.env.CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractName = process.env.CONTRACT_NAME || "FortaToken";

export { contractAddress, contractName };