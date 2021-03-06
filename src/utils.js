import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";                    
import sgTransport from "nodemailer-sendgrid-transport";

export const generatorSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]}${nouns[randomNumber]}`;
};

const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (address, secret ) => {
    const email = {
        from: "admin@melona.com",
        to: address,
        subject: "🔒 Login Secret for Melona 🔒",
        html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
    };
    return sendMail(email);
};