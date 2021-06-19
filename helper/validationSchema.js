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
const redis = require('redis');
const { cli } = require('winston/lib/winston/config');
const client = redis.createClient();

/**
 * 
 * @var  registationSchema variable to pass joi object  
 * @description Applied the joi validation. 
 */
const registationSchema = joi.object({
  firstName: joi.string().min(3).pattern(/^[A-Z][a-zA-Z]{2}/).required(),
  lastName: joi.string().pattern(/^[A-Z][a-zA-Z]{2}/).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(/^[A-Z][a-zA-Z0-9]{5,}[$&^!@#()|,;:<>?/%-+][0-9]{3,}/).required()
});
/**
 * 
 * @function  createToken to create the token.  
 * @description Creating token for validation. 
 */
const createToken = (result) => {
  const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT, { expiresIn: '1 day' },
  );
  client.setex('token', 1200, token)
  return token;
}
/**
 *
 * @description Using nodemailer to send password reset mail.
 */
const mail = (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  ejs.renderFile('app/mail/mail.ejs', (error, info) => {
    if (error) {
      console.log('error', error);
    } else {
      const mailOption = {
        from: process.env.USER,
        to: process.env.USER,
        subject: 'Reset password',
        html: `${info}<button><a href="${process.env.baseUrl}${`forgetPassword/`}${createToken(data)}">Reset Password</a>
        </button>`,
      };
      transporter.sendMail(mailOption, function (error, info) {
        (error) ? console.log("this is the error from mailer " + error) : console.log('Password Reset mail sent successfully, please check your mail.' + info.response);
      });
    }
  });
}

const verifyToken = (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.token, process.env.JWT);
    // console.log(decode);
    client.get('token', (err, token) => {
      if (err) {
        throw err
      }
      if (req.headers.token === token) {
        req.userData = decode;
        const userId = decode.id;
        req.userId = userId;
      }
    })
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Your token has expiered',
    });
  }
};

const redisFunction = (KEY, value) => {
  client.setex(KEY, 1200, JSON.stringify(value));

}

const redisMiddleWare = (req, res, next) => {
  client.get('note', (err, note) => {
    if (err) {
      throw err
    } else if (note) {
      res.send(JSON.parse(note))
    } else {
      next();
    }
  })

}

module.exports = { registationSchema, createToken, mail, verifyToken, redisFunction, redisMiddleWare };