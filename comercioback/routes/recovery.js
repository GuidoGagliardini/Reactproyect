const express = require ('express');
const router = express.Router();
const sha1 = require ('sha1');
const service  = require ('./../models/users');
const jwt = require('jsonwebtoken');
const fs = require ('fs');
const mail = require ('./../utils/mail');

const recovery = async (req,res,next) =>{
    try {
        const {email} = req.body;
        const result = await service.verifyExistentUser(email);
        // console.log(result[0].email);
        if(result[0]){
            const privateKey = fs.readFileSync('./utils/keys/private.pem');
            const payload = {email};
            const signOptions = {expiresIn:'1h',algorithm:'RS256'}
            const JWT = jwt.sign(payload,privateKey,signOptions);
            const recoveryTemplate =
             `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Demystifying Email Design</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </head>
            <body style="margin: 0; padding: 0;">
<table align="center" border="1" cellpadding="0" cellspacing="0" width="600">
 <tr>
<td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0;">
<h1>Recovery Password </h1>
</td>
 </tr>
 <tr>
<td bgcolor="#ee4c50">
<h4>Clickee en el enlace para reestablecer contraseña <a href="${process.env.URL_SERVER_FRONT}/change/${JWT}">Aqui✔</a></h4>
</td>
 </tr>
 <tr>
<td bgcolor="">
<h1>Muchas Gracias! ✅</h1>
</td>
 </tr>
</table>
            </body>
            </html>
            
            
            `;
            const envioMail = await mail.recoveryUser(email,recoveryTemplate);
            res.json({message:"Operacion OK"})
        }else{
            res.send(false)
        }
    } catch (error) {
        console.log(error)
    }
}
router.post('/', recovery)
module.exports = router;