import React from 'react';
import useGet from './../../services/useHTTP';
import { Link } from "react-router-dom";
import moment from 'moment';
import Loading from './../common/Loading';
import {Container} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
const Home = () => {
  const  [data,isFetching,error] = useGet({url:"https://www.cultura.gob.ar/api/v2.0/convocatorias/"});
  const {results} = data;
  

 const routerHistory= useHistory();
  const Siguiente = () =>{
    const {next,previus} = data;  
    console.log(data)
  
  }
  return ( <>
    <Container mt={10} >
      <div className= "row justify-content-center">

       <MDBBtn className="text-center" >Anterior</MDBBtn>
        <MDBBtn onClick={Siguiente}> Siguiente</MDBBtn>
      </div>
      <MDBRow  className="justify-content-center">
        {isFetching && <Loading />}
        {results?.map(({imagen,id,titulo,documentos,fecha_inicio,fecha_fin,estado}) =>(
                  
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
    </Container>
    
    </> );
}
 
export default Home;