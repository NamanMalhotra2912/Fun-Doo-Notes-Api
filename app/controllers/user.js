/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 * 
 * Purpose          : to create the schemas for user ragistration data.
 *                    
 * 
 * @file            : user.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 * 
**************************************************************************/

const { registationSchema, createToken } = require('../../helper/validationSchema.js');
const user = require('../services/user.js');
const jwt = require('jsonwebtoken');

class UserRegistration {
    /**
     * 
     * @method createUser method for registration  
     * @description Creating the user for registration and saving its details 
     * @returns registeration status.
     */
    createUser = (req, res) => {
        try {
            const userDetails = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };
            if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
                return res.status(400).send({
                    message: "Fields can't be empty, please fill all details."
                })
            }
            const checkValidation = registationSchema.validate(userDetails);
            if (checkValidation.error) {
                res.send({ message: "Please enter correct details for ragistration." });
                return;
            }
            user.createUser(userDetails, (error, result) => {
                if (error) {
                    res.status(400).send({
                        success: false,
                        message: "Email already exist.",
                        error
                    });
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: "User Ragistered Successfully",
                        // data : result
                    });
                }
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Internal error from server"
            })
        }
    }
    /**
     * 
     * @method createLogin method for login  
     * @description Creating the login for user 
     * @returns login status
     */
    login = (req, res) => {
        try {
            const loginData = {
                email: req.body.email,
                password: req.body.password
            };
            user.login(loginData, (error, result) => {
                if (error) {
                    res.status(400).send({
                        success: false,
                        message: "Please fill correct details for login",
                        // error
                    });
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: "You are Logged in Successfully.",
                        Token: createToken(result),
                        // data : result
                    });
                }
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Internal error from server"
            })
        }
    };
    /**
     * 
     * @method  forgetPassword method  
     * @description Creating the login for user 
     * @returns if correct email entered then will generate mail for reset password.
     */
    forgetPassword = (req, res) => {
        try {
            const forgetData = {
                email: req.body.email,
            };
            user.forgetPassword(forgetData, (error, result) => {
                if (error) {
                    res.status(500).send({
                        success: false,
                        message: "Please check and share correct details.",
                        error
                    });
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: "You can reset your password, and mail will be sent to you shortly.",
                        result
                    });
                }
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Internal error from server"
            })
        }
    }
    /**
     * 
     * @method  resetPassword method  
     * @description Creating the reset password method to reset the password. 
     * @returns returns the reset password status.
     */
    resetPassword = (req, res) => {
        try {
            const verifyPass = jwt.verify(req.headers.token, process.env.JWT);
            const resetPass = {
                password: req.body.password,
                email: verifyPass.name,
            }
            user.resetPassword(resetPass, (err, result) => {
                if (err) {
                    return res.status(401).send({
                        success: false,
                        message: 'Un-authorized access to reset your password',
                        err,
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Password reset is Successful',
                        // result,
                    });
                }
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Time-out, please try again to reset your password',
                error
            });
        }

    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @description : creating the socialLogin api to do login through google
     */
    socialLogin(req, res) {
        const googleProfile = req.user.profile;
        const socialLoginData = {
            firstName: googleProfile.name.givenName,
            lastName: googleProfile.name.familyName,
            userName: googleProfile.emails[0].value,
            password: null,
            googleId: googleProfile.id,
            googleLogin: true,
        };
        user.socialLogin(socialLoginData, (error, result) => {
            if (error) {
                res.status(400).send({
                    success: false,
                    message: "Please check again for login",
                });
            }
            else {
                res.status(200).send({
                    success: true,
                    message: "You are Logged in Successfully.",
                    result
                });
            }
        })
    };
};
module.exports = new UserRegistration();