const express = require('express');
const router = express.Router();
const authModel =  require('./../models/auth');
const sha1 = require ('sha1');
const jwt =  require ('jsonwebtoken');
const fs  = require ('fs');
const { decode } = require('querystring');
const { doesNotMatch } = require('assert');



const auth = async(req,res,next)=>{
        try { 
                const {email,password}= req.body;
                console.log(req.body)
                const result =  await authModel.auth(email, sha1(password));
                const {id,usuario,estado,activado} = result;
                console.log(result)
        if (result.length>0){
                console.log("DATOS DE USUARIO",result);
                const privateKey = fs.readFileSync('./utils/keys/private.pem');
                const payload = {usuario,estado,id,activado};
                const signOptions = {expiresIn:'1h',algorithm:'RS256'};
                const JWT = jwt.sign(payload,privateKey,signOptions);
                res.json({JWT : JWT});

        }else{
                console.log("ERROR EN PASSWORD O MAIL");
                res.send(false)
        }
                
        } catch (error) {
                res.sendStatus(500);
        }
               
};
const authuser = async (req,res,next)=>{
 const {token} = req.params;
 if (token) {
        const publicKey = fs.readFileSync('./utils/keys/public.pem');
        const {usuario,id,estado,activado} = jwt.decode(token,publicKey);
       
        if (jwt.decode===jwt.JsonWebTokenError){
                res.send({message:"NO AUTORIZADO"})
        }
        if (jwt.decode===jwt.TokenExpiredError){
                res.send({message:"TokenExpired"})
        }else {
                res.json({datosUsers : {usuario,estado,id,activado}});
        }
 }else {
        console.log("NO TOKEN")
        res.send({message:"Error en Verificacion de TOKEN"});
 }
/** jwt.TokenExpired tira un error que tendria que mostrar para cerrar la session. */

}
router.get('/authuser/:token', authuser)
router.post('/', auth)
module.exports = router;