import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Input } from 'reactstrap';

class QuestionComponent extends Component {
  state = {
    question: null,
    response: '',
  };

  constructor(params) {
    super(params);

    this.vote = this.vote.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
  }

  componentDidMount() {
    const { questionId } = this.props.match.params;

    fetch(`/api/questions/${questionId}`)
      .then(response => response.json())
      .then(data => this.setState({ question: data }));
  }

  vote(responseId) {
    const { questionId } = this.props.match.params;
    fetch(`/api/questions/${questionId}/responses/${responseId}/vote`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(() => {
        const { question } = this.state;
        const response = question.responses.find(r => r._id == responseId);
        response.votes++;
        this.setState({ question });
      });
  }

  addAnswer() {
    const { questionId } = this.props.match.params;
    fetch(`/api/questions/${questionId}/responses`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: this.state.response }),
    })
      .then(response => response.json())
      .then(r => {
        this.setState({ question: r, response: '' });
      });
  }

  onChange = e => {
    this.setState({ response: e.target.value });
  };

  render() {
    const { question } = this.state;

    if (question === null) return null;

    return (
      <div>
        {question.text}
        <Input
          type='text'
          name='text'
          id='response'
          placeholder='Answer'
          onChange={this.onChange}
          value={this.state.response}
        />
        <Button
          color='dark'
          style={{ marginTop: '1rem' }}
          block
          onClick={() => this.addAnswer()}
        >
          Submit answer
        </Button>
        <ul>
          {question.responses.map(r => (
            <li>
              {r.text} ({r.votes})
              <Button onClick={() => this.vote(r._id)}>Vote</Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(QuestionComponent);
