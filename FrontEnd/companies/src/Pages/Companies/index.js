import React, { useEffect, useState } from 'react';
import {
  Card,
  Container,
  Dropdown,
  DropdownButton,
  Table,
} from 'react-bootstrap';
import toast from 'react-hot-toast';
import Company from '../../Components/Company';
import Paginable from '../../Components/Paginable';
import Toolsbar from '../../Components/Toolsbar';
import ApiService from '../../Helpers/Api';

const Companies = () => {
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
  const [selectId, setSelectId] = useState(0);

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
      url: 'api/Companies/CustomData',
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
      url: `api/Companies/${id}`,
    };

    toast
      .promise(ApiService.deleteObject(request), {
        loading: 'Eliminando...',
        success: <b>Item Eliminando!</b>,
        error: <b>No se pudo eliminar.</b>,
      })
      .then(() => {
        getData();
      });
  };

  const resetForm = () => {
    setSelectId(0);
  };

  return (
    <Container role='main'>
      <Card body>
        <Card.Title>Compañias</Card.Title>

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
              <th>Numero Identificacion</th>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.identificationNumber}</td>
                <td>{item.identificationType}</td>
                <td>{item.displayName}</td>
                <td>{item.email}</td>

                <td>
                  <>
                    <a
                      className='text-info'
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditMode(true);
                        setSelectId(item.id);
                        handleShow();
                      }}
                    >
                      <i className='fas fa-user-edit mr-2' />
                    </a>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(item.id);
                      }}
                    >
                      <i className='fas fa-times mr-2 text-danger' />
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
      <Company
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        resetForm={resetForm}
        selectId={selectId}
        getData={getData}
        float={false}
        setSelectId={setSelectId}
      />
    </Container>
  );
};

export default Companies;
