const nodemailer = require('nodemailer');
const ejs = require('ejs');

const mail = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    ejs.renderFile('app/mail/addedCollaborator.ejs', (error, info) => {
        if (error) {
            console.log('error', error);
        } else {
            const mailOption = {
                from: 'nmalhotra1289@gmail.com',
                to: 'nmalhotra1289@gmail.com',
                subject: 'Added Collaborator',
                html: `${info}`,
            };
            transporter.sendMail(mailOption, function (error, info) {
                (error) ? console.log("this is the error from mailer " + error) : console.log('Collaborated your note successfully, please check your email.' + info.response);
            });
        }
    });
}

module.exports = { mail };