var express = require('express');
var router = express.Router();
const service = require ('./../models/users');
const uuid = require('uuid');
const mail  = require('./../utils/mail');
const sha1 = require ('sha1');

const registro = async (req,res,next) =>{
  try {

    const {usuario,password,repeatPassword,email} = req.body;
    const obj = {
      usuario : usuario,
      password: sha1(password),
      email: email,
      activado : "0",
      verify_code: uuid.v4(),
      estado : "1",

    };
    // comparar pasword y repeatPassword para su validacion en la base de datos
   
   const verifyUserExistent =  await service.verifyExistentUser(obj.email);
   console.log(verifyUserExistent);
   if (verifyUserExistent[0]){
     res.send(false);
     console.log("usuario ya existente")
   }else {
    const verifyTemplate= `
    <html>
     <body>
         <h4>CODIGO DE VERIFICACION => ${obj.verify_code}</h4>
        
         <h4>Activa tu cuenta con un click!<a href="${process.env.URL_SERVER_FRONT}/verify/${obj.verify_code}/${obj.email}">Aqui</a></h4>
         
     </body>
    </html>
  
  
     `;
     const result = service.createUser(obj);
     result ? mail.verifyUser(email, verifyTemplate) : "Error en envio de Mail";
     res.json({message:"OK"});
   }
  } catch (error) {
    res.json({message:"error"});
    console.log(error)
  }


}
const activateuser  =  async (req,res,next)=>{
      try {
        const [verify_code,email] = req.body;
        console.log("EMAIL", email)
        let activated = await service.verifyCodeUser(verify_code);
        const activado = activated[0].activado;
        if (activado == 1){
          res.send("Usuario Activado");
        }else{
          service.activateuser(email);
          res.json({data:"Activado"});
        }
      } catch (error) {
          console.log(error);
      }
}
router.put('/activate', activateuser)
router.post('/registro', registro);
module.exports = router;
