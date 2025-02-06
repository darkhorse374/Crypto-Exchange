const bip39 = require('bip39')
const HDKey = require('hdkey')
const axios = require('axios')
const ETH_ACCOUNT_PATH = `m/44'/60'/0'`
const Web3 = require('web3');
const crypto = require('crypto');
const algorithm = "aes-256-cbc";
const initSeed = "MGLWalletInitKey";
const secSeed = "MGLWalletSecurityWithSecurityKey";
const mainTokenList = require('./polygon.json')
const testTokenList = require('./polygon_testnet.json')
const dotenv = require('dotenv');
dotenv.config();
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

const networks=[
    {
      name:"Mainnet (Polygon)",
      url:"polygon-mainnet",
      explorer:"https://polygonscan.com/", 
      routerAddr:"0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
      baseTokenAddr:"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      usdAddr:"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      usdDecimal:6
    },
    {name:"Tesnet (Polygon)",url:"polygon-testnet",explorer:"https://mumbai.polygonscan.com/"},
    {
      name:"Mainnet (BSC)",
      url:"bsc-mainnet",
      explorer:"https://bscscan.com/",
      routerAddr:"0x10ED43C718714eb63d5aA57B78B54704E256024E",
      baseTokenAddr:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      usdAddr:"0xe9e7cea3dedca5984780bafc599bd69add087d56",
      usdDecimal:18
    },
    {name:"Tesnet (BSC)",url:"bsc-testnet",explorer:"https://testnet.bscscan.com/"},
]
class Wallet {
    rpcURL;
    web3;
    network;

    constructor(network) {
        if(network === "polygon-mainnet")  {
            this.rpcURL = 'https://polygon-rpc.com:443';
        }else if(network === "polygon-testnet"){
            this.rpcURL = 'https://rpc-mumbai.maticvigil.com:443';
        }else if(network === "bsc-mainnet") {
            this.rpcURL = 'https://bsc-dataseed1.binance.org';
        }else if(network === "bsc-testnet") {
            this.rpcURL = 'https://data-seed-prebsc-1-s1.binance.org:8545';
        }
        this.web3 = new Web3(this.rpcURL);
        this.network = network
    }
    
    createWallet(userId, keyphrase) {
        // let privateKey = this.createPrivateKey(keyphrase);
        let privateKey = this.createPolygonKey();
        let publicKey = this.getPublicKey(privateKey);
        let polygon_tokensymbol ="mgl,matic";
        let polygonmain_assets ="0xcbAe2a4625c5CB99391D8F1a0F5121B3E5A176bb,0x0000000000000000000000000000000000001010";
        let polygontest_assets ="0xcbAe2a4625c5CB99391D8F1a0F5121B3E5A176bb,0x0000000000000000000000000000000000001010";
        let network ="0,1";
        let bsc_tokensymbol ="mgl,BNB,BUSD";
        let bscmain_assets = "0xcbAe2a4625c5CB99391D8F1a0F5121B3E5A176bb,0x0000000000000000000000000000000000001010,0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
        let bsctest_assets = "0xcbAe2a4625c5CB99391D8F1a0F5121B3E5A176bb,0x0000000000000000000000000000000000001010,0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
        keyphrase = this.decrypt(keyphrase)

        return {
            user_id:userId,
            publickey:publicKey,
            privatekey:privateKey,
            keyphrase:keyphrase,
            polygon_tokensymbol:polygon_tokensymbol,
            polygonmain_assets:polygonmain_assets,
            polygontest_assets:polygontest_assets,
            network:network,
            bsc_tokensymbol:bsc_tokensymbol,
            bscmain_assets:bscmain_assets,
            bsctest_assets:bsctest_assets
        }
    }

    createPrivateKey(mnemonic) {
        let seed = bip39.mnemonicToSeedSync(mnemonic)
        let masterHdKey = HDKey.fromMasterSeed(seed)
        let ethAccountKey = masterHdKey.derive(ETH_ACCOUNT_PATH + '/0/0')
        let ethPrivateKey = ethAccountKey.privateKey
        let privatekey = ethPrivateKey.toString('hex')
        return privatekey
    }

    createPolygonKey() {
        // const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        const account = this.web3.eth.accounts.create();
        return account.privateKey.slice(2,account.privateKey.length)
    }

    encrypt(str) {
        const initVector = Buffer.from(initSeed);
        const securityKey = Buffer.from(secSeed);
        const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
        let encryptedKey = cipher.update(str, "utf-8", "hex");
        encryptedKey += cipher.final("hex");
        return encryptedKey
    }

    decrypt(str) {
        const initVector = Buffer.from(initSeed);
        const securityKey = Buffer.from(secSeed);
        const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
        let decryptedKey = decipher.update(str, "hex", "utf-8");
        decryptedKey += decipher.final("utf-8");
        return decryptedKey
    }
    
    async getTokenBalances(publicKey, assets) {
        let asset = assets.split(',');
        let result = {};

        for (let i=0; i < asset.length; i ++) {
            let contract = new this.web3.eth.Contract(minABI, asset[i]);
            let balance = await contract.methods.balanceOf(publicKey).call();
            result[asset[i]] = balance
        }
        return result
    }

    async getBalance(publicKey, symbols, assets) {
        let symbol = symbols.split(',');
        let asset = assets.split(',');
        let result = {};
        for (let i=0; i < asset.length; i ++) {
            // if (asset[i] === "0x0000000000000000000000000000000000001010" && this.network === "bsc-mainnet") {
            //     let balance = await this.web3.eth.getBalance(publicKey);
            //     let price = await this.getSingleTokenPrice("BNB");
            //     result[asset[i]] = {balance:balance, price:price}
            // } else {
            //     let contract = new this.web3.eth.Contract(minABI, asset[i]);
            //     let balance = await contract.methods.balanceOf(publicKey).call();
            //     let price = await this.getSingleTokenPrice(symbol[i]);
            //     result[asset[i]] = {balance:balance, price:price}
            // }
            result[asset[i]] = {balance:0, price:0}
        }
        return result
    }

