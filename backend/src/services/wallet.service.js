const WalletModel = require('../models/wallet.model');
const UserModel = require("../models/user.model");
const TransactionModel = require("../models/transaction.model");
const ManageUserModel = require('../models/manageUser.model');
const TopTokenModel = require('../models/topToken.model');
const Role = require('../utils/userRoles.utils');
const Wallet = require('../utils/wallet.utils');
const bcrypt = require('bcryptjs');
const mainTokenList = require('../utils/polygon.json');
const testTokenList = require('../utils/polygon_testnet.json');
const {BNB_ADDRESS, COIN_AMOUNT, ADMIN_GAS_LIMIT, ADMIN_GAS_PRICE} = require('../utils/constants');
const emailService = require('./emailer.service');
const i18n = require('i18n');

class WalletService {
    constructor() {

    }

    static async createWallet(userId, keyphrase, locale) {
        let user = await UserModel.findOne({id:userId});
        if(!user) {
            return {response: false, message: "You are not registered user.", data: null};
        }

        let wallet = new Wallet("polygon-mainnet").createWallet(userId, keyphrase)
        
        let result = await WalletModel.create(wallet);
        if (!result) {
            return {response:false, message:"Wallet creation failed.", data:null}
        }
        if (result.error) {
            return {response:false, message:result.error, data:null}
        }
        let privateKey = new Wallet().encrypt(wallet.privatekey)
        await ManageUserModel.update({have_wallet:true, wallet_address:wallet.publickey}, userId)

        const subject = i18n.__({phrase: "MGL Exchange - Wallet Created Sucessfully", locale: locale})
        const body = i18n.__({phrase: "Your MGL Exchange wallet has been created sucessfully. Thank you.", locale: locale});
        emailService.deliverEmail(user.email, subject, body)

        return {response:true, message:"success", data:{publicKey:wallet.publickey, privateKey: privateKey}}
    }

    static async accessWalletWithPrivateKey(rawData, userId) {
        rawData.privateKey = new Wallet().decrypt(rawData.privateKey)      
        let wallet = await WalletModel.findOne({privatekey:rawData.privateKey});
        
        if (!wallet) {
            return {response:false, message:'Wrong private key.', data:null}
        }
        if (wallet.user_id !== userId) {
            return {response:false, message:"This is not your wallet.", data:null};
        }

        if (!rawData.network) rawData.network = "polygon-mainnet"

        if (rawData.network === "polygon-mainnet" ){
            let privateKey = new Wallet().encrypt(wallet.privatekey)
            return {response:true, message:"Success", data:{publicKey:wallet.publickey, privateKey: privateKey}}
        } else if (rawData.network === "polygon-testnet" ) {
            let privateKey = new Wallet().encrypt(wallet.privatekey)
            return {response:true, message:"Success", data:{publicKey:wallet.publickey, privateKey: privateKey}}
        } else if (rawData.network === "bsc-mainnet"){
            let privateKey = new Wallet().encrypt(wallet.privatekey)
            return {response:true, message:"Success", data:{publicKey:wallet.publickey, privateKey: privateKey}}
        } else if (rawData.network === "bsc-testnet") {
            let privateKey = new Wallet().encrypt(wallet.privatekey)
            return {response:true, message:"Success", data:{publicKey:wallet.publickey, privateKey: privateKey}}
        }
    }

    static async accessWalletWithKeyphrase(rawData, userId) {
        rawData.keyphrase = new Wallet().decrypt(rawData.keyphrase)
        let wallet = await WalletModel.findOne({keyphrase:rawData.keyphrase});
        if(!wallet) {
            return {response:false, message:'Wrong KeyPhrase.', data:null};
        }
        if (wallet.user_id !== userId) {
            return {response:false, message:"This is not your wallet.", data:null};
        }

        if (!rawData.network) rawData.network = "polygon-mainnet"
        
        if (rawData.network === "polygon-mainnet" ){
            let privateKey = new Wallet().encrypt(wallet.privatekey)
            return {response:true, message:"Success", data:{publicKey:wallet.publickey, privateKey: privateKey}}
        } else if (rawData.network === "polygon-testnet" ) {
            let privateKey = new Wallet().encrypt(wallet.privatekey)
            return {response:true, message:"Success", data:{publicKey:wallet.publickey, privateKey: privateKey}}
        } else if (rawData.network === "bsc-mainnet"){
            let privateKey = new Wallet().encrypt(wallet.privatekey)
            return {response:true, message:"Success", data:{publicKey:wallet.publickey, privateKey: privateKey}}
        } else if (rawData.network === "bsc-testnet") {
            let privateKey = new Wallet().encrypt(wallet.privatekey)
            return {response:true, message:"Success", data:{publicKey:wallet.publickey, privateKey: privateKey}}
        }
    }

