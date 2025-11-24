const nodemailer = require('nodemailer');

const options = () => {
    let op = {
        host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
        port: process.env.MAIL_PORT || 587,
        secure : false,
        auth: {
            user: process.env.MAIL_USER || 'd6106d0538df35',
            pass: process.env.MAIL_PASS || 'd6409669b5b735',
        }
    }

    console.log(op)

    return op;
}

const mailer = nodemailer.createTransport(options())

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