    async sendToken(privateKey, source, destination, token, amount, gasLimit, gasPrice) {
        try {
            if (token === "0x0000000000000000000000000000000000001010") {
                let nonce = this.web3.eth.getTransactionCount(source)
                let tx = {
                    'nonce' : nonce,
                    'to' : destination,
                    'value' : amount * 1e18,
                    'gas' : gasLimit,   //  3000000,
                    'gasPrice' : gasPrice * 1e9 //  10*1e9,
                }
                let signed_tx = await this.web3.eth.accounts.signTransaction(tx, privateKey)
                let result = await this.web3.eth.sendSignedTransaction(signed_tx.rawTransaction)
                return {hash:result.transactionHash, amount:amount * 1e18}
            } else {
                let contract = new this.web3.eth.Contract(minABI, token);
                let decimal = await contract.methods.decimals().call();
                let val = amount * (Math.pow(10,decimal));
                let value = "0x"+val.toString(16)
                let transfer = await contract.methods.transfer(destination, value);
                let encodedABI = transfer.encodeABI();
                let tx = {
                    'from' : source,
                    'to' : token,
                    'gas' : gasLimit,    // 3000000,
                    'data' : encodedABI
                }
                let signed_tx = await this.web3.eth.accounts.signTransaction(tx, privateKey);
                let result = await this.web3.eth.sendSignedTransaction(signed_tx.rawTransaction);
                return {hash:result.transactionHash, amount:val};
            }
        } catch (error) {
            return {error:error}
        }
    }

    async receiveToken(oldBalance, publicKey, assets) {
        let asset = assets.split(',');
        let result = [];
        let newBalance = await this.getTokenBalances(publicKey, assets);
        for (let i = 0; i < asset.length; i ++) {
            let change = newBalance[asset[i]] - oldBalance[asset[i]].balance;
            if (change > 0) {
                result.push({token:asset[i], change:change});
            }
        }
        return result
    }

    async getTokenPrice(assets) {
        let asset = assets.split(',');
        let result = {};
        for (let i = 0; i < asset.length; i ++) {
            result[asset[i]] = await this.getSingleTokenPrice(asset[i]);
        }
        return result
    }

    async updateTopToken() {
        let qs = `?start=1&limit=10&convert=USD`
        try {
            let result = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'+qs, {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.COINMARKET_APIKEY,
                }
            });
            return result.data.data
        } catch (error) {
            // console.log(error)
            return {error:error}
        }
    }

    async getSingleTokenPrice(symbol) {
        let qs = `?symbol=${symbol}`
        try {
            let result = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'+qs, {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.COINMARKET_APIKEY,
                }
            });
            return result.data.data[symbol.toUpperCase()].quote.USD.price
        } catch (error) {
            // console.log(error)
            return 0
        }
    }

    getPublicKey(privateKey) {
        const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
        return account.address.toLowerCase()
    }

    async getTokenPriceInUsd(networkUrl, tokenAddr) {
        try {
            let network = networks[2];
            if(networkUrl === "polygon-mainnet")  {
                network = networks[0]
            }else if(networkUrl === "polygon-testnet"){
                network = networks[1];
            }else if(networkUrl === "bsc-mainnet") {
                network = networks[2];
            }else if(networkUrl === "bsc-testnet") {
                network = networks[3]
            }
            const ROUTER_ABI = [
                {
                    "type": "function",
                    "stateMutability": "view",
                    "outputs": [
                        {
                            "type": "uint256[]",
                            "name": "amounts",
                            "internalType": "uint256[]"
                        }
                    ],
                    "name": "getAmountsOut",
                    "inputs": [
                        {
                            "type": "uint256",
                            "name": "amountIn",
                            "internalType": "uint256"
                        }, {
                            "type": "address[]",
                            "name": "path",
                            "internalType": "address[]"
                        }
                    ]
                }
            ]
            let web3 = new Web3(this.getRpcUrl(network.url))
            const routerContract = new web3.eth.Contract(ROUTER_ABI, network.routerAddr);
            let res = await routerContract.methods.getAmountsOut('1000000000000000000', [network.baseTokenAddr, network.usdAddr]).call()
            const basePrice = Number(res[1]) / Math.pow(10, network.usdDecimal); 
            if (tokenAddr === "0x0000000000000000000000000000000000001010") {
                return basePrice
            }
    
            //console.log('base price', basePrice, tokenAddr, network.baseTokenAddr)
            let {decimal} = await getTokenBaseInfo(tokenAddr, network.url);
            let amount = await routerContract.methods.getAmountsOut(Math.pow(10,decimal)+"", [tokenAddr, network.baseTokenAddr]).call()
            //console.log('what is s', amount)
            return amount[1] / Math.pow(10, 18) * basePrice
        } catch (error) {
            console.log('this is error', error)
            return 0;
        }
        
    }

    getRpcUrl(network) {
        if(network === "polygon-mainnet")  {
               return 'https://polygon-rpc.com:443';
           }else if(network === "polygon-testnet"){
               return 'https://rpc-mumbai.maticvigil.com:443';
           }else if(network === "bsc-mainnet") {
               return 'https://bsc-dataseed1.binance.org';
           }else if(network === "bsc-testnet") {
               return 'https://data-seed-prebsc-1-s1.binance.org:8545';
           }
           else return false;
   }
}

module.exports = Wallet