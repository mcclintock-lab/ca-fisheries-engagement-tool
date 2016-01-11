import Dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import {Store} from 'flux/utils';
import assign from 'object-assign';
import CharacteristicActions from '../actions/characteristicActions';
import WorkflowActions from '../actions/workflowActions';
require("babel-polyfill");

import _characteristics from '../data/fisheryCharacteristics';

function setAnswer(id, answer) {
  let characteristic = _characteristics.find((char) => char.id === id);
  if (characteristic) {
    characteristic.answer = answer;
  }
}

class CharacteristicStore extends Store {

  getAll() {
    return _characteristics;
  }

  setActiveQuestion(id) {
    for (let char of _characteristics) {
      char.active = char.id === id;
    }
  }

  getCompleted() {
    return _characteristics.filter( (char) => char.answer );
  }

  getIncomplete() {
    return _characteristics.filter( (char) => !char.answer );
  }

  getActive() {
    return _characteristics.find( (char) => char.active );
  }

  getNext() {
    let active = this.getActive();
    return _characteristics[_characteristics.indexOf(active) + 1];
  }

  __onDispatch = function(action) {

    switch(action.actionType) {
      case CharacteristicActions.SET_ANSWER:
        setAnswer(action.id, action.answer);
        this.__emitChange();
        break;

      case 'URL_UPDATE':
        let id = action.id;
        for (let char of _characteristics) {
          char.active = char.id === id;
        }
        this.__emitChange();
        break;

      case WorkflowActions.MARSHAL_ANSWERS:
        let answers = action.answers;
        for (let char of _characteristics) {
          if (answers[char.id] && answers[char.id] !== 'undefined') {
            char.answer = answers[char.id];  
          }
        }
        this.__emitChange();
        break;

      default:
        // noop
    }

  }

};

module.exports = new CharacteristicStore(Dispatcher);

