const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const authSchema = joi.object({
    firstName : joi.string().min(3).pattern(/^[A-Z][a-zA-Z]{2}/) .required(),
    lastName : joi.string().pattern(/^[A-Z][a-zA-Z]{2}/) .required(),
    email : joi.string().email().required(),
    password : joi.string().pattern(/^[A-Z][a-zA-Z0-9]{5,}[$&^!@#()|,;:<>?/%-+][0-9]{3,}/).required()
});

const createToken = (data) => {
    const token = jwt.sign({ email: data.email }, process.env.JWT, { expiresIn: '1h' });
    console.log(token);
    return token;
}

const mail = () => {
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'neerajmalhotra0001@gmail.com',
      pass: 'Naman@291218'
    }
  });
  
  var mailOptions = {
    from: 'neerajmalhotra0001@gmail.com',
    to: 'neerajmalhotra0001@gmail.com',
    subject: 'Sending Email using Node.js for reset password',
    text: `Hi Raj, You can follow below shared link to reset your password.`,
    html: '<h1>Hi Raj</h1> <p>Please follow the link shared below.</p>' 
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { authSchema, createToken, mail };
