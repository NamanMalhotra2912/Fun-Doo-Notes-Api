const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const authSchema = joi.object({
    firstName : joi.string().min(3).pattern(/^[A-Z][a-zA-Z]{2}/) .required(),
    lastName : joi.string().pattern(/^[A-Z][a-zA-Z]{2}/).required(),
    email : joi.string().email().pattern(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+(.[a-z])/).required(),
    password : joi.string().pattern(/^[A-Z][a-zA-Z0-9]{5,}[$&^!@#()|,;:<>?/%-+][0-9]{3,}/).required()
});

const loginSchema = joi.object({
    email : joi.string().email().pattern(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+(.[a-z])/).required(),
    password : joi.string().pattern(/^[A-Z][a-zA-Z0-9]{5,}[$&^!@#()|,;:<>?/%-+][0-9]{3,}/).required()
})

const createToken = (data) => {
    // const token = await jwt.sign( {_id: "6093618ffd2c7d218418f263"}, "thisIsTheSecretKeyOfNeerajMalhotra");
    const token = jwt.sign({ email: data.email} ,{ expiresIn : '1 minute'});
    // console.log(token);
    return token;
    // const userVerify = await jwt.verify(token,"thisIsTheSecretKeyOfNeerajMalhotra");
    // console.log(userVerify);
}

module.exports = { authSchema, loginSchema, createToken };
// module.exports = { loginSchema };
