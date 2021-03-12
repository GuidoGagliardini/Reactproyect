const express = require('express');
const router = express.Router();
const authModel =  require('./../models/auth');
const sha1 = require ('sha1');
const jwt =  require ('jsonwebtoken');
const fs  = require ('fs');
const { decode } = require('querystring');
const { doesNotMatch } = require('assert');
const e = require('express');


const auth = async(req,res,next)=>{
        try{
                // const {data} = req.body;
                const {email,password}= req.body;
                const result =  await authModel.auth(email, sha1(password));
                const {id,usuario,estado,activado} = result[0];
                console.log(result)
                if (id&&usuario){
                        const privateKey = fs.readFileSync('./utils/keys/private.pem');
                        const payload = {usuario,estado,id,activado};
                        const signOptions = {expiresIn:'1h',algorithm:'RS256'};
                        const JWT = jwt.sign(payload,privateKey,signOptions);
                        res.json({JWT : JWT});
                }else {
                        res.send(false);
                        
                } 
                //averiguar porque no puedo usar los operadores ternarios
        }catch(error){
           res.send(false)
        }
};
const authuser = async (req,res,next)=>{
 const {token} = req.params;
 if (token) {
        const publicKey = fs.readFileSync('./utils/keys/public.pem');
        const {usuario,estado,id,activado} = jwt.verify(token,publicKey);
        if (jwt.verify===jwt.JsonWebTokenError){
                res.send({message:"NO AUTORIZADO"})
        }
        if (jwt.verify===jwt.TokenExpiredError){
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