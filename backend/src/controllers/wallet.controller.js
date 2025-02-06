const WalletService = require("../services/wallet.service")

class WalletController {
    getTopTokens = async (req, res, next) => {
        try {
            const result = await WalletService.getTopTokens();
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    createWallet = async (req, res, next) => {
        try {
            const result = await WalletService.createWallet(req.currentUser.id, req.body.keyphrase, req.body.locale || "En");
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    accessWalletByPrivateKey = async (req, res, next) => {
        try {
            const result = await WalletService.accessWalletWithPrivateKey(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    accessWalletWithKeyphrase = async (req, res, next) => {
        try {
            const result = await WalletService.accessWalletWithKeyphrase(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    addToken = async (req, res, next) => {
        try {
            const result = await WalletService.addToken(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getBalance = async (req, res, next) => {
        try {
            const result = await WalletService.getBalance(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getPrice = async (req, res, next) => {
        try {
            const result = await WalletService.getPrice(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getAssets = async (req, res, next) => {
        try {
            const result = await WalletService.getAssets(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    sendToken = async (req, res, next) => {
        try {
            const result = await WalletService.sendToken(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    receiveToken = async (req, res, next) => {
        try {
            const result = await WalletService.receiveToken(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getSecret = async (req, res, next) => {
        try {
            const result = await WalletService.getSecret(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getTransaction = async (req, res, next) => {
        try {
            const result = await WalletService.getTransaction(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getAdminTransaction = async (req, res, next) => {
        try {
            const result = await WalletService.getAdminTransaction(req.body);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getWalletByEmail = async (req, res, next) => {
        try {
            const result = await WalletService.getWalletByEmail(req.params.email);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getCoinForTransaction = async (req, res, next) => {
        try {
            console.log("controller")
            const result = await WalletService.getCoinForTransaction(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new WalletController;