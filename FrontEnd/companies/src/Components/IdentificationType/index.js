import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import ApiService from '../../Helpers/Api';

const IdentificationType = ({
  show,
  setShow,
  handleClose,
  handleShow,
  isEditMode,
  item,
  resetForm,
  setItem,
  getData,
}) => {
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
    const request = {
      data: item,
      url: `api/IdentificationTypes`,
    };

    toast
      .promise(ApiService.postObject(request), {
        loading: 'Creando...',
        success: <b>Item creado!</b>,
        error: <b>No se pudo crear.</b>,
      })
      .then(() => {
        handleClose();
        resetForm();
        getData();
      });
  };

  const handleUpdate = () => {
    const request = {
      data: item,
      url: `api/IdentificationTypes/${item.id}`,
    };

    toast
      .promise(ApiService.putObject(request), {
        loading: 'Actualizando...',
        success: <b>Item actualizado!</b>,
        error: <b>No se pudo actualizar.</b>,
      })
      .then(() => {
        handleClose();
        resetForm();
        getData();
      });
  };

  console.log(item);
  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? 'Actualizar Tipo' : 'Nueva Tipo'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type='text'
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            placeholder='Documento excluir'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tipo Empresa</Form.Label>
          <Form.Control
            as='select'
            value={item.companyType}
            onChange={(e) => setItem({ ...item, companyType: e.target.value })}
          >
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Estado</Form.Label>
          <Form.Control
            as='select'
            value={item.state}
            onChange={(e) => setItem({ ...item, state: e.target.value })}
          >
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IdentificationType;
