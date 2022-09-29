import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { UserAuth } from "../context/AuthContext";
import { ClipLoader } from "react-spinners";

import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signUp(auth, email, password);
      toast.success("Account created successfuly");
      navigate("/");
    } catch (e) {
      toast.error("User Already exists");
    }

    setLoading(false);
  };
  return (
    <Card>
      <Card.Body>
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="text-center mb-4">Log In</h2>
            </Col>
          </Row>

          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          {/*  */}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group id="email">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="w-50"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="w-50"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="w-50"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={12}>
                <Button className="w-50" type="submit" onSubmit={handleSubmit}>
                  {loading ? (
                    <ClipLoader size={25} color="white" loading />
                  ) : (
                    "Signup"
                  )}
                  <ToastContainer />
                </Button>
              </Col>
            </Row>
          </Form>
          <Link to="/login" className="registerLink">
            Login Instead
          </Link>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Signup;
