import React from 'react';

import { useEffect, useState } from 'react';
import useGet from './../../services/useHTTP';
import { Link } from "react-router-dom";
import moment from 'moment';
import Loading from './../common/Loading';
import AXIOS from 'axios';
import {Container} from 'react-bootstrap';

import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
const Home = () => {
  
  const [data,isFetching,error] = useGet({url:"https://www.cultura.gob.ar/api/v2.0/convocatorias/"});
  const [info,setInfo] = useState();
  const [previousPage,setPreviousPage] = useState([]);
  const {results,next,previous} = data;
 
  useEffect(()=>{
    setInfo(results,next,previous);
    
  },[])
  const Siguiente = async ()=>{
    const siguientes =  await AXIOS.get(next);
    console.log(siguientes)
    setInfo(siguientes.data.results);
    setPreviousPage(siguientes.data.previous);
    
   
  }
  const Anterior = async ()=>{
    const antereiores = await AXIOS.get(previousPage)
    setInfo(antereiores.data.results);
  }
 console.log("acaInfo ",info)
 
  return ( <>
  {error && <Loading /> }
    <Container mt={10} >
      <div className= "row justify-content-center">

       <MDBBtn className="text-center" onClick={Anterior}>Anterior</MDBBtn>
        <MDBBtn onClick={Siguiente}> Siguiente</MDBBtn>
      </div>
        {isFetching & error  ? <Loading /> : 
      <MDBRow  className="justify-content-center">
        
        {info?.map(({imagen,id,titulo,documentos,fecha_inicio,fecha_fin,estado}) =>(
                  
         <MDBCol className="justify-content-center" key={id} size="4" >
            <MDBCard style={{ width: "22rem" }}>
                  <MDBCardImage mb="2"  src={imagen} variant="top" className="img-fluid"  overlay="white-light" />
                  <MDBCardBody>
                  <MDBCardTitle>{titulo}</MDBCardTitle>
                  <MDBCardText>
                   <p>Estado : {estado!="abierta" ? "🛑" : "🟢" }</p>
                   <p>Fecha inicio: {moment(fecha_inicio).format("DD-MM-YYYY")}</p>
                   <p>Fecha Fin : {moment(fecha_fin).format("DD-MM-YYYY")}</p>
                  </MDBCardText>
                  <Link  to={`/convocatoria/${id}`} className="text-white" > 
                  <MDBBtn role="link" >
                  Ver Mas
                  </MDBBtn> 
                  </Link>
                  <Link  variant="primary" mt="2" to={documentos[1]}>
                  Descargar Info 📥 
                  </Link>     
                  </MDBCardBody>

                
                  </MDBCard> 
                  </MDBCol>
      ))}
        
        
      </MDBRow>
        }

    </Container>
    
    </> );
}
 
export default Home;