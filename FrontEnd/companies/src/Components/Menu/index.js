import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' fixed='top' expand='md'>
        <Navbar.Brand href='/'>Compañias App</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Item>
            <Nav.Link>
              <Link to='/company'>Compañias</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to='black-list'>Excepciones</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to='identification-type'>Tipos identificación</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Menu;
