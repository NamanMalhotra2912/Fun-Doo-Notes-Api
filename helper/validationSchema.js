const joi = require('@hapi/joi');

const authSchema = joi.object({
    firstName : joi.string().min(3).pattern(/^[A-Z][a-zA-Z]{2}/) .required(),
    lastName : joi.string().pattern(/^[A-Z][a-zA-Z]{2}/).required(),
    email : joi.string().email().pattern(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+(.[a-z])/).required(),
    password : joi.string().pattern(/^[A-Z][a-zA-Z0-9]{5,}[$&^!@#()|,;:<>?/%-+][0-9]{3,}/).required()
});

module.exports = { authSchema };