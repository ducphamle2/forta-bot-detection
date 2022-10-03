const { Finding, FindingSeverity, FindingType } = require('forta-agent');

// load config file
const config = require('../agent-config.json');

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

function createAlert(name, address, normalizedValue, from, to, abbrev, type, severity) {
  return Finding.fromObject({
    name: `High ${name} transfer`,
    description: `A large amount (${normalizedValue}) from ${name} with address: ${address} has been transferred from ${from} to ${to}`,
    alertId: `${developerAbbrev}-${abbrev}-ADDRESS-WATCH`,
    type: FindingType[type],
    severity: FindingSeverity[severity],
  });
}

async function handleTransaction(txEvent) {
  const findings = [];
  const txAddrs = Object.keys(txEvent.addresses).map((address) => address.toLowerCase());

  // check if an address in the watchlist was the initiator of the transaction
  contractList.forEach((contract, index) => {
    if (txAddrs.includes(contract.address.toLowerCase())) {
      const contractEvents = txEvent.filterLog(contract.event, contract.address);

      // process contract events
      contractEvents.forEach((event) => {
        // extract transfer event arguments
        const { to, from, value } = event.args;
        // shift decimals of transfer value
        const normalizedValue = value.toString();

        // if more than 10,000 Forta were transferred, report it
        if (normalizedValue > 0) {
          findings.push(createAlert(contract.name, contract.address, normalizedValue, from, to, protocolAbbrev, contract.watch.type, contract.watch.severity));
        }
      });
    }
  });

  return findings;
}

module.exports = {
  handleTransaction,
};
