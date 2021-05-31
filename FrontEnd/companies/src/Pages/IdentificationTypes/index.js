import React, { useEffect, useState } from 'react';
import {
  Card,
  Container,
  Dropdown,
  DropdownButton,
  Table,
} from 'react-bootstrap';
import toast from 'react-hot-toast';
import IdentificationType from '../../Components/IdentificationType';
import Paginable from '../../Components/Paginable';
import Toolsbar from '../../Components/Toolsbar';
import ApiService from '../../Helpers/Api';

const IdentificationTypes = () => {
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
    name: '',
    companyType: true,
    state: true,
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
      url: 'api/IdentificationTypes/GetItems',
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

  const handleState = (id) => {
    const request = {
      data,
      url: `api/IdentificationTypes/ChangeState?id=${id}`,
    };

    toast
      .promise(ApiService.putObject(request), {
        loading: 'Cambiando estado...',
        success: <b>Item actualizado!</b>,
        error: <b>No se pudo actualizar.</b>,
      })
      .then((response) => {
        getData();
      });
  };
  const resetForm = () => {
    setObject({
      id: 0,
      name: '',
      companyType: true,
      state: true,
    });
  };

  return (
    <Container role='main'>
      <Card body>
        <Card.Title>Tipos de identificación</Card.Title>

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
              <th>Nomber</th>
              <th>Tipo empresa</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  {item.companyType ? (
                    <i className='fas fa-check mr-2 text-success' />
                  ) : (
                    <i className='fas fa-times mr-2 text-danger' />
                  )}
                </td>
                <td>
                  <span
                    className={`badge ${
                      item.state ? 'badge-success' : 'badge-danger'
                    }`}
                  >
                    {item.state ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
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
                          name: item.name,
                          companyType: item.companyType,
                          state: item.state,
                        });
                        handleShow();
                      }}
                    >
                      <i className='fas fa-user-edit mr-2' />
                    </a>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleState(item.id);
                      }}
                    >
                      {item.state ? (
                        <i className='fas fa-times mr-2 text-danger' />
                      ) : (
                        <i className='fas fa-check mr-2 text-success' />
                      )}
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
      <IdentificationType
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

export default IdentificationTypes;
