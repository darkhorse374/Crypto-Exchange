const UserService = require('../services/user.service');

const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
    verifyEmail = async (req, res, next) => {
        try {
            const result = await UserService.verifyEmail(req.body.email, (req.body.locale || "En"));
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getAllUsers = async (req, res, next) => {
        try {
            console.log("User called getAllUsers!!!!")
            const result = await UserService.getAllUsers();
            res.send(result)
        } catch (error) {
            next(error)
        }
    };

    getUsers = async (req, res, next) => {
        try {
            const result = await UserService.getUsers(req.params.sortby, req.params.page, req.params.limit);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getUserById = async (req, res, next) => {
        try {
            console.log("User called getUserById!!!!")
            const result = await UserService.getUserById(req.params.id)
            res.send(result)
        } catch (error) {
            next(error)
        }
    };

    // getUserByUserName = async (req, res, next) => {
    //     try {
    //         let user = await UserService.getUserByUserName(req.params.username)
    //         res.send(user)
    //     } catch (error) {
    //         next(error)
    //     }
    // };

    getCurrentUser = async (req, res, next) => {
        try {
            console.log("User called getCurrentUser!!!!")
            const result = UserService.getCurrentUser(req.currentUser)
            res.send(result)
        } catch (error) {
            next(error)
        }
    };

    createUser = async (req, res, next) => {
        try {
            console.log("User called createUser!!!!")
            const result = await UserService.createUser(req.body)
            res.send(result)
        } catch (error) {
            next(error)
        }
    };

    updateUser = async (req, res, next) => {
        try {
            console.log("User called updateUser!!!!")
            const result = await UserService.updateUser(req.body, req.currentUser.id)
            res.send(result)
        } catch (error) {
            next(error)
        }
    };

    updatePassword = async (req, res, next) => {
        try {
            console.log("User called updatePassword!!!!")
            const result = await UserService.updatePassword(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    deleteUser = async (req, res, next) => {
        try {
            console.log("User called deleteUser!!!!")
            const result = await UserService.deleteUser(req.params.id)
            res.send(result)
        } catch (error) {
            next(error)
        }
    };

    userLogin = async (req, res, next) => {
        try {
            console.log("User called userLogin!!!!")
            const result = await UserService.userLogin(req.body)
            res.send(result)
        } catch (error) {
            next(error)
        }
    };

    userSignup = async (req, res, next) => {
        try {
            console.log("User call userSignup!!!!")
            let password = req.body.password;
            const signup = await UserService.signUp(req.body)
            console.log("NEXT")
            if (signup.response) {
                const result = await UserService.userLogin({email:req.body.email, password: password})
                res.send(result)
            } else {
                res.send(signup)
            }
        } catch (error) {
            next(error)
        }
    }

    forgotPassword = async (req, res, next) => {
        try {
            const result = await UserService.forgotPassword(req.body);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    resetPassword = async (req, res, next) => {
        try {
            const result = await UserService.updatePassword(req.body, req.currentUser.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;