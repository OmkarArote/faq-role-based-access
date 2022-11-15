import React from "react";
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Container, Button } from 'react-bootstrap';

class NAVBAR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogOut: false
        };
    };
    _logOutPress = async () => {
        await localStorage.clear();
    }
    render() {
        if (this.props.data === 'super_admin') {
            return (
                <div>
                    <Navbar bg="light" variant="light">
                        <Container>
                            <Navbar.Brand>SlashRTC</Navbar.Brand>
                            <Nav className="me-auto">
                                <NavDropdown title="FAQ" id="basic-nav-dropdown">
                                    <NavDropdown.Item>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/faq'>All FAQ</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/faq_table'>My FAQ</Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/admin_table'>Admin</Link></Nav.Link>
                            </Nav>
                            <Navbar.Collapse className="justify-content-end">
                                <Button className="rounded-0" variant="dark" size="lg"><Link style={{ textDecoration: 'none', color: 'inherit' }} onClick={this._logOutPress} to='/' reloadDocument>Log Out</Link></Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            );
        } else if (this.props.data === 'admin') {
            return (
                <div>
                    <Navbar bg="light" variant="light">
                        <Container>
                            <Navbar.Brand>SlashRTC</Navbar.Brand>
                            <Nav className="me-auto">
                                <NavDropdown title="FAQ" id="basic-nav-dropdown">
                                    <NavDropdown.Item>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/faq'>All FAQ</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/faq_table'>My FAQ</Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Navbar.Collapse className="justify-content-end">
                                <Button className="rounded-0" variant="dark" size="lg"><Link style={{ textDecoration: 'none', color: 'inherit' }} onClick={this._logOutPress} to='/' reloadDocument>Log Out</Link></Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            );
        } else if (this.props.data === 'viewer') {
            return (
                <div>
                    <Navbar bg="light" variant="light">
                        <Container>
                            <Navbar.Brand>SlashRTC</Navbar.Brand>
                            <Nav className="me-auto">
                                <NavDropdown title="FAQ" id="basic-nav-dropdown">
                                    <NavDropdown.Item>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/faq'>All FAQ</Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Navbar.Collapse className="justify-content-end">
                                <Button className="rounded-0" variant="dark" size="lg"><Link style={{ textDecoration: 'none', color: 'inherit' }} onClick={this._logOutPress} to='/' reloadDocument>Log Out</Link></Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            );
        }
    }
}

export default NAVBAR;