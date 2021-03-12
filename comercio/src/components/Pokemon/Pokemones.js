import React, { useEffect, useState } from 'react';
import useGet from './../../services/useHTTP';
import { Link } from "react-router-dom";
import {Card,Button,Row,Col, Container} from 'react-bootstrap';
import Loading from './../common/Loading';
import API  from './../../api';
import FooterComponent from '../common/FooterComponent';
const Pokemones = () => {
    const  [data,isFetching,error] = useGet({url:"https://pokeapi.co/api/v2/pokemon"});
    const [pokeData,setPokeData] = useState([]);
    const {results,next,previous} = data;
    useEffect(()=>{
      if (results){
        setPokeData(results)
      }else {
        console.log("ERROR")
      }
    })
    const nextPage  = async () =>{
      const result = await API.get(next);
      const pagina = result.data.results
      setPokeData([...pokeData], pagina);
      
      
    }
   
   

    return ( <>
        <Container className="bg-black">
        <button>Anterior</button>
        <button  onClick={nextPage}>Siguiente</button>
            <Row className="justify-content-center"> 
              
            {isFetching && <Loading />}  
           {pokeData?.map(({name,url}) =>(
             <Col md="4" lg="4" xs="12" key={name}>       
                <Card>
                  <Card.Body>
                    <Card.Title>
                    {name}  
                    </Card.Title>
                    <Button variant="primary" block>
                      <Link className="text-white" to={url}>
                        Ver
                      </Link>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>  
                ))}    
            </Row>
        </Container>
       
    </>
         );
}
 
export default Pokemones;