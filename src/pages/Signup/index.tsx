import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Col, Row, Button, FormGroup, Label } from 'reactstrap';
import { Form } from '@unform/web';
import api from '../../services/api';

import Inputs from '../../components/Inputs';

interface SignupFormData {
  name: string;
  user: string;
  zipcode: number;
  address: string;
  complement: string;
  neighborhood: string;
  uf: string;
  password: string;
  companyId: string;
}

const Signup: React.SFC = () => {
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignupFormData) => {
      const company = await api.post('/company', data);

      data.companyId = company.data.id;

      console.log(data);
      await api.post('/admin', data);

      history.push('/');
    },
    [history],
  );

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
              <Label>Nome da empresa</Label>
              <Inputs name="name" type="text" placeholder="Nome da empresa" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>usuario</Label>
              <Inputs name="user" type="text" placeholder="Usuário" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Senha</Label>
              <Inputs name="password" type="password" placeholder="Senha" />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={2}>
            <FormGroup>
              <Label>Cep</Label>
              <Inputs
                name="zipcode"
                type="text"
                id="cep"
                placeholder="Cep"
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Endereço</Label>
              <Inputs
                name="address"
                type="text"
                placeholder="Endereço"
                id="rua"
                required
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Bairro</Label>
              <Inputs
                name="neighborhood"
                type="text"
                placeholder="Bairro"
                id="bairro"
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label>Cidade</Label>
              <Inputs
                name="city"
                type="text"
                placeholder="Cidade"
                id="cidade"
                required
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Estado</Label>
              <Inputs
                name="uf"
                type="text"
                placeholder="Estado"
                id="uf"
                required
              />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Label>Complemento</Label>
              <Inputs name="complement" type="text" placeholder="Complemento" />
            </FormGroup>
          </Col>
        </Row>
        <Button color="success">Cadastrar -se</Button>{' '}
        <Button color="danger" onClick={() => history.goBack()}>
          Cancelar
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
