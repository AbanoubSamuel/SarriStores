import { AuthenticatedReq } from "../middlewares/auth";
export const sendMail = async (req: AuthenticatedReq) =>
{
    const sgMail = require('@sendgrid/mail')
    // using Twilio SendGrid's v3 Node.js Library
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const text = req.body.text;
    const msg = {
        to: 'abanoub.samuel@hotmail.com', // Change to your recipient
        from: 'abanoub.samuel@hotmail.com', // Change to your verified sender
        subject: 'Package inquiry',
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