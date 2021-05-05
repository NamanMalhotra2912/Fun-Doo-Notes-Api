const { authSchema } = require('../../helper/validationSchema.js');
// const Note = require('../models/user.js');
const user = require('../services/user.js');

class UserRagistration{

    createUser = (req, res) => {
        
        // console.log(req.body);
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password ) {
        return res.status(400).send({
            message : "Fields can't be empty, please fill all details."
        })
    }

    const checkValidation = authSchema.validate(req.body);
        // console.log(checkValidatio);
        if (checkValidation.error){
            return res.send("Please enter correct details for user.");
        }        
        const userDetails = {
            firstName: req.body.firstName, 
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };

        user.createUser(userDetails, (error, result) =>{
        if(error){
            res.status(400).send({
                message: error.message
            });
        }
        else{
            res.status(200).send({
                message: "Data has been added suceesfully.",
                data : result
            });
        }
    });
};
    
};
module.exports = new UserRagistration();