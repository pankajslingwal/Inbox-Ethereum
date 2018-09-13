const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');


const provider = new HDWalletProvider(
    'exact front interest phrase return chase buyer museum mask gesture winner ladder',
     'https://rinkeby.infura.io/v3/e569d7bdf17344e2876af5384559c5e7'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('first account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data : bytecode, arguments : ['Hi there!'] })
    .send({ gas : '1000000', from : accounts[0] });

    console.log('console deploye to : ', result.options.address);
};

deploy();

