import React from "react";
import { Accordion } from 'react-bootstrap';
import axios from "axios";
import { variable } from "../constants";

class FAQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            faq_list: []
        };
    };
    async componentDidMount() {
        await axios.get(variable.api_url + "faq_list")
            .then((response) => {
                this.setState({ faq_list: response.data })
            })
            .catch((error) => {
                console.log(error.response.data.msg);
            });
    }
    render() {
        return (
            <div>
                <div className='faq-section'>
                    <div className='container mt-4'>
                        <h1 className='mb-4'>FAQ Accordion</h1>
                        {this.state.faq_list.map(data => (
                            <Accordion key={data.id}>
                                <Accordion.Item eventKey={data.id}>
                                    <Accordion.Header>{data.faq_que}</Accordion.Header>
                                    <Accordion.Body>{data.faq_ans}</Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default FAQ;