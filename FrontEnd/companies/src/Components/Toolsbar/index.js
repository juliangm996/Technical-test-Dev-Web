import React from 'react';
import { Button, Form, FormControl, Navbar } from 'react-bootstrap';

const Toolsbar = ({
  searchData,
  setSearchData,
  handleSearch,
  handleShow,
  setIsEditMode,
}) => {
  return (
    <Navbar bg='light' expand='lg'>
      {/* <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand> */}
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Form inline onSubmit={handleSearch}>
          <FormControl
            type='text'
            placeholder='Buscar'
            className='mr-sm-2'
            value={searchData}
            onKeyUp={handleSearch}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <Button variant='outline-success' onClick={handleSearch}>
            Buscar
          </Button>
        </Form>
      </Navbar.Collapse>
      <Button
        variant='success'
        onClick={(e) => {
          e.preventDefault();
          setIsEditMode(false);
          handleShow();
        }}
      >
        Nuevo
      </Button>
    </Navbar>
  );
};

export default Toolsbar;
