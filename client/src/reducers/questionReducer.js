import { v4 as uuidv4 } from 'uuid';
import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION } from '../actions/types';

const initialState = {
  questions: [
    { id: uuidv4(), text: 'Question 1' },
    { id: uuidv4(), text: 'Question 2' },
    { id: uuidv4(), text: 'Question 3' },
    { id: uuidv4(), text: 'Question 4' },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
      };
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          question => question.id !== action.payload
        ),
      };
    case ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
      };
    default: {
      return state;
    }
  }
}
