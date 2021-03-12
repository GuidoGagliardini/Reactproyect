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

    useEffect(()=>{
        const verifytoken  = async (e)=>{
                try {  
                    const token = sessionStorage.getItem('JWT');
                    const result = await API.get(`auth/authuser/${token}`);
                    setFetching(false)
                    setJwt(result.data.datosUsers);
                    console.log(result);
                    if(result.data.datosUsers.estado === 1){
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

    },[]);
    
   
   
    

    
    
    return (<>
        {isFetching && <Loading />}
        {<PerfilAdmin usuarios={jwtverify} />}
       
    </>
        )
    }
 
export default Perfiles;