    static async addToken(rawData, userId) {
        let wallet = await WalletModel.findOne({publickey:rawData.publicKey});
        if (wallet.user_id !== userId) {
            return {response:false, message:"This is not your wallet.", data:null};
        }
        let assets = "";
        let result = "";
        let symbols = "";
        if (!rawData.network) rawData.network = "polygon-mainnet"

        if (rawData.network === "polygon-mainnet") {
            if (wallet.polygonmain_assets.includes(rawData.token))
                return {response:false, message: "Already added.", data:null}
            assets = wallet.polygonmain_assets + "," + rawData.token_address;
            symbols = wallet.polygon_tokensymbol + "," + rawData.token_symbol;
            result = await WalletModel.update({polygon_tokensymbol:symbols, polygonmain_assets:assets}, wallet.id);
        } else if (rawData.network === "polygon-testnet") {
            if (wallet.polygontest_assets.includes(rawData.token))
                return {response:false, message: "Already added.", data:null}
            assets = wallet.polygontest_assets + "," + rawData.token_address;
            symbols = wallet.polygon_tokensymbol + "," + rawData.token_symbol;
            result = await WalletModel.update({polygon_tokensymbol:symbols, polygontest_assets:assets}, wallet.id);
        } else if (rawData.network === "bsc-mainnet"){
            if (wallet.bscmain_assets.includes(rawData.token))
                return {response:false, message: "Already added.", data:null}
            assets = wallet.bscmain_assets + "," + rawData.token_address;
            symbols = wallet.bsc_tokensymbol + "," + rawData.token_symbol;
            result = await WalletModel.update({bsc_tokensymbol:symbols, bscmain_assets:assets}, wallet.id);
        } else if (rawData.network === "bsc-testnet"){
            if (wallet.bsctest_assets.includes(rawData.token))
                return {response:false, message: "Already added.", data:null}
            assets = wallet.bscmain_assets + "," + rawData.token_address;
            symbols = wallet.bsc_tokensymbol + "," + rawData.token_symbol;
            result = await WalletModel.update({bsc_tokensymbol:symbols, bsctest_assets:assets}, wallet.id);
        }
        if (result === "") {
            return {response:false, message:"Token was not added.", data:false}
        }
        if (result.error) {
            return {response:false, message:result.error, data:false}
        }
        return {response: true, message:"success", data:assets.split(",")}
    }

    static async getBalance(rawData, userId) {
        let wallet = await WalletModel.findOne({publickey:rawData.publicKey});
        if (wallet.user_id !== userId) {
            return {response:false, message:"This is not your wallet.", data:null};
        }

        if (!rawData.network) rawData.network = "polygon-mainnet"

        if (rawData.network === "polygon-mainnet") {
            let result = await new Wallet(rawData.network).getBalance(wallet.publickey, wallet.polygon_tokensymbol, wallet.polygonmain_assets);
            return {response:true, message:"Success", data:result}
        } else if (rawData.network === "polygon-testnet") {
            let result = await new Wallet(rawData.network).getBalance(wallet.publickey, wallet.polygon_tokensymbol, wallet.polygontest_assets);
            return {response:true, message:"Success", data:result}
        } else if (rawData.network === "bsc-mainnet") {
            let result = await new Wallet(rawData.network).getBalance(wallet.publickey, wallet.bsc_tokensymbol, wallet.bscmain_assets);
            return {response:true, message:"Success", data:result}
        } else if (rawData.network === "bsc-testnet") {
            let result = await new Wallet(rawData.network).getBalance(wallet.publickey, wallet.bsc_tokensymbol, wallet.bsctest_assets);
            return {response:true, message:"Success", data:result}
        }
    }

    static async getPrice(rawData, userId) {
        let wallet = await WalletModel.findOne({publickey:rawData.publicKey});
        if (wallet.user_id !== userId) {
            return {response:false, message:"This is not your wallet.", data:null};
        }

        if (!rawData.network) rawData.network = "polygon-mainnet"

        if (rawData.network === "polygon-mainnet") {
            let result = await new Wallet(rawData.network).getTokenPrice(wallet.polygonmain_assets);
            return {response:true, message:"Success", data:result}
        } else if (rawData.network === "polygon-testnet") {
            let result = await new Wallet(rawData.network).getTokenPrice(wallet.polygontest_assets);
            return {response:true, message:"Success", data:result}
        } else if (rawData.network === "bsc-mainnet") {
            let result = await new Wallet(rawData.network).getTokenPrice(wallet.bscmain_assets);
            return {response:true, message:"Success", data:result}
        } else if (rawData.network === "bsc-testnet") {
            let result = await new Wallet(rawData.network).getTokenPrice(wallet.bsctest_assets);
            return {response:true, message:"Success", data:result}
        }
    }

