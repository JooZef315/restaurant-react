import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, Button, Label, Col, Row, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


  class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        isModalOpen: false
      };
    }

    toggleModal() {
      this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(values) {
      this.toggleModal();
      this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
      return(
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal} >Rate us!</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={4}>rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" id="rating" placeholder="your rating" className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={4}>First Name</Label>
                <Col md={12}>
                  <Control.text model=".author" id="author" name="author"
                    placeholder="author"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                  <Errors className="text-danger" model=".author"
                    show="touched"
                    messages={{ required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'}}/>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={6}>Your Feedback</Label>
                <Col md={12}>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    rows="6" className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size:10}}>
                  <Button type="submit" color="primary">
                    submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>submit comment</Button>
      </div>
      );
    }
  }


  function RenderComments({comments, addComment, dishId}){
    if(comments != null)
    return(
      <div className="col-12 col-md-5 m-1">
        <Card>
          <h4>comments</h4>
          <ul >
            {comments.map((comment) => {
              return (
                <li>
                  <p>
                    {comment.comment}
                  </p>
                  <p>
                    {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                  </p>
                </li>
              );
            })}
          </ul>
        </Card>
        <div>
          <CommentForm dishId={dishId} addComment={addComment}/>
       </div>

      </div>
    );
    else {
      return (<div></div>);
    }
  }

  function RenderDish({dish}){
      return(
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>
                {dish.name}
              </CardTitle>
              <CardText>
                {dish.description}
              </CardText>
            </CardBody>
          </Card>
        </div>
      );
  }

    const DishDetail= (props) => {
      if (props.isLoading) {
          return(
              <div className="container">
                  <div className="row">
                      <Loading />
                  </div>
              </div>
          );
      }
      else if (props.errMess) {
          return(
              <div className="container">
                  <div className="row">
                      <h4>{props.errMess}</h4>
                  </div>
              </div>
          );
      }
      else if (props.dish != null) {
        return (
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/menu">Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {props.dish.name}
                </BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>
                  {props.dish.name}
                </h3>
                <hr />
              </div>
            </div>
            <div className="row">
              <RenderDish dish={props.dish} />
              <RenderComments comments={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id} />
            </div>
          </div>
        );
      }
      else {
        return (<div></div>);
      }
    }
  export default DishDetail;
