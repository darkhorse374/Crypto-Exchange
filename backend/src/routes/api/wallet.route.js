/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const router = require('express').Router();
const WalletController = require("../../controllers/wallet.controller");
const auth = require("../../middleware/auth.middleware");
const Role = require('../../utils/userRoles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const {
    createWalletSchema, 
    accessWalletWithPrivateKeySchema,
    accessWalletWithKeyPhraseSchema,
    addTokenSchema,
    getBalanceSchema,
    getPriceSchema,
    getAssetsSchema,
    sendTokenSchema,
    geSecretSchema,
    getTransactionSchema
} = require('../../middleware/validators/walletValidator.middleware');

router.get('/gettoptokens', awaitHandlerFactory(WalletController.getTopTokens));
router.post('/create', auth(), createWalletSchema, awaitHandlerFactory(WalletController.createWallet));
router.post('/access/privatekey', auth(), accessWalletWithPrivateKeySchema, awaitHandlerFactory(WalletController.accessWalletByPrivateKey));
router.post('/access/keyphrase', auth(), accessWalletWithKeyPhraseSchema, awaitHandlerFactory(WalletController.accessWalletWithKeyphrase));
router.post('/addtoken', auth(), addTokenSchema, awaitHandlerFactory(WalletController.addToken));
router.post('/getbalance', auth(), getBalanceSchema, awaitHandlerFactory(WalletController.getBalance));
router.post('/getprice', auth(), getPriceSchema, awaitHandlerFactory(WalletController.getPrice));
router.post('/getassets', auth(), getAssetsSchema, awaitHandlerFactory(WalletController.getAssets));
router.post('/sendtoken', auth(), sendTokenSchema, awaitHandlerFactory(WalletController.sendToken));
router.post('/receivetoken', auth(), awaitHandlerFactory(WalletController.receiveToken));
router.post('/getsecret', auth(), geSecretSchema, awaitHandlerFactory(WalletController.getSecret));
router.post('/gettransaction', auth(), getTransactionSchema, awaitHandlerFactory(WalletController.getTransaction));
router.post('/getadmintransaction', auth(Role.Super), awaitHandlerFactory(WalletController.getAdminTransaction));
router.post('/getcoinfortransaction', auth(), awaitHandlerFactory(WalletController.getCoinForTransaction));
router.get('/getwalletbyemail/:email', auth(Role.Super), awaitHandlerFactory(WalletController.getWalletByEmail));

module.exports = router;