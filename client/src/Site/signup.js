import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
    shopemployee,
    customer
} from "./icons.js";
import API from "../API";

function SignupForm(props) {
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rpassword, setRPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidated(false);
        setErrorMessage("");
        let valid = true;
        if (name === undefined || name === "") {
            valid = false;
            setErrorMessage("Please, enter the required fields");
        } else if (surname === undefined || surname === "") {
            valid = false;
            setErrorMessage("Please, enter the required fields");
        } else if (username === undefined || username === "") {
            valid = false;
            setErrorMessage("Please, enter the required fields");
        } else if (password === undefined || password === "") {
            valid = false;
            setErrorMessage("Please, enter the required fields");
        } else if (rpassword === undefined || rpassword === "") {
            valid = false;
            setErrorMessage("Please, enter the required fields");
        } else if(password !== rpassword){
            valid=false;
            setErrorMessage("The password need to be the same");
        } else if (role === undefined || role === "") {
            valid = false;
            setErrorMessage("Please, enter the required fields");
        } 

        if (valid) {
            console.log("adding new user");
            API.addNewUser({
                name: name,
                surname: surname,
                username: username,
                password: password,
                role: role,
            }).then(()=>{
                props.notifySuccess();
            }).catch(()=>{props.notifyError();});
            setSubmitted(true);
        }
        setValidated(true);
    };

    return (
        <> {submitted ? <Navigate replace to="/home" /> :
            <><h1 className="text-center text-sm-center signupTitle"> Sign Up</h1>
                <Container>
                    {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
                    <Form noValidate validated={validated}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={name}
                                onChange={ev => setName(ev.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>Field required</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={surname}
                                onChange={ev => setSurname(ev.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>Field required</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                value={username}
                                onChange={ev => setUsername(ev.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>Field required</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>Field required</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                value={rpassword}
                                onChange={ev => setRPassword(ev.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>Field required</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid' />
                        </Form.Group>

                        <h3 className="text-center text-sm-center spacing">
                            Please select the type of account you want to sign up to:
                        </h3>
                        <Row className="my-3" align="center">
                            <Col className="py-3">
                                {role === "customer" ? (
                                    <Button
                                        onClick={() => setRole("customer")}
                                        className="nolink btn-primary"
                                    >
                                        {customer}
                                        <h2>Customer</h2>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setRole("customer")}
                                        className="nolink btn-outline-primary btn-light"
                                    >
                                        {customer}
                                        <h2>Customer</h2>
                                    </Button>
                                )}
                            </Col>
                            <Col className="py-3">
                                {role === "shopemployee" ? (
                                    <Button
                                        onClick={() => setRole("shopemployee")}
                                        className="nolink btn-primary"
                                    >
                                        {shopemployee}
                                        <h2>Shop Employee</h2>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setRole("shopemployee")}
                                        className="nolink btn-outline-primary btn-light"
                                    >
                                        {shopemployee}
                                        <h2>Shop Employee</h2>
                                    </Button>
                                )}
                            </Col>
                            {/*
                            <Col className="py-3">
                                {role === "farmer" ? (
                                    <Button
                                        onClick={() => setRole("farmer")}
                                        className="nolink btn-primary"
                                    >
                                        {farmer}
                                        <h2>Farmer</h2>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setRole("farmer")}
                                        className="nolink btn-outline-primary btn-light"
                                    >
                                        {farmer}
                                        <h2>Farmer</h2>
                                    </Button>
                                )}
                            </Col>
                        </Row>
                        <Row className="my-3" align="center">
                            <Col className="py-3">
                                {role === "delivery" ? (
                                    <Button
                                        onClick={() => setRole("delivery")}
                                        className="nolink btn-primary"
                                    >
                                        {delivery}
                                        <h2>Delivery</h2>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setRole("delivery")}
                                        className="nolink btn-outline-primary btn-light"
                                    >
                                        {delivery}
                                        <h2>Delivery</h2>
                                    </Button>
                                )}
                            </Col>
                            <Col className="py-3">
                                {role === "warehouse" ? (
                                    <Button
                                        onClick={() => setRole("warehouse")}
                                        className="nolink btn-primary"
                                    >
                                        {warehouse}
                                        <h2>Warehouse</h2>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setRole("warehouse")}
                                        className="nolink btn-outline-primary btn-light"
                                    >
                                        {warehouse}
                                        <h2>Warehouse</h2>
                                    </Button>
                                )}
                            </Col>
                            <Col className="py-3">
                                {role === "manager" ? (
                                    <Button
                                        onClick={() => setRole("manager")}
                                        className="nolink btn-primary"
                                    >
                                        {manager}
                                        <h2>Manager</h2>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setRole("manager")}
                                        className="nolink btn-outline-primary btn-light"
                                    >
                                        {manager}
                                        <h2>Manager</h2>
                                    </Button>
                                )}
                            </Col>
                            */}
                        </Row>
                        <Row className="buttonRow d-flex justify-content-around">
                            <Form.Group as={Col} xs={1} className="mb-5">
                                <Button onClick={handleSubmit}>Save</Button>
                            </Form.Group>
                            <Form.Group as={Col} xs={1} className="mb-5">
                                <Link to="/home">
                                    <Button variant="secondary">Cancel</Button>
                                </Link>
                            </Form.Group>
                        </Row>
                    </Form>
                </Container>
            </>
        }
        </>
    );
}

export { SignupForm };
