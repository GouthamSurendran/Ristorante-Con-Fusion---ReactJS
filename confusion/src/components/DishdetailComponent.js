import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
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

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <Card>
                <CardImg width='100%' src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}
                    </CardText>
                </CardBody>
            </Card>
        );
    }
    else {
        return (<div></div>);
    }
}

function RenderComments({ comments }) {
    var commentList = comments.map(comment => {
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>

                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
            </li>
        );
    })
    return (
        <div>
            <h4>Comments</h4>
            <ul className='list-unstyled'>{commentList}</ul>
            <Comment/>
        </div>
    );

}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );
    }
    else return (
        <div></div>
    );
}


export default DishDetail