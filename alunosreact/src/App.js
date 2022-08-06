import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'react-bootstrap';
import logoCadastro from './assets/01.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

import './App.css';

function APP(){
  const baseUrl = "https://localhost:7155/api/alunos";

  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState({
    id: '',
    nome: '',
    email: '',
    idade: ''
  })

  console.log(modalOpen)

  const abrirModal = () =>{
    setModalOpen(!modalOpen);
    
  }

  const handleChange = e =>{
    const {name, value} = e.target;

    setAlunoSelecionado({...alunoSelecionado, [name]: value});
    console.log(alunoSelecionado)
  }

  const pedidoGet = async() =>{
    await axios.get(baseUrl)
      .then(response =>{
        setData(response.data)
      }).catch(error =>{
        console.log(error)
      })
  }

  const pedidoPost = async() =>{
    delete alunoSelecionado.id
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade)
    
    await axios.post(baseUrl, alunoSelecionado)
      .then(response =>{
        setData(data.concat(response.data))
        abrirModal();
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
      
      <header className='logoBotao'>
        <button className='btn btn-success' onClick={abrirModal}>Incluir Novo Aluno</button>
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

      <Modal show={modalOpen}>
        <ModalHeader>Incluir Aluno</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nome:</label>
            <br />
            <input type="text" className='form-control' name="nome" onChange={handleChange}/>
            <br />
            <label>E-mail:</label>
            <br />
            <input type="text" className='form-control' name="email" onChange={handleChange}/>
            <br />
            <label>Idade:</label>
            <br />
            <input type="text" className='form-control' name="idade" onChange={handleChange}/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={pedidoPost}>Incluir</button>{'  '}
          <button className='btn btn-danger' onClick={abrirModal}>Cancelar</button>{'  '}
        </ModalFooter>
      </Modal>
    
    </div>
  )
}

export default APP;