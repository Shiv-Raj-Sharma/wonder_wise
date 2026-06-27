import transpoter from "../config/mail"

const sendMail = async (to, subject, data)=>{
    await transpoter.sendMail({
        from:process.env.SMTP_USER,
        to: "dass2005nd@gamil.com",
        subject: "",
        text: ""
    });
}

// npx dotenvx -- run node utils/send-mails.js for sending mail via terminal