import React, { useEffect, useState } from 'react';
import Loading from './../common/Loading';
import { useHistory } from 'react-router-dom';
import API from './../../api';
import PerfilAdmin from './PerfilAdmin';
import {accesNot} from './../../services/useSweetAlert';

export const perfilesContext = React.createContext({});
const Perfiles = ( algo ) => {
    const routerHistory = useHistory();
    const [jwtverify,setJwt] = useState();
    const [isFetching,setFetching] = useState(true);
    const arrayUsers =[];
    const verifytoken  = async (e)=>{
                try {  
                    const token = sessionStorage.getItem('JWT');
                    const {data} = await API.get(`auth/authuser/${token}`);
                    arrayUsers.push(data);
                    setFetching(false);
                   
                    if(data.datosUsers[0].estado === 1){
                        sessionStorage.setItem("Usuario",arrayUsers[0].datosUsers[0].usuario)
                        routerHistory.push("/perfil/perfiladmin")
                        }   
                      else{
                        accesNot();
                        routerHistory.push('/login')
    
                    }
                } catch (error) {
                    console.error(error)
                }
        }
        

    useEffect(()=>{
        verifytoken();
    },[arrayUsers])
  
    return (<>
    
        {isFetching && <Loading />  ? null :
       ""
        }
    
       
    </>
        )
    }
 
export default Perfiles;