import React, {useEffect, useState } from 'react';
import {Nav, NavLink} from 'react-bootstrap';
import {Navigation} from 'react-minimal-side-navigation';
import { useHistory, useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';


// import './PerfilAdmin.css'
const PerfilAdmin = ({handle,usuarios}) => {
  const [datos, setDatos] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const history = useHistory();
  const location = useLocation();
  console.log(usuarios)
/**FooterOut */
useEffect(()=>{
  const footer = async ()=>{
      try {
        handle(false);
        
      } catch (error) {
          console.log(error)
        }
        return ()=> handle(true);
  }
  const cargaDatos =  ()=>{
    setDatos(usuarios);
  }
  cargaDatos();
  footer();
},[handle]);
/**EndFooterOut */
/***PODER USAR LAS PROPS PARA RENDERIZAR EL NOMBRE DE USUARIO Y LOS DATOS DEL USUARIO NO USAR
 * SESSIONSTORAGE 
 */
console.log(usuarios)

    return (<>
   
      <div className="row pt-2 " >
        <div  className="col-4 ">

<Navigation
  activeItemId={location.pathname}
  onSelect={({ itemId }) => {
    history.push(itemId);
  }}
  
  items={[
    {
      title:`Usuarios`,
      elemBefore : ()=><Icon name="user" />
    },
    {
      title: "Link1",
      itemId: "/home",
      elemBefore: () => <Icon name="coffee" />
    },
    {
      title: "Link2",
      itemId: "/about",
      elemBefore: () => <Icon name="user" />,
    },
    {
      title: "Link3",
      itemId: "/another",
      elemBefore: () => <Icon name="star" />
    }
  ]}
/>


 </div>
 <div className="">
 
  <Navigation
    activeItemId={location.pathname}
    items={[
      {
        title: "Configuracion",
        itemId: "/settings",
        elemBefore: () => <Icon name="activity" />
      }
    ]}
    onSelect={({ itemId }) => {
      history.push(itemId);
    }}
  />


 </div>
  </div>

    </>  );
}
 
export default PerfilAdmin;