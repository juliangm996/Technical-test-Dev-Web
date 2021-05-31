import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import ApiService from '../../Helpers/Api';

const ValidateBlackList = ({
  setIsValid,
  identification,
  setIdentification,
  setIsEditMode,
  setSelectId,
}) => {
  const [isblacklist, setIsblacklist] = useState(false);

  const isBlackList = () => {
    const request = {
      url: `api/Companies/IsBlacklist?id=${identification}`,
    };
    ApiService.getObject(request).then((response) => {
      if (response) {
        setIsblacklist(true);
      } else {
        setIsValid(true);
        existCompany();
      }
    });
  };

  const existCompany = () => {
    const request = {
      url: `api/Companies/CompanyExistsByNumber?id=${identification}`,
    };
    ApiService.getObject(request).then((response) => {
      if (response) {
        getItem();
      }
      setIsEditMode(response);
    });
  };

  const getItem = () => {
    const request = {
      url: `api/Companies/GetCompanyByNumber?id=${identification}`,
    };

    ApiService.getObject(request).then((response) => {
      if (response) {
        setSelectId(response.id);
      }
    });
  };

  return (
    <Modal.Body>
      <Form.Group as={Row}>
        <Col sm={12}>
          <Form.Label>Identificacion</Form.Label>
          <Form.Control
            type='number'
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
          />
        </Col>
      </Form.Group>
      {isblacklist && (
        <Form.Group as={Row}>
          <Col sm={12}>
            <Form.Label>{`El documentio ${identification} se encuentra en la lista de excepciones intente con otro docuemnto`}</Form.Label>
          </Col>
        </Form.Group>
      )}
      <Form.Group as={Row}>
        <Col sm={12}>
          <Button onClick={isBlackList}>Validar</Button>
        </Col>
      </Form.Group>
    </Modal.Body>
  );
};

export default ValidateBlackList;
