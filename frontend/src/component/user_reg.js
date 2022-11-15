import React from "react";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import { toast } from 'react-toastify';
import { variable } from "../constants";

class USER_REG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            responses: []
        };
    };
    onSave = async () =>{
        console.log(this.state.role_id)
        let responses_val = { "email": this.state.email, "pass": this.state.password };
        await axios.post(variable.api_url + "viewer_reg", responses_val)
            .then((response) => {
                toast.success("Viewer Created: " + response.data.id);
                this.setState({email : '', password : ''});
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }
    render() {
        return (
            <div>
                <div className='faq-section'>
                    <div className='container mt-4'>
                        <h1 className='mb-4 mt-5' align="center">Viewer Registration</h1>
                        <div className="row justify-content-center">
                            <div className="col-6">
                                <div className="border border-black border-3 rounded-0">
                                    <Form className="m-4">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>User Name</Form.Label>
                                            <Form.Control onChange={e => this.setState({ email: e.target.value })} value={this.state.email} className="rounded-0" type="text" placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control onChange={e => this.setState({ password: e.target.value })} value={this.state.password} className="rounded-0" type="password" placeholder="Password" />
                                        </Form.Group>
                                        <div align="center">
                                            <Button onClick={this.onSave} className="rounded-0" variant="dark" size="lg">
                                                Submit
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default USER_REG;