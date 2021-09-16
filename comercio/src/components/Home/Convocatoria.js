import React,{useState} from 'react';
import  {useParams,Link} from 'react-router-dom';
import useGet from './../../services/useHTTP';
import {Container,Row,Col,Modal,Image,Button} from 'react-bootstrap';
import Loading from './../common/Loading';

const Convocatoria = () => {
    const {id} = useParams();
    const [data,isFetching,error] = useGet({url:`https://www.cultura.gob.ar/api/v2.0/convocatorias/${id}`})
    const {bajada,cuerpo,titulo,imagen} = data;

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    
    };
    const handleShow = () => setShow(true);
    return ( <>
    {isFetching && <Loading />}
    {error && <Loading />}
    <Container  >
    <h1>{titulo}</h1>
        <Row   >

            <Col md>
            <p>{bajada}</p>
            <Image src={imagen} variant="top"  fluid />
            {cuerpo}
            </Col>

            <Col md>
            <Button variant="primary" onClick={handleShow}>
                Descarga Aqui 📥
            </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Link>
           
            </Link>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>



            </Col>

        </Row>
       

    </Container>
        
    </> );
}
 
export default Convocatoria;