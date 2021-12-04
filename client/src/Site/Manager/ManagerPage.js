import { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Alert, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

import { deliverybig, alarm } from '../icons';

//API
import API from '../../ManagerAPI'



function ManagerPage(props){

    return (
        <>
        <Container fluid className="below-nav vh-100 align-items-center">
            <Row id = "managerFunctions">
                <AcknowledgeDeliveryButton /> 
            </Row>
        </Container>
        </>
      )
}

function AcknowledgeDeliveryButton (props) {
    return(
        <Col lg = {4} sm = {6} id = "ackFarmerOrder">
            <Link to="/manager/farmerorders">
                <Container fluid className="LoginButton border border-dark rounded nolink mb-3" align="center" >
                {deliverybig}
                <h3>See farmer orders</h3>
                </Container>
            </Link>
        </Col>
    )
}
function ManagerPageFarmerOrders (props) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


     // show error message in console
    const handleErrors = (err) => {
        console.log(err);
    }


    useEffect(() => {
        setLoading(true);
        API.getFarmerOrders()
            .then(all_orders => {
                setOrders(all_orders);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                setOrders([]);
                handleErrors(e)}
            );
      }, [])
   

    return (
        <Col>
            {loading && <Alert variant='warning'> {alarm} Please wait while loading farmer orders... {alarm}</Alert>}
            {(orders.length && !loading) ?
                <ListGroup variant = "primary"> 
                    <ListGroup.Item variant="primary" key = {"title"} ><h5>List of all the farmer orders</h5></ListGroup.Item>
                    {/**TODO: Insert a search bar for filtering orders */}
                    {orders.map(order => {
                        return (
                            <FarmerOrderItem key = {order.id} order = {order}/>  
                        ); 
                    })
                    }
                </ListGroup> 
            : <Alert variant='danger'>No orders found.</Alert>
            }     
        </Col>
    )
}

function FarmerOrderItem(props) {
    const [acked, setAcked] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [ackedSuccessfully, setAckedSuccessfully] = useState(false);
    
    let order = props.order;

    //useEffect for closing alert after 2 seconds
    useEffect(() => {
        if(ackedSuccessfully){
            window.setTimeout(()=>{
                setAckedSuccessfully(false);
              },3000)
        }
      }, [ackedSuccessfully]);
    
    const ackClicked = (orderid) => {
        setAcked(true);
        API.ackFarmerOrder(orderid)
            .then((newOrder) => {
                //returning an obj with id and state = "delivered"
                order.state = newOrder.state; 
                setAcked(false);
                setErrorMsg(false);
                //this alert of successfully acked will disappear in 3 seconds
                setAckedSuccessfully(true);
            })
            .catch(e => {
                setAcked(false);
                setErrorMsg(true);
            })
    }

    return (
        <ListGroup.Item id = {order.id} key = {order.id}>
            <Row>
                <h4><strong>Order id: {order.id}</strong></h4>
            </Row>
            <Row>
            <Col sm = {4}>
                {/**ORDER INFO */}
                <h5><strong>Order info</strong></h5>
                <p>
                    State: {acked ? <span className = "bg-warning">delivered</span> : <span>{order.state}</span>} <br></br>
                    Total: {order.total.toFixed(2)}€<br></br>
                    Date: {order.time}
                </p>
                {/**TODO: Here can be inserted a "show order info" button to show the products inside the farmer order in a dynamic way */}
            </Col>
            <Col sm = {4}>
                {/**FARMER INFO */}
                <h5><strong>Farmer info</strong></h5>
                <p>
                    Farmer id: {order.farmerid} <br></br>
                    Name: {order.farmerName} <br></br>
                    Surname: {order.farmerSurname}<br></br>
                </p>
            </Col>
            <Col sm = {4}>
                {/**CONTROLS AND ALERT */}
                {   order.state === "pending" &&
                        <Button className = "mb-3" onClick = {() => ackClicked(order.id)}>Acknowledge delivery</Button>
                }
                {   
                    errorMsg && <Alert variant = "danger">Error while trying to acknowledge delivery...</Alert>
                }
                {
                    ackedSuccessfully && <Alert variant = "success">Order n.{order.id} acked successfully</Alert>
                }
            </Col>
            </Row>
        </ListGroup.Item>  
    )
}

export {ManagerPage, ManagerPageFarmerOrders};