    static async updateTopTokens() {
        const result = await new Wallet().updateTopToken();
        const tokenList = await TopTokenModel.find();
        if (tokenList.length === 0) {
            for (let i = 0; i < result.length; i ++) {
                await TopTokenModel.create({ name:result[i].name, symbol:result[i].symbol, price:result[i].quote.USD.price, daily_percent:result[i].quote.USD.percent_change_24h });
            }
        } else {
            for (let i = 0; i < result.length; i ++) {
                await TopTokenModel.update({ name:result[i].name, symbol:result[i].symbol, price:result[i].quote.USD.price, daily_percent:result[i].quote.USD.percent_change_24h}, i+1);
            }
        }
    }

    static async getTopTokens() {
        const tokenList = await TopTokenModel.find();
        if (tokenList.length === 0) {
            let result = await new Wallet().updateTopToken();
            let data = []
            for (let i = 0; i < result.length; i ++ ) {
                data.push({ name:result[i].name, symbol:result[i].symbol, price:result[i].quote.USD.price, daily_percent:result[i].quote.USD.percent_change_24h})
            }
            return {response:true, message:"Success!", data:data}
        } else {
            return {response:true, message:"Success!", data:tokenList};
        } 
    }

    static async getAssets(rawData, userId) {
        let wallet = await WalletModel.findOne({publickey:rawData.publicKey});
        if (!wallet) {
            return {response:false, message:"Wallet not found.", data:null};
        }

        if (wallet.user_id !== userId) {
            return {response:false, message:"This is not your wallet.", data:null};
        }

        if (!rawData.network) rawData.network = "polygon-mainnet"

        if (rawData.network === "polygon-mainnet") {
            // let result = await new Wallet(rawData.network).getAssets(wallet.publickey, wallet.polygonmain_assets);
            let result = wallet.polygonmain_assets.split(",");
            return {response:true, message:"Success", data:result}
        } else if (rawData.network === "polygon-testnet") {
            let result = wallet.polygontest_assets.split(",");
            return {response:true, message:"Success", data:result}
        } else if (rawData.network === "bsc-mainnet") {
            let result = wallet.bscmain_assets.split(",");
            return {response:true, message:"Success", data:result}
        } else if (rawData.network === "bsc-testnet") {
            let result = wallet.bsctest_assets.split(",");
            return {response:true, message:"Success", data:result}
        }
    }

