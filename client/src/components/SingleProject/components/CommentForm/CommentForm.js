import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Row, Col, Container, Button, Form } from "react-bootstrap";

const CommentForm = ({project, userEmail,projectOwner,setProjectData}) => {
    const [commentForm,setComment] = useState();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setComment({
          ...commentForm,
          [name]: value
        });
      };
    
      const handleSubmit = async (e) => {
        try {
          submitComment()
        } catch (error) {
          console.error(error);
        }
      };
    
      const submitComment = async (i) => {
          let params = {comment:commentForm.comment,userEmail:userEmail,projectId:project._id,email:projectOwner};
          console.log(params)
          const data = await axios.post('/api/project/comment',params)
          console.log(data);
          await refreshComments();
      }

      const refreshComments = async () =>{
        try {
          if(userEmail===projectOwner){
            const { data } = await axios.get("/api/user");
            setProjectData(data);
          } else{
            const { data } = await axios.get("/api/public/project/" + projectOwner + "/" + project._id);
            setProjectData(data);
          }
          
        } catch (error) {
          console.error(error);
        }

      }

  return ( 
    <Row>
<Col xs={12}>
  <Col xs={2}></Col>
  <Col xs={8}>
    <Form>
      <Form.Group controlId="comment">
        <Form.Label className="fLabel">Comment:</Form.Label>
        <Form.Control onChange={handleInputChange}
          name="comment"
          type="text"
          placeholder="Write Comment"
        />
        <Button onClick={handleSubmit}>Post</Button>
      </Form.Group>
      </Form>
      </Col>
    <Col xs={2}></Col>
  </Col>
</Row>
)
  };

export default CommentForm;