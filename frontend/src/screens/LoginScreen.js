import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

export const LoginScreen = ({location, history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch=useDispatch()
  const userLogin=useSelector(state => state.userLogin)
  const { loading, error, userInfo} = userLogin
///taken from userReducers
const redirect = location.search ? location.search.split('=')[1] : '/'

useEffect(() => {
    if (userInfo) {
        history.push(redirect)
    }
}, [history, userInfo, redirect])


  const Submithandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
  {error && <Message variant='danger'>{error}</Message>}
  {loading && <Loader></Loader>}
      <Form onSubmit={Submithandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>password Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row Classname="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
