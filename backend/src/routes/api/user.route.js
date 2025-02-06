/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/                                                                                                                                                                                                                   


const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/userRoles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, updatePasswordSchema, validateLogin, validateEmail} = require('../../middleware/validators/userValidator.middleware');

router.post('/emailverify', validateEmail, awaitHandlerFactory(userController.verifyEmail)); 
router.post('/signup', createUserSchema , awaitHandlerFactory(userController.userSignup));
router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin));
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)); 
router.get('/', auth(Role.Super), awaitHandlerFactory(userController.getAllUsers));
router.get('/:sortby/:page/:limit', auth(Role.Super), awaitHandlerFactory(userController.getUsers));
router.get('/id/:id', auth(Role.Super), awaitHandlerFactory(userController.getUserById));
router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); 
router.patch('/id/:id', auth(Role.Super), updateUserSchema, awaitHandlerFactory(userController.updateUser));
router.patch('/password', auth(), updatePasswordSchema, awaitHandlerFactory(userController.updatePassword));
router.delete('/id/:id', auth(Role.Super), awaitHandlerFactory(userController.deleteUser));
router.post('/forgotpassword', awaitHandlerFactory(userController.forgotPassword));
router.patch('/resetpassword', updatePasswordSchema, auth(), awaitHandlerFactory(userController.resetPassword));

module.exports = router;