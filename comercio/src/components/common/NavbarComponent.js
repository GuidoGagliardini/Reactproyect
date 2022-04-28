import React from 'react';
import {Form,Button,Navbar,Nav,FormControl, NavbarBrand} from 'react-bootstrap';
import { NavLink} from 'react-router-dom';

const NavbarComponent = () => {
  // const routes ={
  //   path:'/calendario',
  //   component: Calenadrio}
  // PARA HACER: HACER UN ARRAY CON LAS RUTAS
  //
    return ( <>
   
 
  <Navbar bg="light" expand="lg">
  <NavbarBrand>
  <NavLink to="/home"  activestyle={{color:"tomato"}}>Api Gobierno</NavLink>
  </NavbarBrand>

  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto" >
      <NavLink className="mr-2"  to="/graficos" activestyle={{color:"tomato"}}>Graficos</NavLink> 
      <NavLink className="mr-2"  to="/pokemones" activestyle={{color:"tomato"}}>Pokemones</NavLink>   
      <NavLink to="/login" activestyle={{color:"tomato"}}>Login</NavLink>    
    </Nav>
    <Form >
      <FormControl type="text" placeholder="..." className="mr-sm-2" />
      <Button variant="outline-success">Buscar</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>

    
    </> );
}
 
export default NavbarComponent;