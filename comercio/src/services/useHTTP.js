import {useState,useEffect} from 'react';
import API from './../api';
const useGet = ({url,initialState =[]}) => {
    //aca ponogo el initialState vacio porque es el array que me llega de la api
    //regfla de hooks personalizados es que empiece con USE recordar siempre
    //RECORDAR SIEMPRE QUE EL USEEFFECT ES COMO EL NGONIT SE EJECTUA SIEMPRE AL PRINCPIO
    //POR ESO PARA EL POST NO SE USA NO VA
    const [data,setData] = useState(initialState);
    const [error,setError] = useState(false);
    const [isFetching,setFetching] = useState(true);


    useEffect(()=>{
        const get = async () =>{
            try {
                const {data}  = await API.get(url);
                //aca le paso a axios la url y me devuelve
                //  un Objeto data todo el array de json que traiga esa url
                setData(data);
                setFetching(false);
                
            } catch (e) {
                console.log(e);
                setError(true);
                //aca lo que hago es motrar el erorr por consolar y setear el estado de error en true   
            } 
        }
        get(); // forma de retorna la funcion que creamos
    },[url]);
    return [data,isFetching,error];
} ;


export default useGet;
