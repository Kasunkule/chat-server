const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config({path: "../config.env"});

sgMail.setApiKey(process.env.SG_KEY);

const sendSGMail = async ({
    reipient,
    sender,
    subject,
    html,
    text,
    sontent,
    attachments,

}) => {
    try{

        const from = sender || "kasun.rasanjana512@gmail.com";

        const msg = {
            to: recipient,
            from: from, 
            subject,
            html: html,
            text: text,
            attachments, 
        };

        return sgMail.send(msg);

    }
    catch(error) {
        console.log(error);
    }
};

exports.sendMail = async (args) => {
    if(process.env.NODE_ENV === "development") {

        return new Promise.resolve();

    }
    else {

        return sendSGMail(args);
    }
};