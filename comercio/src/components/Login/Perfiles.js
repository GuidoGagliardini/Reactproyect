import React, { useEffect, useState } from 'react';
import Loading from './../common/Loading';
import { useHistory } from 'react-router-dom';
import API from './../../api';
import PerfilAdmin from './PerfilAdmin';
import {accesNot} from './../../services/useSweetAlert';

const Perfiles = ( props ) => {
 
    const routerHistory = useHistory();
    const [jwtverify,setJwt] = useState();
    const [isFetching,setFetching] = useState(true);
    const arrayUsers =[];
    const verifytoken  = async (e)=>{
                try {  
                    const token = sessionStorage.getItem('JWT');
                    const {data} = await API.get(`auth/authuser/${token}`);
                    const datos = data.datosUsers;
                    arrayUsers.push(datos);
                    setFetching(false);
                    console.log("DATOS",datos)
                    if(datos.estado === 1){
                        // sessionStorage.setItem("USUARIO", datosUsers.usuario);
                        // sessionStorage.setItem("ID", datosUsers.id);
                        routerHistory.push("/perfil/perfiladmin")
                        }   
                      else{
                        accesNot();
                        routerHistory.push('/login')
    
                    }
                } catch (error) {
                    console.error()
                }
        }
        
    verifytoken();
  
    console.log(arrayUsers);
    return (<>
        {isFetching && <Loading /> ,
        <PerfilAdmin usuarios = {arrayUsers}/>
        }
    
       
    </>
        )
    }
 
export default Perfiles;