import React from "react";

// Frequently used variables
import { variable } from "../constants";

// Others
import { toast } from 'react-toastify';
import { Navigate, Link } from 'react-router-dom';

// Bootstrap Components
import { Form, Button } from 'react-bootstrap';
import axios from "axios";

class USER_LOGIN extends React.Component {
    componentDidMount(){
        if(localStorage.getItem("is_login") === 'true'){
            this.setState({LoginDone : true})
        } else { this.setState({LoginDone : false}) }
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            access_level: '',
            LoginDone: false,
            req: {}
        };
    };
    onSelectAccessLevel = async (event) => {
        await this.setState({ access_level: event.target.value })
    }
    onSubmitButtonPressed = async () => {
        await this.setState({
            req: {
                "email": this.state.email,
                "pass": this.state.password,
                "access_level": this.state.access_level
            }
        })
        axios.post(variable.api_url + "user_login", this.state.req)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('access_level', response.data.access_level);
                    localStorage.setItem('role_id', response.data.user_id);
                    localStorage.setItem('is_login', true);
                    this.setState({ LoginDone: true })
                    toast.success(response.data.msg);
                    window.location.reload()
                } else {
                    toast.error(response.data.msg)
                }
            })
            .catch((error) => {
                toast.error(error.response.data.msg);
            });
    }
    render() {
        return (
            <div>
                <div className='faq-section'>
                    <div className='container mt-4'>
                        <h1 className='mb-4 mt-5' align="center">Viewer Login</h1>
                        <div className="row justify-content-center">
                            <div className="col-6">
                                <div className="border border-black border-3 rounded-0">
                                    <Form className="m-4">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control onChange={e => this.setState({ email: e.target.value })} value={this.state.email} className="rounded-0" type="text" placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control onChange={e => this.setState({ password: e.target.value })} value={this.state.password} className="rounded-0" type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicAccessLevel">
                                            <Form.Label>Access Level</Form.Label>
                                            <Form.Select className="rounded-0" aria-label="Default select example" onChange={this.onSelectAccessLevel.bind(this)}>
                                                <option>Select the Access Level</option>
                                                <option value="viewer">Viewer</option>
                                                <option value="admin">Admin</option>
                                                <option value="super_admin">Super Admin</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <div align="center">
                                            <Button className="rounded-0" variant="dark" size="lg" onClick={this.onSubmitButtonPressed}>
                                                Login
                                            </Button>{' '}
                                            <Button className="rounded-0" variant="outline-dark" type="submit" size="lg">
                                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/registration'>Regsiter</Link>
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.LoginDone && <Navigate to='/faq'/>}
            </div>
        );
    }
}

export default USER_LOGIN;