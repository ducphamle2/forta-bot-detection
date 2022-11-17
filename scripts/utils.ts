import * as dotenv from 'dotenv'
dotenv.config({ path: process.env.NODE_ENV === 'prod' ? '../.env' : `../.env.${process.env.NODE_ENV}`, override: true })

const fortaContract = process.env.FORTA_CONTRACT || "0x4788A901dE8Cb3B1d7461DA4211ef8445bd6FdFA";
const stakingContract = process.env.STAKING_CONTRACT || "0x0a04F8295701F52ee6ec6238424B7A144270E8d4";
const contractName = process.env.CONTRACT_NAME || "FortaToken";

export { fortaContract, stakingContract, contractName };