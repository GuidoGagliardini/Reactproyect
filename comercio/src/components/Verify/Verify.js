import React from 'react';
import {useParams} from 'react-router-dom';
import {verifyok,verifyNo} from './../../services/useSweetAlert';
import {useHistory} from 'react-router-dom';
import API from './../../api';
import Loading from './../common/Loading';





const Verify = () => {
    const {verify_code,email} = useParams();
    const routerHistory = useHistory()

    const verificacion = async ()=>{
         
         const result = await  API.put('users/activate', [verify_code,email]);
        
         
         if (result.request.responseText =="Usuario Activado"){
                verifyNo()
                routerHistory.push('/registro');
         }else {
             verifyok()
             routerHistory.push('/')
         }
    }
   

    return ( <>
        <div className="container">
            <div className="row justify-content-center pt-10">
                <div className="col-4 ">
                <h5>Gracias</h5>
                <span className="badge badge-info"> {email} </span>
                <button className="btn-info btn-block"  onClick={verificacion}>Click aqui para activar Cuenta</button>


                </div>
            </div>  
        </div>
        
        
        
        
    </>
        );
}
 
export default Verify;