import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Col,
  Row,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { Form } from '@unform/web';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import Inputs from '../../components/Inputs';
import Select from '../../components/Select';

interface FormData {
  name: string;
  officce: string;
  salary: number;
  companyId: string;
}

interface OfficceData {
  id: string;
  name: string;
}

const NewEmployee: React.SFC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [officce, setOfficce] = useState<OfficceData[]>([]);
  const handleSubmit = useCallback(
    async (data: FormData) => {
      data.companyId = user.id;
      data.salary = Number(String(data.salary).replace(',', '.'));

      console.log(data);
      await api.post('/employee', data);

      history.push('/dashboard');
    },
    [history],
  );

  useEffect(() => {
    async function data(): Promise<void> {
      await api.get(`/office`).then(officce => {
        setOfficce(officce.data);
      });
    }
    data();
  }, []);
  return (
    <Container>
      <br />
      <br />
      <br />
      <br />
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label>Nome do funcionário</Label>
              <Inputs
                name="name"
                type="text"
                placeholder="Nome do funcionário"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Cargo</Label>
              <Select name="officeId" data={officce} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Salário</Label>
              <Inputs name="salary" placeholder="Salário" />
            </FormGroup>
          </Col>
        </Row>
        <Button color="success">Cadastrar</Button>{' '}
        <Button color="danger" onClick={() => history.goBack()}>
          Cancelar
        </Button>
      </Form>
    </Container>
  );
};

export default NewEmployee;
