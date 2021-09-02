// import Web3 from 'web3';
const Web3 = require('web3');
const bs58 = require('bs58')

const address = 'QmTfCejgo2wTwqnDJs8Lu1pCNeCrCDuE4GAwkna93zdd7d'
const bytes = bs58.decode(address)
console.log(bytes.toString('hex'))
console.log(Web3.utils.hexToBytes('0x' + bytes.toString('hex')));
console.log(Web3.utils.hexToBytes('0x' + bytes.toString('hex')).length);
function unpack(str) {
    var bytes = [];
    for(var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        bytes.push(char >>> 8);
        bytes.push(char & 0xFF);
    }
    return bytes;
}

console.log(unpack("QmTfCejgo2wTwqnDJs8Lu1pCNeCrCDuE4GAwkna93zdd7d").toString('hex'));
console.log(unpack("QmTfCejgo2wTwqnDJs8Lu1pCNeCrCDuE4GAwkna93zdd7d").length);