import React, {useContext, useEffect, useState } from 'react';
import {Nav, NavLink, Container} from 'react-bootstrap';
import { Link, useHistory, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import {perfilesContext} from './Perfiles';
import Sidebar from './Sidebar';


// import './PerfilAdmin.css'
const PerfilAdmin = ({handle,props}) => {
  const [datos, setDatos] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const usuario = useContext(perfilesContext);
/**FooterOut */
useEffect(()=>{
  const footer = async ()=>{
      try {
        handle(true);
        
      } catch (error) {
          console.log(error)
        }
        return ()=> handle(true);
  }
  const cargaDatos =  ()=>{
    setDatos(props);
  }
  cargaDatos();
  footer();
},[handle]);
/**EndFooterOut */
/***PODER USAR LAS PROPS PARA RENDERIZAR EL NOMBRE DE USUARIO Y LOS DATOS DEL USUARIO NO USAR
 * SESSIONSTORAGE 
 */
const toggleSidebar  = () =>{
  setShowSidebar((prev) => !prev);
}
    return (<>
      <Container className="header-container sticky-top bg-white p-0" fluid >
        {!showSidebar ? (
          <AiOutlineMenu
            onClick={toggleSidebar}
            className="header-menu-icon mx-4"
          />
        ) : (
          <AiOutlineClose
            onClick={toggleSidebar}
            className="header-menu-icon mx-4"
          />
        )}
        <Link to={'/'}><img className="header-logo ms-2 me-auto" /**src={logo} */ alt="Logo de la organización" /></Link>
      </Container>
      <Sidebar show={showSidebar} close={toggleSidebar} />

    </>  );
}
 
export default PerfilAdmin;