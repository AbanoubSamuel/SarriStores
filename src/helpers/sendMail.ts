import {AuthReq} from "../middlewares/auth.service";

export const sendMail = async (req: AuthReq) =>
{
    const sgMail = require('@sendgrid/mail')
    // using Twilio SendGrid's v3 Node.js Library
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const text = req.body.text;
    const msg = {
        to: 'info@sarri.com', // Change to your recipient
        from: 'abanoub.samuel@hotmail.com', // Change to your verified sender
        subject: 'Silver Package Inquiry',
        text: req.body.text,
        html: text,
    }

    sgMail
        .send(msg)
        .then(() =>
        {
            console.log('Email sent')
        })
        .catch((error: Error) =>
        {
            console.error(error)
        })
}