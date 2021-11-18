import React, { useState, useEffect } from 'react';
import './App.css';
import dayjs from 'dayjs';
import { Form, Modal, Button } from 'react-bootstrap';


let newday;
function Clock(props) {
    useEffect( () => {
        if(!props.dirty) {
            setInterval(async () => props.setTime(dayjs().format("dddd DD/MMMM/YYYY HH:mm:ss")), 1000);
        }
        else{
            setInterval(async () => props.setFakeTime(dayjs(props.faketime).add(1, "m").format("dddd DD/MMMM/YYYY HH:mm")) , 60000)
        }
        
        } ,[props.faketime]);
        
    return (<>
        {!props.dirty?
        props.time:
        props.faketime}
    </>)
}

function ModalDate(props) {
    const [newdate, setNewDate] = useState("");
    const [newtime, setNewTime] = useState("");
    const handleTime = (ev) => {
        setNewTime(ev.target.value);
        if (ev.target.value !== "") {
            if (newtime === "") setNewTime("12:00");
        } 
        console.log(newtime)
    }

    const handleDate = (ev) => {
        setNewDate(ev.target.value);
    }

    const handleSubmit = async (event) => {
            event.preventDefault()
            newday = dayjs(`${newdate} ${newtime}`).format("dddd DD/MMMM/YYYY HH:mm");
            props.setFakeTime(newday)
            props.setDirty(true)
            props.handleClose();

    }

    const setToday = () => {
        // props.setTime(today);
        props.setDirty(false)
        props.handleClose()
    }
    return (
        <>
            <Modal show={props.show}>
                <Modal.Title>
                    Pick a date.
                </Modal.Title>
                <Form>
                <Modal.Body>
                    <Form.Group controlId="form-date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type ="date" name="date" format="dd/MM/yyyy" value={newdate} onChange={handleDate} />
                    </Form.Group>
                    <Form.Group controlId="form-deadline-time">
                    <Form.Label>Time</Form.Label>
                    <Form.Control type ="time" name="time" value={newtime} onChange={handleTime} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={setToday}> Today </Button>
                    <Button variant="secondary" onClick={props.onClose}>Close</Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Save</Button>
                </Modal.Footer>
            </Form>
      
        </Modal>
        </>
    )

}

export  {Clock, ModalDate};

