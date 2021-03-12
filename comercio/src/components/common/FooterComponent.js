import React, { useState } from 'react';

import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import App from '../../App';

const FooterComponent = ({footerflag}) => {
  const [isOn,setIsOn] = useState(true)
  

 

    return ( <>
    { footerflag ?  

<MDBFooter color="stylish-color-dark" className="page-footer font-small pt-4 mt-4">
  <MDBContainer fluid className="text-center text-md-left">
    <MDBRow>
      <MDBCol md="6">
        <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
          Nuestros Servicios
        </h5>
        <p>
          Aca viene una descripcion chica del emprendimiento y datos de contancto bla bla.
        </p>
      </MDBCol>
      <hr className="clearfix w-100 d-md-none" />
      <MDBCol md="">
        <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
          Links
        </h5>
        <ul className="list-unstyled">
          <li>
            <a >Link 1</a>
          </li>
          <li>
            <a>Link 2</a>
          </li>
        </ul>
      </MDBCol>
      <hr className="clearfix w-100 d-md-none" />
      <MDBCol md="">
        <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
          Links
        </h5>
        <ul className="list-unstyled">
          <li>
            <a >Link 1</a>
          </li>
          <li>
            <a >Link 2</a>
          </li>
        </ul>
      </MDBCol>
      

    </MDBRow>
  </MDBContainer>
  <hr />
  <div className="text-center py-3">
    <ul className="list-unstyled list-inline mb-0">
      <li className="list-inline-item">
        <h5 className="mb-1">Registrate</h5>
      </li>
      <li className="list-inline-item">
        <a className="btn btn-danger btn-rounded">
         Aqui!
        </a>
      </li>
    </ul>
  </div>
  <hr />
  <div className="text-center">
    <ul className="list-unstyled list-inline">
      <li className="list-inline-item">
        <a className="btn-floating btn-sm btn-fb mx-1">
          <i className="fab fa-facebook-f"> </i>
        </a>
      </li>
      <li className="list-inline-item">
        <a className="btn-floating btn-sm btn-tw mx-1">
          <i className="fab fa-twitter"> </i>
        </a>
      </li>
      <li className="list-inline-item">
        <a className="btn-floating btn-sm btn-gplus mx-1">
          <i className="fab fa-google-plus"> </i>
        </a>
      </li>
      <li className="list-inline-item">
        <a className="btn-floating btn-sm btn-li mx-1">
          <i className="fab fa-linkedin-in"> </i>
        </a>
      </li>
      <li className="list-inline-item">
        <a className="btn-floating btn-sm btn-dribbble mx-1">
          <i className="fab fa-dribbble"> </i>
        </a>
      </li>
    </ul>
  </div>
  <div className="footer-copyright text-center py-3">
    <MDBContainer fluid>
      &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
    </MDBContainer>
  </div>
</MDBFooter>

 : null

    }
    
    </> );
}
 
export default FooterComponent;