    static async sendToken(rawData, userId) {
        let wallet = await WalletModel.findOne({publickey:rawData.publicKey});
        if (wallet.user_id !== userId) {
            return {response:false, message:"This is not your wallet.", data:null};
        }
        if (!rawData.network) rawData.network = "polygon-mainnet"
        let result = {};
        let toAdmin = false;
        if (rawData.network === "polygon-mainnet") {
            if (!wallet.polygonmain_assets.includes(rawData.token)) {
                return {response:false, message:"You don't have that token in your wallet.", data:null}
            }
            if (rawData.destination === "0x0000000000000000000000000000000000000000") {
                let admin = await UserModel.findOne({role: Role.Super});
                let adminWallet = await WalletModel.findOne({user_id: admin.id});
                rawData.destination = adminWallet.publickey;
                toAdmin = true;
            }
            result = await new Wallet(rawData.network).sendToken(wallet.privatekey, wallet.publickey, rawData.destination, rawData.token, parseFloat(rawData.amount), parseInt(rawData.gasLimit), parseInt(rawData.gasPrice));
            
        } else if (rawData.network === "polygon-testnet") {
            if (!wallet.polygontest_assets.includes(rawData.token)) {
                return {response:false, message:"You don't have that token in your wallet.", data:null}
            }
            if (rawData.destination === "0x0000000000000000000000000000000000000000") {
                let admin = await UserModel.findOne({role: Role.Super});
                let adminWallet = await WalletModel.findOne({user_id: admin.id});
                rawData.destination = adminWallet.publickey;
                toAdmin = true;
            }
            result = await new Wallet(rawData.network).sendToken(wallet.privatekey, wallet.publickey, rawData.destination, rawData.token, parseFloat(rawData.amount), parseInt(rawData.gasLimit), parseInt(rawData.gasPrice));
        } else if (rawData.network === "bsc-mainnet") {
            if (!wallet.bscmain_assets.includes(rawData.token)) {
                return {response:false, message:"You don't have that token in your wallet.", data:null}
            }
            if (rawData.destination === "0x0000000000000000000000000000000000000000") {
                let admin = await UserModel.findOne({role: Role.Super});
                let adminWallet = await WalletModel.findOne({user_id: admin.id});
                rawData.destination = adminWallet.publickey;
                toAdmin = true;
            }
            result = await new Wallet(rawData.network).sendToken(wallet.privatekey, wallet.publickey, rawData.destination, rawData.token, parseFloat(rawData.amount), parseInt(rawData.gasLimit), parseInt(rawData.gasPrice));
        } else if (rawData.network === "bsc-testnet") {
            if (!wallet.bsctest_assets.includes(rawData.token)) {
                return {response:false, message:"You don't have that token in your wallet.", data:null}
            }
            if (rawData.destination === "0x0000000000000000000000000000000000000000") {
                let admin = await UserModel.findOne({role: Role.Super});
                let adminWallet = await WalletModel.findOne({user_id: admin.id});
                rawData.destination = adminWallet.publickey;
                toAdmin = true;
            }
            result = await new Wallet(rawData.network).sendToken(wallet.privatekey, wallet.publickey, rawData.destination, rawData.token, parseFloat(rawData.amount), parseInt(rawData.gasLimit), parseInt(rawData.gasPrice));
        }

        if (result.error) {
            return {response:false, message:result.error, data:null}
        }
        let status = await TransactionModel.create({user_id:userId, hash:result.hash, from_id:wallet.publickey, to_id:rawData.destination, token:rawData.token, amount:result.amount, network:rawData.network, to_admin:toAdmin})
        // let status = await TransactionModel.create({user_id:userId,hash:rawData.hash,from_id:rawData.publicKey,to_id:rawData.destination,token:rawData.token,amount:rawData.amount, network:rawData.network});
        if (!status) {
            return {response:true, message:"Token send Success, but transaction register failed.", data:result.hash}
        }

        let user = await UserModel.findOne({id:userId});
        const sendSubject = i18n.__({phrase: "MGL Exchange: Tokens sent", locale: rawData.locale || "En"})
        const sendBody = i18n.__({phrase: "You have sent %s %s to %s", locale: rawData.locale || "En"}, rawData.amount, rawData.token, rawData.destination);
        emailService.deliverEmail(user.email, sendSubject, sendBody);

        let receiver = await ManageUserModel.findOne({publickey: rawData.destination})
        if (receiver) {
            const recvSubject = i18n.__({phrase: "MGL Exchange: Tokens received", locale: rawData.locale || "En"})
            const recvBody = i18n.__({phrase: "You have received %s %s tokens in your wallet.", locale: rawData.locale || "En"}, rawData.amount, rawData.token);
            emailService.deliverEmail(receiver.email, recvSubject, recvBody);
        }
        return {response:true, message:"Success", data:null}
    }

    static async getTransaction(rawData, userId) {
        let transactionList = await TransactionModel.findMore({from_id: rawData.publicKey, to_id:rawData.publicKey, network:rawData.network});
        return {response:true, message:"Success", data: transactionList}
    }

    static async getAdminTransaction(rawData) {
        let transactionList = await TransactionModel.findMore({to_admin: 1, network: rawData.network})
        return {response:true, message:"Success", data: transactionList}
    }

    static async receiveToken(rawData, userId) {
        let wallet = await WalletModel.findOne({publickey:rawData.publicKey});
        if (wallet.user_id !== userId) {
            return {response:false, message:"This is not your wallet.", data:null};
        }
        if (!rawData.network) rawData.network = "polygon-mainnet";
        let result = [];
        if (rawData.network === "polygon-mainnet") {
            result = new Wallet(rawData.network).receiveToken(rawData.balance, wallet.publickey, wallet.polygonmain_assets);
            if (result.length === 0) {
                return {response: false, message:"Nothing received.", data: null}
            }
            return {response:true, message:"You received some Tokens", data:result}
        } else if (rawData.network === "polygon-testnet") {
            result = new Wallet(rawData.network).receiveToken(rawData.balance, wallet.publickey, wallet.polygontest_assets);
            if (result.length === 0) {
                return {response: false, message:"Nothing received.", data: null}
            }
            return {response:true, message:"You received some Tokens", data:result}
        } else if (rawData.network === "bsc-mainnet") {
            result = new Wallet(rawData.network).receiveToken(rawData.balance, wallet.publickey, wallet.bscmain_assets);
            if (result.length === 0) {
                return {response: false, message:"Nothing received.", data: null}
            }
            return {response:true, message:"You received some Tokens", data:result}
        } else if (rawData.network === "bsc-testnet") {
            result = new Wallet(rawData.network).receiveToken(rawData.balance, wallet.publickey, wallet.bsctest_assets);
            if (result.length === 0) {
                return {response: false, message:"Nothing received.", data: null}
            }
            return {response:true, message:"You received some Tokens", data:result}
        }
    }

