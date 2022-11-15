import React from "react";
import { Table, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { variable } from "../constants";
import { toast } from 'react-toastify';

class FAQ_TABLE extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            role_id: '',
            access_level: '',
            faq_list: [],
            faqID: '',
            faq_new : ''
        };
    };
    async componentDidMount() {
        let ri = localStorage.getItem("role_id");
        let al = localStorage.getItem("access_level");
        await this.setState({ role_id: ri, access_level: al })
        this.fetchFaq();
    };
    fetchFaq = async () => {
        await axios.post(variable.api_url + "faq_my_list", { role_id: this.state.role_id, access_level: this.state.access_level })
            .then((response) => {
                this.setState({ faq_list: response.data });
                this.fetchFaq();
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    onDeleteButtonPressed = async () => {
        await axios.post(variable.api_url + "faq_del", { role_id: this.state.role_id, access_level: this.state.access_level, faq_id: this.state.faqID })
            .then((response) => {
                toast.success(response.data.msg);
            })
            .catch((error) => {
                console.log(error.response.data.msg);
            });
    };
    onSave = async () =>{
        console.log(this.state.role_id)
        let responses_val = { "faq_question": this.state.question, "faq_answer": this.state.answer, "role_id" : this.state.role_id, "access_level" : this.state.access_level };
        await axios.post(variable.api_url + "faq_add", responses_val)
            .then((response) => {
                toast.success("FAQ Added!");
                this.setState({question : '', answer : ''});
                this.fetchFaq();
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
                        <h1 className='mb-4'>FAQ Add</h1>
                        <div className="mb-4">
                            <div className="border border-black border-3 rounded-0">
                                <Form className="m-4">
                                    <Form.Group className="mb-3" controlId="formBasicQuestion">
                                        <Form.Label>Question</Form.Label>
                                        <Form.Control onChange={e => this.setState({ question: e.target.value })} value={this.state.question} className="rounded-0" type="text" placeholder="" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicAnswer">
                                        <Form.Label>Answer</Form.Label>
                                        <Form.Control onChange={e => this.setState({ answer: e.target.value })} value={this.state.answer} as="textarea" rows={3} />
                                    </Form.Group>
                                        <Button onClick={this.onSave} className="rounded-0" variant="dark" size="lg">
                                            Save
                                        </Button>
                                </Form>
                            </div>
                        </div>
                        <h1 className='mb-4'>FAQ List</h1>
                        <div className="border border-black rounded-3">
                            <div className="m-4">
                                <Table bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Question</th>
                                            <th>Answer</th>
                                            <th>Created By</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.faq_list.map(data => (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>{data.faq_que}</td>
                                                <td>{data.faq_ans}</td>
                                                <td>{data.role_type + ": " + data.role_id}</td>
                                                <td>
                                                    <Button variant="danger" size="sm" onClick={async () => {
                                                        await this.setState({ faqID: data.id });
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

export default FAQ_TABLE;