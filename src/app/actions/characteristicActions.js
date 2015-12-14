import Dispatcher from '../dispatcher';

let CharacteristicActions = {

  SET_ANSWER: 'SET_ANSWER',

  setAnswer(id, answer) {
    Dispatcher.dispatch({
      actionType: CharacteristicActions.SET_ANSWER,
      id: id,
      answer: answer
    });
  }

};

module.exports = CharacteristicActions;