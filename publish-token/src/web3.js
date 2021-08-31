import Web3 from 'web3';
var web3;
try{
    web3 = new Web3(window.ethereum);
}catch(error){
    web3 = new Web3('ws://localhost:8546');
}
export default web3;