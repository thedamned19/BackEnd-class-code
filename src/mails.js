import nodemailer from "nodemailer"

// Se deberá enviar el número de ticket
// cuando se genere la compra.
let ticket = 881970;

const transporter=nodemailer.createTransport(
    {
        service:"gmail", 
        port:"587",
        auth:{
            user:"ernestoele700808@gmail.com",
            pass: "ajturjkjfcueucef"
        }
    }
)

transporter.sendMail(
    {
        from: "Back End ernestoele700808@gmail.com",
        to: "ernesto.leimsieder@imm.gub.uy",
        subject: "Empresa Leimsieder S.A. Purchase made successfully!",
        // text:"mensaje en formato texto plano",
        html:`<h2>Your purchase has been generated correctly.</h2><br><br>
              <b><i>Nº Ticket ${ticket}</i></b>`
    }
).then(resultado => console.log(resultado))
 .catch(error => console.log(error))


/* who = quien
affair = asunto
message = mensaje
attachments = adjuntos */

export const sendMail = async(who, affair, message, attachments) => {
    return await transporter.sendMail(
    {
        to: who, 
        subject: affair, 
        html: message, 
        attachments: attachments
    }
    )
}

// let result = await sendMail("ernesto.leimsieder@imm.gub.u", "proof", "hello...!!!")
// if(result.accepted.length>0){
//     console.log("Mail sent...!!!")
// }