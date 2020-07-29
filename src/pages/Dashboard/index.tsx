import React, { useEffect, useState, useCallback } from 'react';
import { Table, Container, Row, Col, Button } from 'reactstrap';
import { useHistory, Link } from 'react-router-dom';

import { Form } from '@unform/web';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

import Inputs from '../../components/Inputs';

interface Employee {
  id: string;
  name: string;
  salary: number;
  officeId: string;
  companyId: string;
  office: {
    name: string;
  };
}

interface FormData {
  data: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [employee, setEmployee] = useState<Employee[]>([]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      if (data.data !== '') {
        await api
          .get(`/employee/search/${user.id}/${data.data}`)
          .then(employees => {
            setEmployee(employees.data);
          });
      } else {
        await api.get(`/employee/${user.id}`).then(employee => {
          setEmployee(employee.data);
        });
      }
    },
    [user.id],
  );

  useEffect(() => {
    async function data(): Promise<void> {
      await api.get(`/employee/${user.id}`).then(employee => {
        setEmployee(employee.data);
      });
    }

    data();
  }, [user.id]);

  return (
    <Container>
      <br />
      <br />
      <br />
      <br />
      <br />

      <Row>
        <Col>
          <Button onClick={() => history.push('/new')}>Novo funcionário</Button>
        </Col>
      </Row>
      <br />
      <br />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Inputs
              name="data"
              placeholder="Busque pelo nome de um funcionário"
            />
          </Col>
          <Col>
            <Button>Buscar</Button>
          </Col>
        </Row>
      </Form>
      <br />
      <br />
      <Table bordered>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Salário</th>
            <th>Cargo</th>
          </tr>
        </thead>
        <tbody>
          {employee.map(employee => {
            const link = `/info/${employee.id}`;
            return (
              <tr key={employee.id}>
                <td>
                  <Link to={link}>{employee.name}</Link>
                </td>
                <td>R$ {employee.salary.toFixed(2)}</td>
                <td>{employee.office.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
