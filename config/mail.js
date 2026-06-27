import nodemailer from "nodemailer";

const transpoter=nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
        user:process.env.SMTP_USER,
        PASS:process.env.SMTP_PASSWORD,
    },
});

export default transpoter;