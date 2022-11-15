import React from "react";
import { Table, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { variable } from "../constants";
import { toast } from 'react-toastify';

class ADMIN_TABLE extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role_id: '',
            access_level: '',
            admin_list: [],
            adminID: '',
            faq_new : ''
        };
    };
    async componentDidMount() {
        let ri = localStorage.getItem("role_id");
        let al = localStorage.getItem("access_level");
        await this.setState({ role_id: ri, access_level: al })
        this.fetchAdmin();
    };
    fetchAdmin = async () => {
        await axios.post(variable.api_url + "admin_list", { role_id: this.state.role_id })
            .then((response) => {
                this.setState({ admin_list: response.data });
                this.fetchAdmin();
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    onDeleteButtonPressed = async () => {
        await axios.post(variable.api_url + "admin_del", { role_id: this.state.role_id, admin_id: this.state.adminID })
            .then((response) => {
                toast.success(response.data.msg);
            })
            .catch((error) => {
                console.log(error.response.data.msg);
            });
    };
    onSave = async () =>{
        console.log("Save pressed")
        console.log(this.state.role_id)
        let responses_val = { "email": this.state.email, "pass": this.state.password, "role_id" : this.state.role_id };
        await axios.post(variable.api_url + "admin_add", responses_val)
            .then((response) => {
                toast.success("Admin Added!");
                this.setState({email : '', password : ''});
                this.fetchAdmin();
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
                        <h1 className='mb-4'>Admin Add</h1>
                        <div className="mb-4">
                            <div className="border border-black border-3 rounded-0">
                                <Form className="m-4">
                                    <Form.Group className="mb-3" controlId="formBasicQuestion">
                                        <Form.Label>Admin Email</Form.Label>
                                        <Form.Control onChange={e => this.setState({ email: e.target.value })} value={this.state.email} className="rounded-0" type="email" placeholder="" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicAnswer">
                                        <Form.Label>Admin Password</Form.Label>
                                        <Form.Control onChange={e => this.setState({ password: e.target.value })} value={this.state.password} className="rounded-0" type="password" placeholder="" />
                                    </Form.Group>
                                        <Button onClick={this.onSave} className="rounded-0" variant="dark" size="lg">
                                            Save
                                        </Button>
                                </Form>
                            </div>
                        </div>
                        <h1 className='mb-4'>Admin List</h1>
                        <div className="border border-black rounded-3">
                            <div className="m-4">
                                <Table bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Email</th>
                                            <th>Password</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.admin_list.map(data => (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>{data.email}</td>
                                                <td>{data.password}</td>
                                                <td>
                                                    <Button variant="danger" size="sm" onClick={async () => {
                                                        await this.setState({ adminID: data.id });
                                                        this.onDeleteButtonPressed();
                                                    }}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ADMIN_TABLE;