    static async getSecret(rawData, userId) {
        let user = await UserModel.findOne({id:userId});
        const {type, password, ...args} = rawData
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {response:false, message:'Incorrect password!', data:null}
        }
        let data = "";
        if (type === "privateKey") {
            data = await this.getPrivateKey(args)
        } else if (type === "phrase") {
            data = await this.getKeyPhrase(args)
        }
        if (!data) {
            return {response:false, message:"Wrong publicKey", data:null}
        }
        return {response:true, message:"Success", data:data}
    }

    static async getPrivateKey(rawData) {
        let wallet = await WalletModel.findOne({publickey:rawData.publicKey});
        if (!wallet) return
        if (!rawData.network) rawData.network = "polygon-mainnet"
        
        let privateKey = new Wallet(rawData.network).encrypt(wallet.privatekey)

        return privateKey
    }

    static async getKeyPhrase(rawData, userId) {
        let wallet = await WalletModel.findOne({publickey:rawData.publicKey});
        if (!wallet) return
        let keyPhrase = new Wallet(rawData.network).encrypt(wallet.keyphrase);

        return keyPhrase
    }

    static async getWalletByEmail(email) {
        let user = await UserModel.findOne({email:email});
        if (user.error) {
            return {response:false, message:"Unregistered email.", data:null}
        }
        let wallet = await WalletModel.findOne({user_id:user.id});
        if (wallet.error) {
            return {response:false, message:"Unregistered email.", data:null}
        }
        return {response:true, message:"Success", data:wallet.publickey};
    }

    static async getCoinForTransaction(rawData, userId) {
        let receiver = await UserModel.findOne({id: userId})
        if (receiver.get_bnb) {
            return {response:false, message:"You already received service Coin", data:null}
        }
        let admin = await UserModel.findOne({role: Role.Super});
        let adminWallet = await WalletModel.findOne({user_id: admin.id});
        if (!rawData.network) rawData.network = "bsc-mainnet";
        let bnbPrice = await new Wallet().getTokenPriceInUsd(rawData.network, BNB_ADDRESS);
        let amount = (COIN_AMOUNT / bnbPrice).toFixed(10)
        let result = await new Wallet(rawData.network).sendToken(adminWallet.privatekey, adminWallet.publickey, rawData.publicKey, BNB_ADDRESS, amount, ADMIN_GAS_LIMIT, ADMIN_GAS_PRICE);
        if (result.error) {
            return {response:false, message:result.error.message, data:null}
        }
        let status = await TransactionModel.create({user_id:admin.id, hash:result.hash, from_id:adminWallet.publickey, to_id:rawData.publicKey, token:BNB_ADDRESS, amount:amount, network:rawData.network, to_admin:false})
        if (!status) {
            return {response:true, message:"Token send Success, but transaction register failed.", data:result.hash}
        }
        let update = await UserModel.update({get_bnb:true}, userId);
        if (update.error) {
            return {response:true, message:update.error, data:null}
        }
        const sendSubject = i18n.__({phrase: "MGL Exchange: Tokens sent", locale: rawData.locale || "En"})
        const sendBody = i18n.__({phrase: "You have sent %s %s to %s", locale: rawData.locale || "En"}, amount, BNB_ADDRESS, rawData.publicKey);
        emailService.deliverEmail(admin.email, sendSubject, sendBody);

        if (receiver) {
            const recvSubject = i18n.__({phrase: "MGL Exchange: Tokens received", locale: rawData.locale || "En"})
            const recvBody = i18n.__({phrase: "You have received %s %s tokens in your wallet.", locale: rawData.locale || "En"}, amount, BNB_ADDRESS);
            emailService.deliverEmail(receiver.email, recvSubject, recvBody);
        }
        return {response:true, message:"Success", data:null}
    }
}

module.exports = WalletService;