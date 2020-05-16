import { Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalopen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleSubmit(values) {
        console.log('Current state is ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    toggleModal() {
        this.setState({
            isModalopen: !this.state.isModalopen
        });

    }
    render() {
        return (
            <>
                <div>
                    <button className='btn btn-light btn-outline-dark' onClick={this.toggleModal}>
                        <span className='fa fa-pencil' ></span>Submit Comment</button>

                </div>
                <Modal isOpen={this.state.isModalopen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
            </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value => this.handleSubmit(value))} >
                            <Row className='form-group'>
                                <Label htmlFor='rating' md={10}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model='.rating' className='form-control'>
                                        <option>1</option>
                                        <option>2</option> <option>3</option><option>4</option><option>5</option></Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='name' md={10}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model='.name' className='form-control' placeholder='Your Name'
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                    <Errors className='text-danger'
                                        model='.name'
                                        show='touched'
                                        messages={{
                                            minLength: ' Must be greater than 2 characters.',
                                            maxLength: ' Must be 15 characters or less'
                                        }} />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='comment' md={10}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model='.comment' className='form-control' rows='6' />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{ size: 10 }}>
                                    <button className='btn btn-primary'>Submit</button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </>
        );

    }
}

export default Comment;