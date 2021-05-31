import React, { useEffect, useState } from 'react';
import {
  Card,
  Container,
  Dropdown,
  DropdownButton,
  Table,
} from 'react-bootstrap';
import toast from 'react-hot-toast';
import Blacklist from '../../Components/Blacklist';
import Paginable from '../../Components/Paginable';
import Toolsbar from '../../Components/Toolsbar';
import ApiService from '../../Helpers/Api';

const Blacklists = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantityShow, setQuantityShow] = useState(10);
  const [searchData, setSearchData] = useState('');
  const [data, setData] = useState({
    currentPage,
    quantityShow,
    pageable: true,
    isSearch: true,
    searchData,
  });

  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [object, setObject] = useState({
    id: 0,
    identificationNumber: 0,
  });
  const handleClose = () => {
    resetForm();
    setShow(false);
  };
  const handleShow = () => setShow(true);
  useEffect(() => {
    getData();
  }, [data]);

  const getData = () => {
    const request = {
      data,
      url: 'api/BlackLists/GetItems',
    };
    ApiService.postObject(request).then((response) => {
      if (response && response.data) {
        console.log(response);
        setItems(response.data);
        setTotalPages(response.pages);
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setData({
      currentPage: 1,
      quantityShow,
      pageable: true,
      isSearch: true,
      searchData,
    });
  };

  const previousPage = () => {
    const p = currentPage - 1;
    setCurrentPage(p);
    setData({
      currentPage: p,
      quantityShow,
      pageable: true,
      isSearch: true,
      searchData,
    });
  };

  const nextPage = () => {
    const p = currentPage + 1;
    setCurrentPage(p);
    setData({
      currentPage: p,
      quantityShow,
      pageable: true,
      isSearch: true,
      searchData,
    });
  };

  const handleDelete = (id) => {
    const request = {
      data,
      url: `api/BlackLists/${id}`,
    };

    toast
      .promise(ApiService.deleteObject(request), {
        loading: 'Eliminando...',
        success: <b>Item eliminado!</b>,
        error: <b>No se pudo eliminar.</b>,
      })
      .then(() => {
        getData();
      });
  };
  const resetForm = () => {
    setObject({
      id: 0,
      identificationNumber: 0,
    });
  };

  return (
    <Container role='main'>
      <Card body>
        <Card.Title>Excepciones</Card.Title>

        <Toolsbar
          searchData={searchData}
          setSearchData={setSearchData}
          handleSearch={handleSearch}
          handleShow={handleShow}
          setIsEditMode={setIsEditMode}
        />

        <Table
          responsive
          striped
          bordered
          hover
          size='sm'
          className='text-center'
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Documento</th>
              <th>fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.identificationNumber}</td>
                <td>{item.dateTime}</td>
                <td>
                  <>
                    <a
                      className='text-info'
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditMode(true);
                        setObject({
                          ...object,
                          id: item.id,
                          identificationNumber: item.identificationNumber,
                        });
                        handleShow();
                      }}
                    >
                      <i className='fas fa-user-edit mr-2' />
                    </a>
                    <a
                      className='text-danger'
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(item.id);
                      }}
                    >
                      <i className='fas fa-times mr-2' />
                    </a>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {items.length > 0 && (
          <Paginable
            page={currentPage}
            totalPages={totalPages}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        )}
      </Card>
      <Blacklist
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        isEditMode={isEditMode}
        resetForm={resetForm}
        setItem={setObject}
        item={object}
        getData={getData}
      />
    </Container>
  );
};

export default Blacklists;
