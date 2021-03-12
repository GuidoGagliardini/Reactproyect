const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const fs = require ('fs')
const service = require ('./../models/users');
const sha1 =  require('sha1');

const change = async (req,res,next)=>{
    try {
        
        const {token} = req.params;
        const {password,repeatPassword} = req.body;
        const publicKey = fs.readFileSync('./utils/keys/public.pem')
        const verify = jwt.verify(token,publicKey);
        
        if(verify&&password===repeatPassword) {
            console.log('ok');
            res.json({email: verify.email});
            await service.updatePassbyEmail(verify.email, sha1(repeatPassword));
                        
        }else {
            console.log('nook')
            res.send(false);
            
        }

    } catch (error) {
        console.log(error)
        res.json(error);
    }
    
    
}
router.post('/:token',change)
module.exports = router;