import React from 'react';

import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import { useState} from 'react'; // usar lazy suspense
import NavbarComponent from './components/common/NavbarComponent';
import Home from './components/Home/Home';
import Graficos from './components/Graficos';

import Pokemones from './components/Pokemon/Pokemones';
import Convocatoria from './components/Home/Convocatoria';
import Login from './components/Login/Login';
import Registro from './components/Registro';
import Verify from './components/Verify';
import FooterComponent from './components/common/FooterComponent';
import 'mdbreact/dist/css/mdb.css';
import Recovery from './components/RecoveryPass';
import { Change } from './components/RecoveryPass/Recovery';
import Perfiles from './components/Login/Perfiles';
import PerfilAdmin from './components/Login/PerfilAdmin';


function App() {
const [footerFlag, setFooterFlag] = useState(true);

  return (
    <>
    
    <Router>
    <NavbarComponent />
    <Routes>
    <Route path="/"  element={<Home />} />
    <Route path="/home"   element={<Home />} />
    <Route path="/convocatoria/:id" element={<Convocatoria />} />
    <Route path="/pokemones"    element={<Pokemones />} />
    <Route path="/graficos"    element={<Graficos />} />
    <Route path="/login"    element={<Login />}  />
    <Route path="/registro"    element={<Registro />} />
    <Route path="/verify/:verify_code/:email"   element={<Verify />} />
    <Route path="/recovery"    element={<Recovery />} />
    <Route path="/change/:token"   element={<Change />} />
    <Route path="/perfiles"   element={<Perfiles />} />
    <Route path="/perfil/perfiladmin"  render={(props)=>{
      return <PerfilAdmin  {...props} handle={setFooterFlag} />
    }}  /> 
    </Routes>
       
    {/* siempre a la raiz se le pone el exact(es un boolean) siempre ponerle el exact 
    a los /algo/alguito (ahi llevaria el exact el /algo) */}

    <FooterComponent  footerflag ={footerFlag}/>
    
    </Router>
    

    
    </>

  );
}

export default App;
