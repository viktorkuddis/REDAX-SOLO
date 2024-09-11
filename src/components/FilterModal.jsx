import React from 'react'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FilterPanel from './FilterPanel';

function FilterModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" size="sm" onClick={handleShow}>
                Filtrer
            </Button>

            <Modal show={show} size="xl" onHide={handleClose} data-bs-theme="dark" >
                <Modal.Header closeButton className='text-bg-dark border-0 '>

                    <Modal.Title>
                        FILTRERA EFTER KÄLLA:
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body className='text-bg-dark'>
                    <FilterPanel />
                </Modal.Body >
                <Modal.Footer className='text-bg-dark border-0'>
                    <Button variant="secondary" onClick={handleClose} >
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}


export default FilterModal