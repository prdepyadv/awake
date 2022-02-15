import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Header(props) {
    const token = props.token;

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Awake</Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {
                            !token ? (
                        <Nav className="mr-auto">
                            <LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-user"></i>&nbsp;&nbsp;Login</Nav.Link>
                            </LinkContainer>
                        </Nav>
                            ) : (
                        <Nav className="mr-auto">
                            <LinkContainer to='/'>
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/vocab'>
                                <Nav.Link>Vocab</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/qna'>
                                <Nav.Link>Ask</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/logout'>
                                <Nav.Link><i className="fas fa-user"></i>&nbsp;&nbsp;Logout</Nav.Link>
                            </LinkContainer>
                        </Nav>
                            )
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
