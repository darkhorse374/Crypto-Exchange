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
    createMnemonic() {
        let mnemonic = bip39.generateMnemonic(128);
        return mnemonic
    }

    encrypt(str) {
        const initVector = Buffer.from(initSeed);
        const securityKey = Buffer.from(secSeed);
        const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
        let encryptedData = cipher.update(str, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        return encryptedData
    }
    
    decrypt(str) {
        const initVector = Buffer.from(initSeed);
        const securityKey = Buffer.from(secSeed);
        const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
        let decryptedKey = decipher.update(str, "hex", "utf-8");
        decryptedKey += decipher.final("utf-8");
        return decryptedKey
    }
    static async sendToken(privateKey, source, destination, token, amount,rpcUrl,tokenList) {
        let web3 = new Web3(rpcUrl);
        try {
            console.log('token address', token)
            if (token === "0x0000000000000000000000000000000000001010") {
                let nonce = web3.eth.getTransactionCount(source)
                let tx = {
                    'nonce' : nonce,
                    'to' : destination,
                    'value' : amount * 1e18,
                    'gas' : 3000000,
                    'gasPrice' : 10*1e9,
                }
                let signed_tx = await web3.eth.accounts.signTransaction(tx, privateKey)
                let result = await web3.eth.sendSignedTransaction(signed_tx.rawTransaction)
                return {hash:result.transactionHash, amount:amount * 1e18}
            } else {
                let contract = new web3.eth.Contract(minABI, token);
                let decimal = tokenList[token].decimals;
                let value = amount * (Math.pow(10,decimal));
                let transfer = await contract.methods.transfer(destination, value);
                let encodedABI = transfer.encodedABI();
                let tx = {
                    'from' : source,
                    'to' : destination,
                    'gas' : 3000000,
                    'data' : encodedABI
                }
                let signed_tx = await web3.eth.accounts.signTransaction(tx, privateKey);
                let result = await web3.eth.sendSignedTransaction(signed_tx.rawTransaction);
                return {hash:result.transactionHash, amount:value};
            }
        } catch (error) {
            console.log(error)
            return ""
        }
    }
}