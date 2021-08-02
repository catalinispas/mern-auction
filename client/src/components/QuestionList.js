import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

class QuestionList extends Component {
  state = {
    questions: [],
    name: '',
  };

  componentDidMount() {
    fetch('/api/questions')
      .then(response => response.json())
      .then(data => this.setState({ questions: data }));
  }

  addQuestion() {
    fetch(`/api/questions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: this.state.name }),
    })
      .then(response => response.json())
      .then(question => {
        const { questions } = this.state;
        this.setState({
          questions: [question, ...questions],
          name: '',
        });
      });
  }

  onChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { questions } = this.state;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup>
            <ListGroupItem>
              <Input
                type='text'
                name='text'
                id='question'
                placeholder='Type in your question'
                onChange={this.onChange}
                value={this.state.name}
              />
              <Button
                color='dark'
                style={{ marginTop: '1rem' }}
                block
                onClick={() => {
                  this.addQuestion();
                }}
              >
                Submit a New Question
              </Button>
            </ListGroupItem>
          </TransitionGroup>
          <TransitionGroup className='question-list'>
            {questions.map(({ _id, text }) => (
              <CSSTransition key={_id} timout={500} classNames='fade'>
                <ListGroupItem>
                  <Link to={`/${_id}`}>{text}</Link>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}
export default QuestionList;
