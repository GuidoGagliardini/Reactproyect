import {useState} from 'react';
//Con este Hook Personalizado manejamos el estado de los formularios de
/** cada vez que se ejecute un evento Change se ejecuta esta funcion */

const useCustomForm = () => {
    const [state,setState] = useState({});
    //seteo el state como un objeto vacio
    //Recomendacion de react trabajar con variables planas, osea que no sea objeto ni array.
    const handlerChange =(e) => {
        setState ({...state, [e.target.name]:e.target.value})
    };
    
   
   return [state,handlerChange,setState];
 

}
 
export default useCustomForm;