const express = require('express');
const router = express.Router();
const authModel =  require('./../models/auth');
const sha1 = require ('sha1');
const jwt =  require ('jsonwebtoken');
const fs  = require ('fs');




const auth = async(req,res,next)=>{
        try { 
                const {email,password}= req.body;
                const result =  await authModel.auth(email, sha1(password));
        if (result.length>0){
                console.log(result[0])
                const payload = {...result}
                const privateKey = fs.readFileSync('./utils/keys/private.pem');
                const signOptions = {expiresIn:'1h',algorithm:"RS256"};
                const JWT = jwt.sign(payload,privateKey,signOptions);
                console.log("JWT",JWT)
                res.json({JWT : JWT});

        }else{
                console.log("ERROR EN PASSWORD O MAIL");
                res.send(false)
        }
                
        } catch (error) {
                res.json({error:true});
                
        }
               
};
const authuser = async (req,res,next)=>{
try {
        const {token} = req.params;
        if (token) {
        const publicKey = fs.readFileSync('./utils/keys/public.pem');
        const  datos = jwt.verify(token,publicKey);
        console.log("DATOS", {...datos});
        res.json({datosUsers : datos});
        
        }else {
        console.log("NO TOKEN")
        res.send({message:"Error en Verificacion de TOKEN"});
        }
} catch (error) {
        console.log(error)
        res.json({error:"Error al verif Token"})
        }
 
/** jwt.TokenExpired tira un error que tendria que mostrar para cerrar la session. */

}
router.get('/authuser/:token', authuser)
router.post('/', auth)
module.exports = router;