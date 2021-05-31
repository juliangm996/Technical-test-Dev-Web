import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import ApiService from '../../Helpers/Api';

const Blacklist = ({
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
      url: `api/BlackLists`,
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
      url: `api/BlackLists/${item.id}`,
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
          {isEditMode ? 'Actualizar excepcion' : 'Nueva excepcion'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Documento</Form.Label>
          <Form.Control
            type='number'
            value={item.identificationNumber}
            onChange={(e) =>
              setItem({ ...item, identificationNumber: e.target.value })
            }
            placeholder='Documento excluir'
          />
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

export default Blacklist;
