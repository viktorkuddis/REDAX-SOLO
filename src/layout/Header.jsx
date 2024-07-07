import React from 'react'

import DarkModeBtn from '../components/DarkModeBtn';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from "react-router-dom";


// Header-komponenten definieras som en funktionell komponent
const Header = ({ isDarkMode }) => {

    // expand är satt till true, vilket betyder att navbaren alltid är expanderad (ingen kollaps)
    const expand = "sm";


    ;

    return (
        <>
            {/* Navbar-komponenten från React Bootstrap. Använder expand-attributet för att hantera kollaps/expansion */}
            <Navbar expand={expand} className="bg-body-secondary mb-3 p-0" style={{ maxWidth: "100vw" }}>
                <Container fluid>
                    {/* Navbar.Brand är platsen för ditt varumärke eller företagsnamn */}
                    <Navbar.Brand as={NavLink} to="/"><small>REDAX SOLO</small></Navbar.Brand>
                    <DarkModeBtn className="ms-auto" />
                    {/* Navbar.Toggle är knappen som visas när navbaren är kollapsad och används för att öppna offcanvas */}
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}
                        style={{
                            // padding: '0.25rem 0.5rem',
                            fontSize: '0.90rem'
                        }} />



                    {/* Navbar.Collapse innehåller navigationen som visas när navbaren är expanderad */}
                    {/* Navbar.Offcanvas är den sidopanel som visas när navbaren är kollapsad */}
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="top"
                        data-bs-theme={isDarkMode ? "dark" : "light"}

                    >

                        {/* Offcanvas.Header innehåller stängningsknappen för offcanvas */}
                        <Offcanvas.Header closeButton className='pb-0'>
                            {/* Offcanvas.Title är titeln som visas i offcanvas */}
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        {/* Offcanvas.Body innehåller navigationslänkar och eventuella andra komponenter */}
                        <Offcanvas.Body className='p-0'>
                            {/* Nav-komponenten innehåller navigationslänkar. justify-content-end och flex-grow-1 pe-3 är klasser för styling */}
                            <Nav variant="underline" className="justify-content-center gap-1 align-items-center flex-wrap flex-grow-1">
                                {/* Nav.Link är en navigationslänk */}

                                <Nav.Link as={NavLink} to="/feed" >
                                    <i className="bi bi-card-heading"> </i><small>  Nyhetsfeed</small>
                                </Nav.Link>

                                <Nav.Link as={NavLink} to="/storys" >
                                    <i className="bi bi-folder"></i><small>  Mina Storys</small>
                                </Nav.Link>

                                <Nav.Link as={NavLink} to="/planering" >
                                    <i className="bi bi-file-ruled"></i><small>  Planering</small>
                                </Nav.Link>



                                {/* NavDropdown är en dropdown-meny */}
                            </Nav>
                            {/* Form-komponenten innehåller sökfältet */}

                        </Offcanvas.Body>

                    </Navbar.Offcanvas>



                </Container>
            </Navbar >
        </>
    )
}

export default Header