import nodemailer from 'nodemailer'

export const sendEmail = async({ to = "", subject = "", html = ''}) => {
    const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: "rodinaaymen@gmail.com",
            pass:"axjp ciqo nlqy slao"
         }
    })
    const info = await transporter.sendMail({
        from: " rodina <rodinaaymen@gmail.com>",
        to,
        subject,
        html
    })
}
