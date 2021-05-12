/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 * 
 * Purpose          : to create the validation schema for user Api using hapi-joi.
 *                    
 * 
 * @file            : validationSchema.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 * 
 **************************************************************************/
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');
const ejs = require('ejs');

/**
 *
 * @description User ragistration schema with joi validation.
 */

const ragistationSchema = joi.object({
    firstName : joi.string().min(3).pattern(/^[A-Z][a-zA-Z]{2}/) .required(),
    lastName : joi.string().pattern(/^[A-Z][a-zA-Z]{2}/) .required(),
    email : joi.string().email().required(),
    password : joi.string().pattern(/^[A-Z][a-zA-Z0-9]{5,}[$&^!@#()|,;:<>?/%-+][0-9]{3,}/).required()
});

/**
 *
 * @description Using jsonwebtoken to genrate token.
 */
const createToken = (result) => {
    const token = jwt.sign({ name: result.email }, process.env.JWT, { expiresIn: '1 day' });
    console.log(token);
    return token;
}

/**
 *
 * @description Using nodemailer to send reset password mail.
 */

const mail = (data) => {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
  
  // var mailOptions = {
  //   from: 'nmalhotra1289@gmail.com',
  //   to: 'nmalhotra1289@gmail.com',
  //   subject: 'Sending Email using Node.js for reset password',
  //   text: `Hi Raj, You can follow below shared link to reset your password.`,
  //   html: '<h1>Hi Raj</h1> <p>Please follow the link shared below.</p>' 
  // };

  ejs.renderFile('app/mail/mail.ejs', (error, info) => {
    if (error) {
      console.log('error', error);
    } else {
      const mailOption = {
        from: 'nmalhotra1289@gmail.com',
        to: data.email,
        subject: 'Reset password',
        html: `${info}<button><a href="${'http://localhost:3000/forgetPassword/'}${createToken(data)}">Button</a>
        </button>`,
      };
    transporter.sendMail(mailOption, function(error, info){
      if (error) {
        console.log("this is the error from mailer "+ error);
      } else {
        console.log('Password Reset mail sent successfully, please check your mail.' + info.response);
        }
      });
    }
  });
}

module.exports = { ragistationSchema, createToken, mail };