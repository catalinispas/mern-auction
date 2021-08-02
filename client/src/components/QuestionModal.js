import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addQuestion } from '../actions/questionActions';
import { v4 as uuidv4 } from 'uuid';

class QuestionModal extends Component {
  state = {
    modal: false, // if modal is open or not ( false by default )
    text: 'default text',
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal, // Changes the state to whatever it's not
    });
  };

  // Update text as user types in
  onChange = e => {
    // [e.target.text]
    console.log(e.target.text);
    this.setState({ text: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newQuestion = {
      id: uuidv4(),
      text: this.state.text,
    };

    // Add question
    this.props.addQuestion(newQuestion);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color='dark'
          style={{ marginBottom: '1rem' }}
          onClick={this.toggle}
        >
          Ask Question
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Ask a new Question</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='question'>Question</Label>
                <Input
                  type='text'
                  name='text'
                  id='question'
                  placeholder='Ask a new question'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '1rem' }} block>
                  Submit the question
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

// map item state to prop
const mapStateToProps = state => ({
  question: state.question,
});

export default connect(mapStateToProps, { addQuestion })(QuestionModal);
