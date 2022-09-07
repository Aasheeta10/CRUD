import React from 'react';
import { useState, useEffect } from 'react';
import { Table, 
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
  Navbar } from 'react-bootstrap';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import './App.css';

const api = "http://localhost:7000/users"
 
/*const initialState = {
    name: " ",
    address:"",
    email:"",
    contact:""
  };*/


function App() {
 
  const[state,setState] = useState(0)
  const [data, setData] = useState([]);
  const[userId, setUserId] = useState(null);
  const[editMode, setEditMode] =useState(false);

  const{name,address,email,contact} = state;

  useEffect (() =>{
    loadUser();
  },[]) ;
  
  const loadUser = async() =>
  {
    const response = await axios.get(api)
    setData(response.data)
  }

  const handleDelete =((id)=>{
    if(window.confirm("Are you sure"))
    {
      axios.delete(`${api}/${id}`)
    }
  })

  const handleChange =(e) =>{
    let{name,value}= e.target
    setState({...state, [name]: value});
  }

  const handleUpdate =(id) =>{
      const singleUser = data.find((item) => item.id == id)
        setState({...singleUser})
        setUserId(id)
        setEditMode(true)
  }


  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!name|| !address || !email || !contact)
    toast.error("Please fill all details");
    if(!editMode)
    {
      axios.post(api, state)
      toast.success("submitted successfully")
      setState({name:"", address:"", email:"" ,contact:""})
      setTimeout(()=>
       loadUser(), 5000
    )}
    else{
      axios.put(`${api}/${userId}`, state)
      toast.success("submitted successfully")
      setState({name:"", address:"", email:"" ,contact:""})
      setTimeout(()=>
      loadUser(), 5000)
      setUserId(null)
      setEditMode(false)
    }
      
        
      
      
    }
  

  return (
    <>
      <Navbar bg="primary" className="justify-content-center">
         <Navbar.Brand>
            This is CRUD APP
         </Navbar.Brand>
      </Navbar>
      <Container style= {{marginTop: "70px"}}>
        <Row>
          <Col md={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
              <Form.Label style={{textAlign: "left"}}>Input Name</Form.Label>
              <Form.Control 
               type = "text" 
               placeholder="Name" 
               name="name"
               value={name}
               onChange= {handleChange}
               />
              
              </Form.Group>
              
              <Form.Group>
              <Form.Label style={{textAlign: "left"}}>Input Address </Form.Label>
              <Form.Control 
              type = "text" 
              placeholder="Address" 
              name="address"
              value={address}
              onChange= {handleChange}
              />
            
              </Form.Group>
             
              <Form.Group>
              <Form.Label style={{textAlign: "left"}}>Input email</Form.Label>
              <Form.Control 
              type = "email" 
              placeholder="Email" 
              name="email"
              value={email}
              onChange= {handleChange}
              />
              
              </Form.Group>
              
              <Form.Group>
              <Form.Label style={{textAlign: "left"}}>Input contact </Form.Label>
              <Form.Control 
              type = "text" 
              placeholder="Contact" 
              name="contact"
              value={contact}
              onChange= {handleChange}
              />
              
              </Form.Group>

              <div className = "d-grip gap-2 mt-2" >
              <Button type="submit" size="lg">{editMode ? "Update" : "submit"}</Button>
              </div>
          </Form>
          </Col>
          <Col md={8}>
            <h2>Table</h2>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>address</th>
                  <th>email</th>
                  <th>number</th>
                </tr>
              </thead>
              {data && data.map((item,index) =>(
                <tbody key= {index}>
                  <tr>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>
                      <ButtonGroup  >
                        <Button style= {{marginRight:"5px"}} variant="secondary"
                        onClick={(id)=>handleUpdate(item.id)}>
                        Update</Button>
                        <Button style= {{marginRight:"5px"}} variant="danger" 
                        onClick ={(id)=>handleDelete(item.id)}>
                        Delete</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
