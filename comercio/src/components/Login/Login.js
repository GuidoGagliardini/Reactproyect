import React, { useState } from 'react';
import useCustomForm from './../../services/useCustomForm';
import { yupResolver } from "@hookform/resolvers/yup";
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import API from './../../api';
import {  NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import {loginNot}  from './../../services/useSweetAlert';


/** Aca estoy mezclando StyledComponents con React Boostrap, averiguar como centrar ese div del demonio  */
// const Container =styled.div`
//     background : red,
// `;


const schema = yup.object().shape({
    email: yup.string().required("Obligatorio").min(5,"Minimo 5 letras"),
     password: yup.string().required("Obligatorio")
});

const Login = () => {
    const [jsontoken,setJsontoken] =useState([]);
    
    const routerHistory = useNavigate();
    const [value,handler,setValue] = useCustomForm();
    const {registrer,handleSubmit,errors} = useForm({
        resolvers: yupResolver(schema)
    });
   
    const pruebaLogin = async (e) => {
        
        console.log('enter de Ingresar');
        const result = await API.post("/auth" , value);  
        
        if (result.data === false) {
            loginNot();
            setValue({
                email : value.email,
                password: ""
            })
        }  else{
            const {JWT} = result.data;
            JWT ? sessionStorage.setItem('JWT', JWT) : console.log("NOJWT");
            setJsontoken(JWT);
            routerHistory('/perfiles'); 
        }
        
    }
    return (<>
    {/* tengo que centrar todo y aprender mejor react boostrap porque no se centra!!
     no me andan los validadores cuando el form no esta completo */}
    
    <MDBContainer className="container-fluid">
        <MDBRow className="justify-content-center">
        <MDBCol md="4" className="mt-4" >
            <form onSubmit={handleSubmit(pruebaLogin)}  className="bg-light mb-2" >
            <p className="h5 text-center mb-4">Ingreso</p>
            <div className="grey-text">
               <MDBInput value = {value.email || ""}ref={registrer} label="Email" success="right" icon="envelope" group type="email" onChange={handler} name="email" required />
               <MDBInput value={value.password || ""} group type="password" ref ={registrer} label="Password"  icon="lock" onChange={handler} name="password" required /> 
               
               <label className="text-danger">{errors?.password?.message}</label>
            </div>
            <div className="text-center">
                <MDBBtn   type="submit"  > Ingresar </MDBBtn>  
            </div>    
                <div className="text-center">
                    <NavLink  className="text-center" to="registro">
                         Registro
                    </NavLink>
                </div>
                <div className="text-center">
                <NavLink  className="text-center" to="recovery">
                    Olvido password?
                </NavLink>      
                </div>         
            </form>
            </MDBCol>
        </MDBRow>
      
    </MDBContainer>
    
   
    
    </>  );
}
 
export default Login;