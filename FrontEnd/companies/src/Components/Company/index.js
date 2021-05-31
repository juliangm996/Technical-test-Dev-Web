import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import ApiService from '../../Helpers/Api';
import ValidateBlackList from '../ValidateBlackList';

const Company = ({
  show,
  setShow,
  handleClose,
  handleShow,
  isEditMode,
  resetForm,
  getData,
  selectId,
  setIsEditMode,
  float,
  setSelectId,
}) => {
  const [item, setItem] = useState({
    id: 0,
    identificationTypeId: 0,
    identificationNumber: 0,
    companyName: '',
    name: '',
    middleName: '',
    surname: '',
    secondSurname: '',
    email: '',
    phone: '',
    isMobileMessage: true,
    isEmailMessage: true,
  });
  const [isValid, setIsValid] = useState(false);
  const [types, setTypes] = useState([]);
  const [companyType, setCompanyType] = useState(false);
  const [identification, setIdentification] = useState(0);

  useEffect(() => {
    if (isEditMode) {
      setIsValid(true);
      getItem();
    } else {
      setIsValid(false);
    }
  }, [isEditMode, selectId]);

  useEffect(() => {
    if (isValid) {
      setItem({ ...item, identificationNumber: identification });
    }
  }, [isValid]);
  useEffect(() => {
    getType();
  }, []);

  const getItem = () => {
    const request = {
      url: `api/Companies/${selectId}`,
    };

    ApiService.getObject(request).then((response) => {
      if (response) {
        setItem({
          id: response.id,
          identificationTypeId: response.identificationTypeId,
          identificationNumber: response.identificationNumber,
          companyName: response.companyName,
          name: response.name,
          middleName: response.middleName,
          surname: response.surname,
          secondSurname: response.secondSurname,
          email: response.email,
          phone: response.phone,
          isMobileMessage: response.isMobileMessage,
          isEmailMessage: response.isEmailMessage,
        });
      }
    });
  };

  const getType = () => {
    const request = {
      data: {
        currentPage: 1,
        quantityShow: 1,
        pageable: false,
        isSearch: false,
        searchData: '',
      },
      url: 'api/IdentificationTypes/GetItems',
    };
    ApiService.postObject(request).then((response) => {
      if (response && response.data) {
        setTypes(response.data);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditMode) {
      handleCreate();
      return;
    }
    handleUpdate();
    return;
  };

  const handleCreate = () => {
    const emailValid = validateEmail(item.email);
    const data = {...item,id:0}
    if (emailValid) {
      const request = {
        data,
        url: `api/Companies`,
      };

      toast
        .promise(ApiService.postObject(request), {
          loading: 'Creando...',
          success: <b>Item creado!</b>,
          error: <b>No se pudo crear.</b>,
        })
        .then(() => {
          handleReset();
            getData();
          
        });
    } else {
      toast.error('Direccion de correo electronica incorrecta');
    }
  };

  const handleUpdate = () => {
    const emailValid = validateEmail(item.email);
    if (emailValid) {
      const request = {
        data: item,
        url: `api/Companies/${item.id}`,
      };

      toast
        .promise(ApiService.putObject(request), {
          loading: 'Actualizando...',
          success: <b>Item actualizado!</b>,
          error: <b>No se pudo actualizar.</b>,
        })
        .then(() => {
          handleReset();
          getData();
        });
    } else {
      toast.error('Direccion de correo electronica incorrecta');
    }
  };

  const chekType = (id) => {
    const type = types.find((i) => i.id == id);
    setCompanyType(type.companyType);
    setItem({ ...item, identificationTypeId: id });
  };
  const validateEmail = (value) => {
    const emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(value)) {
      return true;
    } else {
      return false;
    }
  };
  const handleReset = () => {
    setItem({
      id: 0,
      identificationTypeId: 0,
      identificationNumber: 0,
      companyName: '',
      name: '',
      middleName: '',
      surname: '',
      secondSurname: '',
      email: '',
      phone: '',
      isMobileMessage: true,
      isEmailMessage: true,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? 'Actualizar compañia' : 'Nueva compañia'}
        </Modal.Title>
      </Modal.Header>
      {!isValid ? (
        <ValidateBlackList
          setIsValid={setIsValid}
          identification={identification}
          setIdentification={setIdentification}
          setIsEditMode={setIsEditMode}
          setSelectId={setSelectId}
        />
      ) : (
        <Modal.Body>
          <Form.Group as={Row}>
            <Col sm={6}>
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as='select'
                value={item.identificationTypeId}
                onChange={(e) => chekType(e.target.value)}
              >
                {types.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Form.Control>
            </Col>
            <Col sm={6}>
              <Form.Label>Numero</Form.Label>
              <Form.Control
                type='number'
                value={item.identificationNumber}
                onChange={(e) =>
                  setItem({ ...item, identificationNumber: e.target.value })
                }
              />
            </Col>
          </Form.Group>
          {companyType ? (
            <Form.Group>
              <Form.Label>Nombre Empresa</Form.Label>
              <Form.Control
                type='text'
                value={item.companyName}
                onChange={(e) => setItem({ ...item, companyName: e.target.value })}
                placeholder='Documento excluir'
                required={companyType}
              />
            </Form.Group>
          ) : (
            <Form.Group as={Row}>
              <Col sm={3}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type='text'
                  value={item.name}
                  onChange={(e) => setItem({ ...item, name: e.target.value })}
                  required={!companyType}
                />
              </Col>
              <Col sm={3}>
                <Form.Label>Segundo Nombre</Form.Label>
                <Form.Control
                  type='text'
                  value={item.middleName}
                  onChange={(e) =>
                    setItem({ ...item, middleName: e.target.value })
                  }
                />
              </Col>
              <Col sm={3}>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type='text'
                  value={item.surname}
                  onChange={(e) =>
                    setItem({ ...item, surname: e.target.value })
                  }
                  required={!companyType}
                />
              </Col>
              <Col sm={3}>
                <Form.Label>Segundo Apellido</Form.Label>
                <Form.Control
                  type='text'
                  value={item.secondSurname}
                  onChange={(e) =>
                    setItem({ ...item, secondSurname: e.target.value })
                  }
                />
              </Col>
            </Form.Group>
          )}

          <Form.Group as={Row}>
            <Col sm={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                value={item.email}
                onChange={(e) => setItem({ ...item, email: e.target.value })}
              />
            </Col>
            <Col sm={6}>
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type='number'
                value={item.phone}
                onChange={(e) => setItem({ ...item, phone: e.target.value })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={6}>
              <Form.Check
                label='Enviar mensajes al email'
                type='checkbox'
                checked={item.isEmailMessage}
                onChange={(e) =>
                  setItem({ ...item, isEmailMessage: e.target.checked })
                }
              />
            </Col>
            <Col sm={6}>
              <Form.Check
                label='Enviar mensajes al telefono'
                type='checkbox'
                checked={item.isMobileMessage}
                onChange={(e) =>
                  setItem({ ...item, isMobileMessage: e.target.checked })
                }
              />
            </Col>
          </Form.Group>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button variant='secondary' onClick={handleReset}>
          Cerrar
        </Button>
        {isValid && (
          <Button variant='primary' onClick={handleSubmit}>
            Guardar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Company;
