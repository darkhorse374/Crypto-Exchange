const { body, validationResult } = require('express-validator');

exports.createWalletSchema = [
    body('keyphrase')
        .exists()
        .withMessage('KeyPhrase is required'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.accessWalletWithPrivateKeySchema = [
    body('privateKey')
        .exists()
        .withMessage('PrivateKey is required'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.accessWalletWithKeyPhraseSchema = [
    body('keyphrase')
        .exists()
        .withMessage('KeyPhrase is required'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.addTokenSchema = [
    body('publicKey')
        .exists()
        .withMessage('PublicKey is required')
        .isLength({min:42, max:42})
        .withMessage('PublicKey must contains 42 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('token_symbol')
        .exists()
        .withMessage('Token Symbol is required'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('token_address')
        .exists()
        .withMessage('Token Address is required')
        .isLength({min:42, max:42})
        .withMessage('Token Address must contains 42 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.getBalanceSchema = [
    body('publicKey')
        .exists()
        .withMessage('PublicKey is required')
        .isLength({min:42, max:42})
        .withMessage('PublicKey must contains 42 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.getPriceSchema = [
    body('publicKey')
        .exists()
        .withMessage('PublicKey is required')
        .isLength({min:42, max:42})
        .withMessage('PublicKey must contains 42 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.getAssetsSchema = [
    body('publicKey')
        .exists()
        .withMessage('PublicKey is required')
        .isLength({min:42, max:42})
        .withMessage('PublicKey must contains 42 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.sendTokenSchema = [
    body('publicKey')
        .exists()
        .withMessage('PublicKey is required')
        .isLength({min:42, max:42})
        .withMessage('PublicKey must contains 42 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('destination')
        .exists()
        .withMessage('destination is required')
        .isLength({min:42, max:42})
        .withMessage('destination must contains 42 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('token')
        .exists()
        .withMessage('Token address is required')
        .isLength({min:42, max:42})
        .withMessage('Token must contains 42 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('amount')
        .exists()
        .withMessage('Amount is required'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('gasPrice')
        .exists()
        .withMessage('Amount is required'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('gasLimit')
        .exists()
        .withMessage('Amount is required'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.getTransactionSchema = [
    body('publicKey')
        .exists()
        .withMessage('PublicKey is required')
        .isLength({min:42, max:42})
        .withMessage('PublicKey must contains 42 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.geSecretSchema = [
    body('publicKey')
        .exists()
        .withMessage('PublicKey is required')
        .isLength({min:42, max:42})
        .withMessage('PublicKey must contains 42 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('type')
        .exists()
        .withMessage('Type is required')
        .isAlpha()
        .withMessage('Type must contains alphabetical characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];