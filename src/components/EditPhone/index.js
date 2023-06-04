import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import SoftButton from "components/SoftButton";
import { Icon } from "@mui/material";


const EditPhone = ({SHOW, onSave, set}) => {

    const [show, setShow] = useState(SHOW);
    const [code, setCode] = useState(0)

    useEffect(()=> {
        console.log(SHOW)
        console.log(show)
    }, [SHOW])

    const handleClose = () => {
        setShow(false)
        set(false)
    }

    const handleShow = () => {
        setShow(true)
    }

    const handleFormChange = (e) => {
        if(e.target.name === "code"){
            setCode(e.target.value)
        }
    }

    const handleSave = () => {
        onSave(code)
    }

    return(
        <>
            <div id="sendSMS"/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tipe in the number we just send you in a sms</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group >
                            <Form.Label>Number in the SMS</Form.Label>
                            <Form.Control name="code" type="number" onChange={handleFormChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>
                        Sumbit Code
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Re-Send Code
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </>
    );

};

export default EditPhone;