import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "phanbadu04022004@gmail.com",
        pass: "wibs lona lvxm anup",
    },
});

const sendEmail = async () => {
    try {
        const info = await transporter.sendMail({
            from: "<phanbadu04022004@gmail.com>",
            to: "duphan03@gmail.com",
            subject: "Hello",
            text: "Hello word",
            // html: "<h1>Hello world</h1>"
        })


        console.log(info)
    } catch(error) {
        console.error(error)
    }
}

sendEmail()
