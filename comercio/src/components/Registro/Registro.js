import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useCustomForm from './../../services/useCustomForm';
import {alertRegistro, verifyNo} from './../../services/useSweetAlert';
import { useNavigate } from 'react-router-dom';
import API from './../../api';


const schema = yup.object().shape({
    usuario: yup.string().required("obligatorio").min(5,'minimo 5 letras'),
    password: yup.string().required("obligatorio").min(5,"minimo 5 letras").max(20,"maximo 10 letras"),
    repeatPassword: yup.string().required("oblgatorio").min(5,"minimo 5 letras").max(20,"maximo 10 letras"),
    email : yup.string().email("Mail invalido").required("obligatorio")
});
const Registro = () => {
const routerHistory = useNavigate();
const [value,handler,setValues] = useCustomForm();
const {register,handleSubmit,errors} = useForm({
    resolver: yupResolver(schema),
});
const registro =  async  (e) =>{
    const result = await API.post("users/registro", value);
    if (result.data === false){
        verifyNo();
        setValues({ ...value,
            usuario:"",
            password: "",
            repeatPassword : "",
            email: ""
        });

    }else{
        alertRegistro();
        routerHistory.push('home');
        setValues({value});
    }
}
    return (<>
   
        <div className="row justify-content-center">
            <div className="col-md-4 col-sm-12 text-center">
            <h2 className= "form-group text-info">Registro de Usuario</h2>
            </div>
         </div>
        <div className="row justify-content-center">
            <div className="col-md-4 col-sm-12">
            <form onSubmit={handleSubmit(registro)}>
                <div className="form-group">
                    <input className="form-control"
                    type="text"
                    name="usuario"
                    ref={register}
                    onChange={handler} 
                    placeholder="Ingrese Usuario"
                    value = {value.usuario || ""} />
                    <label className="text-danger">{errors.usuario?.message}</label>
                    </div>
                    <div className="form-group">
                    <input className="form-control"
                    type="password"
                    name="password"
                    ref={register}
                    onChange={handler}
                    placeholder="Ingrese password"
                    value={value.password ||""} />
                    <label className="text-danger">{errors.usuario?.message}</label>
                    </div>
                    <div className="form-group">
                    <input className="form-control"
                    type="password"
                    name="repeatPassword"
                    ref={register} 
                    onChange={handler} 
                    placeholder="Repita password" 
                    value={value.repeatPassword ||""}/>
                    <label className="text-danger">{errors.repeatPassword?.message}</label>
                    <label className="text-danger">{value.password!=value.repeatPassword ? "No coindicen" : ""}</label>
                    </div>
                    <div className="form-group">
                    <input className="form-control"
                    type="text"
                    name="email" 
                    ref={register}
                    onChange={handler}
                    placeholder="example@gmail.com..." 
                    value={value.email ||""}/>
                    <label className="text-danger">{errors.email?.message}</label>
                    </div>
                <button className="btn btn-primary btn-block bg-info text-white" name="registrar">
                   Registrate!
                </button>


            </form>
            </div>

        </div>

  
    </>  );
}
 
export default Registro;