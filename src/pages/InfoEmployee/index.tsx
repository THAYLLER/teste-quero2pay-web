import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Label, Button } from 'reactstrap';
import { Form } from '@unform/web';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import Inputs from '../../components/Inputs';
import Select from '../../components/Select';

interface FormData {
  name: string;
  salary: number;
  company: string;
  office: {
    name: string;
  };
}

const InfoEmployee: React.SFC = () => {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useAuth();
  const [employee, setEmployeee] = useState<FormData>();

  useEffect(() => {
    async function data(): Promise<void> {
      await api.get(`/employee/${user.id}/${id}`).then(employee => {
        setEmployeee(employee.data);
      });
    }
    data();
  }, [id, user.id]);

  console.log(employee);

  return (
    <Container>
      <br />
      <br />
      <br />
      <br />
      <Label>nome da empresa: {user.name}</Label> <br />
      <Label>nome do funcionário: {employee?.name}</Label> <br />
      <Label>
        salário do funcionário: R$
        {employee?.salary.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
      </Label>
      <br />
      <Label>cargo do funcionário: {employee?.office.name}</Label> <br />
      <Button color="warning" onClick={() => history.goBack()}>
        voltar
      </Button>
    </Container>
  );
};

export default InfoEmployee;
