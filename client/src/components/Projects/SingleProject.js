import React, { Component,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
// import ProfileCard from "./components/Card/ProfileCard";
// import WorkCard from "./components/Card/WorkCard";
// import HistoryCard from "./components/Card/HistoryCard";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "../Modal/Modal.js";
const ProfileImg = styled.img`
  height: 100px;
  width: 125px;
`;

const CustomJumbotron = styled.div`
  background-color: var(--dark-grey-main);
  border-top-left-radius: 0;
  padding: 4rem 2rem;
  
  .header {
    color: white;
  }
`;

const openModal = () => {
    
}

const Profile = (props) => {

  const { user, isAuthenticated } = useAuth0();
  const params = { email: user.email };

  const loadUsers = () => {
    axios
    .get('/api/user')
    .then((res)=>{
      const savedUsers = res.data
      checkDuplicate(params,savedUsers)
    })
    .catch(err=>console.log(err))
  }

  const saveUser = (newUser) => {
    return axios.post('/api/user', newUser);
  }

  const checkDuplicate = (newUser,userList)=>{
    for(let i = 0; i < userList.length; i++){
      if(userList[i].email===newUser.email){
        console.log("Welcome Back");
        return;
      }
    }
    saveUser(newUser);
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadUsers();
    }
    else {
      console.log("incorrect login")
    }
  });

  return (
    <>
      {console.log(user)}
      <Modal>
        <h1> Hello!</h1>
      </Modal>
      <CustomJumbotron>
      </CustomJumbotron>
      <Container>
      </Container>
    </>
  );
};

export default Profile;

// <Row>
//           <Col>
//             <Card />
//           </Col>
//           <Col>
//             <Card />
//           </Col>
//           <Col>
//             <Card />
//           </Col>
//         </Row>

// <Jumbotron style={{backgroundColor: "#3A3A3A", borderTopLeftRadius: 0}}></Jumbotron>