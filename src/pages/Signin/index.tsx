import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  CardBody,
  Label,
  Button,
} from 'reactstrap';
import { Form } from '@unform/web';

import { useAuth } from '../../hooks/Auth';
import Inputs from '../../components/Inputs';

interface SigninFormData {
  name: string;
  password: string;
}

const Signin: React.FC = () => {
  const { signin } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SigninFormData) => {
      try {
        await signin({
          name: data.name,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        alert('Ocorreu um erro ao fazer login, cheque as credenciais');
      }
    },
    [signin, history],
  );

  return (
    <Container>
      <br />
      <br />
      <Row>
        <Col />
        <Col lg="8">
          <Jumbotron>
            <h3>
              <u>Login</u>
            </h3>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Card>
                <CardBody>
                  <Label for="exampleEmail" className="mr-sm-2">
                    Usuário
                  </Label>
                  <Inputs
                    name="name"
                    type="text"
                    placeholder="Usuário"
                    required
                  />
                  <Label for="examplePassword" className="mr-sm-2">
                    Senha
                  </Label>
                  <Inputs
                    name="password"
                    type="password"
                    placeholder="Senha"
                    required
                  />
                  <br />
                  <br />
                  <Button color="success" size="lg">
                    Enviar
                  </Button>
                </CardBody>
              </Card>
            </Form>
          </Jumbotron>
        </Col>
        <Col />
        <Col md="4" />
        <Col md="5">
          <Button color="success" onClick={() => history.push('/signup')}>
            Ainda não é cliente? Clique aqui
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
