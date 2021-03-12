import React, { useState,useEffect } from 'react';
import {Nav} from 'react-bootstrap';
import './PerfilAdmin.css'

// import './PerfilAdmin.css'
const PerfilAdmin = ({handle}) => {
console.log(handle)
useEffect(()=>{
  const footer = async ()=>{
      try {
        handle(false)
        
      } catch (error) {
          console.log(error)
      }
  }
  footer();
  return ()=> handle(true);

},[handle])
    //Construir un sistema de Logout automatico cuando se caduque el token o reiniciar el token
  
    return (<>
           
            <Nav className="col-md-12 d-none d-md-block bg-dark sidebar" >
         
            <Nav.Item >
                <Nav.Link className="text-color-white" > Link1 </Nav.Link>
            </Nav.Item>

            </Nav>
    
        
    </>  );
}
 
export default PerfilAdmin;