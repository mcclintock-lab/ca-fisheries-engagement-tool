import Dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import {Store} from 'flux/utils';
import assign from 'object-assign';
import CharacteristicActions from '../actions/characteristicActions';
import WorkflowActions from '../actions/workflowActions';
require("babel-polyfill");

import _characteristics from '../data/fisheryCharacteristics';
import _all_characteristics from '../data/allFisheryCharacteristics'
const _alternatives = {"high-capacity-for-engagement":"low-capacity-for-engagement",
                      "high-tech-literacy": "low-tech-literacy",
                      "large-geographic-size":"small-geographic-size",
                      "existing-leaders":"no-existing-leaders"}
                      
function setAnswer(id, answer) {
  let characteristic = _characteristics.find((char) => char.id === id);

  characteristic.answer = answer;
}

function _getAlternative(id){
  let characteristic = _all_characteristics.find((char) => char.id === id);
  return characteristic;
}
function _getOriginal(id){
  let characteristic = _characteristics.find((char) => char.id === id);
  return characteristic;
}

class CharacteristicStore extends Store {

  getAllSettable() {
    return _characteristics;
  }

  getAllWithSpecialCases() {
  
    for (let char of _all_characteristics) {
        let alternative_id = _alternatives[char.id];
        let original_char = _getOriginal(char.id);

        if(alternative_id !== undefined){
          let alt_characteristic = _getAlternative(alternative_id);

          if(char.answer === 3){
            char.answer = 2;
            alt_characteristic.answer = 2;
          } else if(char.answer === 2){
            char.answer = 2;
            alt_characteristic.answer = 1;
          } else if(char.answer === 1){
            char.answer = 1;
            alt_characteristic.answer = 2;
          } else {
            char.answer = 0;
            alt_characteristic.answer = 0
          }
        } else {
          if(original_char !== undefined){
            char.answer = original_char.answer
          }
        }
    }
    
    return _all_characteristics;
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
    let active = _characteristics.find( (char) => char.active );
    if(active === undefined){
      let activeId = _characteristics[_characteristics.length - 1].id;
      this.setActiveQuestion(activeId);
      return activeId;
    } else{
      return active;
    }
  }

  getNext() {
    let active = this.getActive();
    let next = _characteristics[_characteristics.indexOf(active) + 1];
    return next;
  }

  getPrev() {
    let active = this.getActive();
    return _characteristics[_characteristics.indexOf(active) - 1];
  }

  __onDispatch = function(action) {

    switch(action.actionType) {
      case CharacteristicActions.SET_ANSWER:
        setAnswer(action.id, action.answer);
        this.__emitChange();
        break;

      case 'URL_UPDATE':
        let id = action.id;
        if(id){
          for (let char of _characteristics) {
            char.active = char.id === id;
          }          
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

