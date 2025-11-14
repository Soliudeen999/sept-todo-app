const nodemailer = require('nodemailer');

const mailer = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
    port: process.env.MAIL_PORT || 587,
    secure : false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
})

const sendMail = async (to, message, subject, type = 'text') => {

    const acceptedTypes = ['text', 'html'];

    if(!to || !message || !subject || !acceptedTypes.includes(type)){
        throw new Error('Core options are missing')
    }

    let options = {
        to,
        from : process.env.MAIL_FROM,
        subject
    }

    if(type === 'text'){
        options = {...options, text : message}
    }

    if(type === 'html'){
        options = {...options, html : message}
    }

    await mailer.sendMail(options);
}

module.exports = {mailer, sendMail} 
