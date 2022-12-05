import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg' className="fs-4">
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ms-auto'>
              <Nav.Link as={Link} to='/'>
              Home
              </Nav.Link>
              <Nav.Link as={Link} to='/about'>
              About
              </Nav.Link>
             
              {/* if user is logged in show saved Medley and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/me' onClick={() => this.forceUpdate()}>
                    My Medley
                  </Nav.Link>
                  <Nav.Link href='https://ko-fi.com/medley96202' target={'_blank'}>
                Donate to Medley
                </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : ( <>
               <Nav.Link href='https://ko-fi.com/medley96202' target={'_blank'}>
                Donate to Medley
                </Nav.Link>
                <Nav.Link onClick={() => setShowModal(true)}>Login | Sign Up</Nav.Link>

                </>
              )}
                 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal 
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <div class="p-3 mb-2 bg-dark text-white btn-warning">
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
        </div>
      </Modal>
    </>
  );
};

export default AppNavbar;