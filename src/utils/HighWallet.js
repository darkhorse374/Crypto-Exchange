const bip39 = require('bip39')
const crypto = require('crypto');
const algorithm = "aes-256-cbc";
const initSeed = "MGLWalletInitKey";
const secSeed = "MGLWalletSecurityWithSecurityKey";
const Web3 = require('web3');
var minABI = [
    // balanceOf
    {
        "constant":true,
        "inputs":[{"name":"_owner","type":"address"}],
        "name":"balanceOf",
        "outputs":[{"name":"balance","type":"uint256"}],
        "type":"function"
    },
    // decimals
    {
        "constant":true,
        "inputs":[],
        "name":"decimals",
        "outputs":[{"name":"","type":"uint8"}],
        "type":"function"
    },
    //transfer
    {
        "constant":false,
        "inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],
        "name":"transfer",
        "outputs":[{"name":"","type":"bool"}],
        "type":"function"
    }
];
export default class Wallet {
    constructor(networkUrl, privateKey, publicKey) {
        if(networkUrl === "polygon-mainnet")  {
            this.rpcURL = 'https://polygon-rpc.com:443';
        }else if(networkUrl === "polygon-testnet"){
            this.rpcURL = 'https://rpc-mumbai.maticvigil.com:443';
        }else if(networkUrl === "bsc-mainnet") {
            this.rpcURL = 'https://bsc-dataseed1.binance.org:443';
        }else if(networkUrl === "bsc-testnet") {
            this.rpcURL = 'https://bsc-dataseed1.binance.org:443';
        }
        this.networkUrl = networkUrl;
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }
    
    async sendToken(destination, token, amount ) {
        let web3 = new Web3(this.rpcUrl);
        try {
            if (token === "0x0000000000000000000000000000000000001010") {
                let nonce = web3.eth.getTransactionCount(this.publicKey)
                let tx = {
                    'nonce' : nonce,
                    'to' : destination,
                    'value' : amount * 1e18,
                    'gas' : 3000000,
                    'gasPrice' : 10*1e9,
                }
                let signed_tx = await web3.eth.accounts.signTransaction(tx, this.privateKey)
                let result = await web3.eth.sendSignedTransaction(signed_tx.rawTransaction)
                return {hash:result.transactionHash, amount:amount * 1e18}
            } else {
                let contract = new web3.eth.Contract(minABI, token);
                let decimal = contract.methods.decimal();
                let value = amount * (Math.pow(10,decimal));
                let transfer = await contract.methods.transfer(destination, value);
                let encodedABI = transfer.encodedABI();
                let tx = {
                    'from' : this.publicKey,
                    'to' : destination,
                    'gas' : 3000000,
                    'data' : encodedABI
                }
                let signed_tx = await web3.eth.accounts.signTransaction(tx, this.privateKey);
                let result = await web3.eth.sendSignedTransaction(signed_tx.rawTransaction);
                return {hash:result.transactionHash, amount:value};
            }
        } catch (error) {
            console.log(error)
        }
    }
    setKey(publicKey, privateKey){
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }
    setNetwork(networkUrl){
        if(networkUrl === "polygon-mainnet")  {
            this.rpcURL = 'https://polygon-rpc.com:443';
        }else if(networkUrl === "polygon-testnet"){
            this.rpcURL = 'https://rpc-mumbai.maticvigil.com:443';
        }else if(networkUrl === "bsc-mainnet") {
            this.rpcURL = 'https://bsc-dataseed1.binance.org:443';
        }else if(networkUrl === "bsc-testnet") {
            this.rpcURL = 'https://bsc-dataseed1.binance.org:443';
        }
    }
    getKey(){
        return this.publicKey;
    }
    getNetworkUrl(){
        return this.networkUrl;
    }
}