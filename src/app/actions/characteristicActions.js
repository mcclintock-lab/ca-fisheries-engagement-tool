import Dispatcher from '../dispatcher';

let CharacteristicActions = {

  SET_ANSWER: 'SET_ANSWER',
  SET_NOTES: 'SET_CHAR_NOTES',
  setAnswer(id, answer) {
    Dispatcher.dispatch({
      actionType: CharacteristicActions.SET_ANSWER,
      id: id,
      answer: answer
    });
  },
  setNotes(id, notes) {
    Dispatcher.dispatch({
      actionType: CharacteristicActions.SET_NOTES,
      id: id,
      notes: notes
    });
  }


};

module.exports = CharacteristicActions;