import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import API from './../../api';
import useCustomForm from './../../services/useCustomForm';
import { yupResolver } from "@hookform/resolvers/yup";
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import Loading from './../common/Loading';
import {noMail,mailOk,recoveryOk, noRecovery,tokenError} from './../../services/useSweetAlert';
import { useHistory,useParams } from 'react-router-dom';


const schemaPass = yup.object().shape({
    password: yup.string().required("Campo Requerido").min(5,"minimo 5 letras"),
    repeatPassword : yup.string().required("Campo Requerido").min(5,"minimo 5 letras")
})
const emailSchema = yup.object().shape({
    email : yup.string().required("Campo Obligatorio").email("Ingrese un email valido")
})
const Recovery = () => {
    const routerHistory = useHistory();
    const [value,handler,setValue] = useCustomForm();
    const {registrer,handleSubmit,errors} = useForm({
        resolvers:yupResolver(emailSchema)
    });
    const recoverySend = async (e)=>{
        console.log("boton de recovery")
        const result = await API.post('/recovery',value);
        <Loading />
        // result.data === false ? noMail() : mailOk();
        if (result.data === false){
            noMail();
        }else{
            mailOk();
            routerHistory.push('home')
        }
        
    }
    return (<>
    
    <MDBContainer className="container-fluid">
        <MDBRow className="justify-content-center" >
        <MDBCol md="4" className="mt-4" >
            <form onSubmit={handleSubmit(recoverySend)} className="bg mb-2">
                <p className="h5 text-center mb-4">Recupero de password 📧</p>
                <div className="grey-text">
                <MDBInput value={value.email || ""} group type="email" ref ={registrer} label="Ingrese su email"  icon="envelope" onChange={handler} name="email" required />
                </div>
                <label className="text-danger">{errors.email?.message}</label>
                <div className="text-center">
                <MDBBtn   type="submit"  > Enviar </MDBBtn>  
                </div>  
            </form>
        </MDBCol>
        </MDBRow>
    </MDBContainer>
    </> );
}


export const Change =()=>{
    const routerHistory = useHistory()
    const [value,handler,setValue] = useCustomForm();
    const {registrer,handleSubmit,errors} = useForm({
        resolvers: yupResolver(schemaPass)
    })
    const tokenParams = useParams();

    const changeSend = async (e) =>{  
        console.log("boton change");
        const tokenSend = await API.post(`/change/${tokenParams.token}`,value);
        if (tokenSend.data.name==="TokenExpiredError") {
            tokenError() ;
            routerHistory.push('/login');
        } else{
            if (tokenSend.data === false) {
                noRecovery();
            }else {
                recoveryOk();
                routerHistory.push('/home')
            }
        }
       
    }
 return (
     <>
         <MDBContainer className="container-fluid">
        <MDBRow className="justify-content-center" >
        <MDBCol md="4" className="mt-4" >
            <form onSubmit={handleSubmit(changeSend)} className="bg mb-2">
                <p className="h5 text-center mb-4">Ingrese nuevo password</p>
                <div className="grey-text">
                <MDBInput value={value.password || ""} group type="password" ref ={registrer} label="Ingrese password"  icon="lock" onChange={handler} name="password" required />
                <label className="text-danger">{errors.password?.message}</label>
                <MDBInput value={value.repeatPassword || ""} group type="password" ref ={registrer} label="Repita password"  icon="lock" onChange={handler} name="repeatPassword" required />
                <label className="text-danger">{errors.repeatPassword?.message}</label>

                </div>
                <div className="text-center">
                <MDBBtn   type="submit"  > Recuperar </MDBBtn>  
                </div>  
            </form>
        </MDBCol>
        </MDBRow>
    </MDBContainer>




     </>
 )

}
export default Recovery;