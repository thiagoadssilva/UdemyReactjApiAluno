import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'react-bootstrap';
import logoCadastro from './assets/01.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

import './App.css';

function APP(){
  const baseUrl = "https://localhost:7155/api/alunos";

  const [data, setData] = useState([]);

  const pedidoGet = async() =>{
    await axios.get(baseUrl)
      .then(response =>{
        setData(response.data)
      }).catch(error =>{
        console.log(error)
      })
  }

  useEffect(() =>{
    pedidoGet();
  })

  return(
    <div className='App'>
      <h3>Cadastro de Alunos</h3>
      
      <header>
        <img src={logoCadastro} alt="Cadastro"/>
        <button className='btn btn-success'>Incluir Novo Aluno</button>
      </header>

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>NOME</th>
          <th>E-MAIL</th>
          <th>IDADE</th>
          <th>OPERAÇÔES</th>
        </tr>
      </thead>
      
      <tbody>
        {data.map(aluno =>(
          <tr key={aluno.id}>
            <td>{aluno.id}</td>
            <td>{aluno.nome}</td>
            <td>{aluno.email}</td>
            <td>{aluno.idade}</td>
            <td>
              <button className='btn btn-primary'>Editar</button>{' '}
              <button className='btn btn-danger'>Excluir</button>
            </td>
          </tr>
        ))}
       
      </tbody>
    </Table>

    </div>
  )
}

export default APP;