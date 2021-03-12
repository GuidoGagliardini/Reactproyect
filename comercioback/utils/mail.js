const nodemailer = require('nodemailer');
// https://nodemailer.com/about/
//let transporter =  configurar entorno de correo (host, puerto, usuario, contraseña)
// transporter -> sendMail (OK) -> uuid
// aws : lambda | envio SMS

// transport : objeto de configuracion
// GMAIL -> GESTIONAR CUENTA -> SEGURIDAD -> PERMITIR EL ACCESO DE APLICACIONES POCO SEGURAS
const transport = {
    service : 'gmail',
    auth : {
        user : process.env.USER_CORREO,
        pass : process.env.PASSWORD_CORREO
    },
    // Transport security layer (443)
    tls : {
        rejectUnauthorized : false
    }
}
const transporter = nodemailer.createTransport(transport); //referencia de la conexion


mailGeneric = async (mail,msg,subject) => {
    try {
        const body = {to : mail, subject : subject, html:msg}
        const info = await transporter.sendMail(body);
        return info; //b658f8ca-6296-ccf4-8306-87d57a0b4321
    } catch(error) {
        throw error;
    }
}
verifyUser = async(mail,html) => {
    try {
        const subject = "Activa tu Cuenta";
        let msgId = await mailGeneric(mail,html,subject);
        return msgId;
    } catch(error) {
        throw error;
    }
}
recoveryUser = async(mail,html) => {
    try {
        const subject = "Recupera tu contraseña";
        let msgId = await mailGeneric(mail,html,subject);
        return msgId;
    } catch(error) {
        throw error;
    }
}
module.exports = {verifyUser,recoveryUser}