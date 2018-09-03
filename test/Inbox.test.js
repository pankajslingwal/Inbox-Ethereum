const assert  = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;


beforeEach(async () => {
    //get a list of all lcal accoutn from ganache
    // web3.eth.getAccounts()
    // .then(fethcedAccounts => {
    //     console.log(fethcedAccounts);
    // });

    accounts = await web3.eth.getAccounts();

    //use one of those account to deply to network
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi There']})
    .send({from: accounts[0], gas:'1000000'});

    inbox.setProvider(provider);
});


describe('Inbox',() => {
    it('deploys a contract', ()=> {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async ()=> {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi There');
    });
}); 

// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vrooom !!';
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// });

// describe('Car', ()=> {
//     it('can park', ()=> {
//         assert.equal(car.park(), 'stopped');
//     })

//     it('can drive', ()=> {
//         assert.equal(car.drive(), 'vrooom !!');
//     })
// });