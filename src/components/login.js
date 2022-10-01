import React, { useState } from "react";
import {
  Form,
  Col,
  Row,
  FormGroup,
  FormControl,
  Button,
  Spinner,
  Container,
} from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import Alerts from "./Alert";
import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const formValidation = (field) => {
  const errors = {};

  if (!field.username) {
    errors.username = "*Required.";
  }

  if (!field.password) {
    errors.password = "*Required.";
  }

  return errors;
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: formValidation,
    onSubmit: async (value) => {
      setIsLoading(true);
      const data = {
        username: value.username,
        password: value.password,
      };
      const baseURL = "https://3.86.151.89/auth";
      axios
        .post(baseURL, data)
        .then((res) => {
          setIsLoading(false);
          sessionStorage.setItem("access_token", res.data["access_token"]);
          sessionStorage.setItem("user", value.username)
          navigate("/main");
        })
        .catch((err) => {
          setIsLoading(false);
          setShow(true);
          setAlertMsg([{ msg: String(err), flag: false }]);
        });
    },
  });

  const popupHandler = () => {
    setShow(false);
  };

  return (
    <>
      <Alerts
        msg={alertMsg}
        show={show}
        closeAlert={popupHandler}
        isButtonVisible={false}
      />
      <Container className="form-outer">
        <Row>
          <Form className="form-signin" onSubmit={formik.handleSubmit}>
            <div className="account-wall">
              <h5 className="text-center mb-3">Sign in to continue </h5>
              <div className="d-flex justify-content-center">
                <img
                  className="rounded-circle"
                  src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                  alt=""
                  width="95px"
                />
              </div>

              <Col md={{ span: 10, offset: 1 }}>
                <FormGroup className="mt-3">
                  <FormControl
                    type="text"
                    name="username"
                    value={formik.values.username}
                    placeholder="username"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isValid={formik.touched.username && !formik.errors.username}
                    isInvalid={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  {formik.touched.username && formik.errors.username && (
                    <p className="text-danger">{formik.errors.username}</p>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormControl
                    type="password"
                    name="password"
                    value={formik.values.password}
                    placeholder="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isValid={formik.touched.password && !formik.errors.password}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-danger">{formik.errors.password}</p>
                  )}
                </FormGroup>
                <div className="d-flex justify-content-center mt-3">
                  {!isLoading && (
                    <Button
                      variant="primary w-100"
                      size="md"
                      type="submit"
                      disabled={!(formik.dirty && formik.isValid)}
                    >
                      Submit
                    </Button>
                  )}
                  {isLoading && (
                    <Button
                      variant="primary"
                      className="mt-2 w-100"
                      size="md"
                      disabled
                    >
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Authientcating..
                      <span className="visually-hidden">Authientcating..</span>
                    </Button>
                  )}
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <Link to="/user" style={{ textDecoration: "none" }}>
                    Create User
                  </Link>
                  <Link to="/auth" style={{ textDecoration: "none" }}>
                    Need Help?
                  </Link>
                </div>
              </Col>
            </div>
          </Form>
        </Row>
      </Container>
    </>
  );
};
export default LoginPage;
