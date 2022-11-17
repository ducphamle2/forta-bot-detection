const { Finding, FindingSeverity, FindingType } = require('forta-agent');
const { fortaContract } = require('../../scripts/utils');
require('dotenv').config('../../.env');
const Web3 = require('web3');
const web3 = new Web3(process.env.POLYGON_WS);

// load config and abi files
const config = require(process.env.NODE_ENV === 'prod' ? '../agent-config-prod.json' : '../agent-config.json');
const fortaArtifacts = require('../../artifacts/contracts/Forta.sol/FortaToken.json');

// load configuration data from agent config file
const {
  developerAbbreviation: developerAbbrev,
  protocolAbbrev,
  contracts,
} = config;

// get list of addresses to watch
const contractList = Object.values(contracts);
if (contractList.length === 0) {
  throw new Error('Must supply at least one address to watch');
}

function createAlert(name, normalizedValue, abbrev, type, severity, remainingBalance, tokenSymbol) {
  return Finding.fromObject({
    name: `Unstake ${name} event`,
    description: `After the unstaking event with total rewards amount: ${normalizedValue}, the balance of the owner that can be used to reward stakers has dropped to ${remainingBalance} ${tokenSymbol}, which is below the threshold. Needs to top-up now`,
    alertId: `${developerAbbrev}-${abbrev}-ADDRESS-WATCH`,
    type: FindingType[type],
    severity: FindingSeverity[severity],
  });
}

async function handleTransaction(txEvent) {
  const findings = [];
  const txAddrs = Object.keys(txEvent.addresses).map((address) => address.toLowerCase());
  // query balance of the owner. If it belows a certain threshold then we create a new alert
  const ownerFortaBalance = await queryStakingOwnerFortaBalance();
  const fortaSymbol = await queryFortaTokenSymbol();

  // check if an address in the watchlist was the initiator of the transaction
  contractList.forEach((contract, index) => {
    if (txAddrs.includes(contract.address.toLowerCase())) {
      const contractEvents = txEvent.filterLog(contract.event, contract.address);

      // process contract events
      contractEvents.forEach((event) => {
        // extract transfer event arguments
        console.log("event: ", event)
        const { _address, amount } = event.args;
        console.log("value: ", amount)
        // shift decimals of transfer value
        const normalizedValue = amount.toString();

        console.log("owner forta balance: ", ownerFortaBalance, ownerFortaBalance < 10000000);
        // if owner balance is less than 10000000, then report it
        if (ownerFortaBalance < 10000000) {
          findings.push(createAlert(contract.name, normalizedValue, protocolAbbrev, contract.watch.type, contract.watch.severity, ownerFortaBalance, fortaSymbol));
        }
      });
    }
  });

  return findings;
}

function getFortaContract() {
  return new web3.eth.Contract(fortaArtifacts.abi, fortaContract);
}

async function queryFortaTokenSymbol() {
  const forta = getFortaContract();
  return await forta.methods.symbol().call();
}

async function queryStakingOwnerFortaBalance() {
  const { address } = web3.eth.accounts.privateKeyToAccount(process.env.DEVELOPER_PRIVATE_KEY);
  const forta = getFortaContract();
  const result = await forta.methods.balanceOf(address).call();
  return result;
}

module.exports = {
  handleTransaction,
};
