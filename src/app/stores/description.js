import Dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import {Store} from 'flux/utils';
import assign from 'object-assign';
import DescriptionActions from '../actions/descriptionActions';
import WorkflowActions from '../actions/workflowActions';

require("babel-polyfill");

let _fishery = "";
let _stakeholders = "";

function setFishery(fishery) {
  _fishery = fishery;
}

function setStakeholders(stakeholders) {
  _stakeholders = stakeholders;
}

class DescriptionStore extends Store {

  getFishery() {
    return _fishery;
  }

  getStakeholders(){
    return _stakeholders;
  }

  __onDispatch = function(action) {
    switch(action.actionType) {
      case DescriptionActions.SET_FISHERY:
        setFishery( action.fishery);
        break;
      case DescriptionActions.SET_STAKEHOLDERS:

        setStakeholders(action.stakeholders);
        break;
      case WorkflowActions.MARSHAL_ANSWERS:
        let answers = action.answers;
        let desc = answers['fishery_description'];
        setFishery(desc);
        let stakeholders = answers['fishery_stakeholders'];
        setStakeholders(stakeholders);
        
        this.__emitChange();
        break;
      default:
        // noop
    }
  }

};

module.exports = new DescriptionStore(Dispatcher);

