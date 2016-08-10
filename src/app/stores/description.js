import Dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import {Store} from 'flux/utils';
import assign from 'object-assign';
import DescriptionActions from '../actions/descriptionActions';
import WorkflowActions from '../actions/workflowActions';

require("babel-polyfill");

let _fishery = "";
let _stakeholders = "";
let _userName = "";
let _projectName = "";
let _projectRationale = "";

function setFishery(fishery) {
  _fishery = fishery;
}
function setStakeholders(stakeholders) {
  _stakeholders = stakeholders;
}
function setUserName(userName) {
  _userName = userName;
}
function setProjectName(projectName) {
  _projectName = projectName;
}
function setProjectRationale(projectRationale) {
  _projectRationale = projectRationale;
}


class DescriptionStore extends Store {

  getFishery() {
    return _fishery;
  }

  getStakeholders(){
    return _stakeholders;
  }
  getUserName(){
    return _userName;
  }
  getProjectName(){
    return _projectName;
  }
  getProjectRationale(){
    return _projectRationale;
  }

  __onDispatch = function(action) {
    switch(action.actionType) {
      case DescriptionActions.SET_FISHERY:
        setFishery( action.fishery);
        break;
      case DescriptionActions.SET_STAKEHOLDERS:
        setStakeholders(action.stakeholders);
        break;
      case DescriptionActions.SET_USER_NAME:
        setUserName(action.userName);
        break;
      case DescriptionActions.SET_PROJECT_NAME:
        setProjectName(action.projectName);
        break;
      case DescriptionActions.SET_PROJECT_RATIONALE:
        setProjectRationale(action.projectRationale);
        break;
      case WorkflowActions.MARSHAL_ANSWERS:
        let answers = action.answers;

        let desc = answers['fishery_description'];
        setFishery(desc);

        let stakeholders = answers['fishery_stakeholders'];
        setStakeholders(stakeholders);

        let userName = answers['userName'];
        setUserName(userName);

        let projectName = answers['projectName'];
        setProjectName(projectName);

        let projectRationale = answers['projectRationale'];
        setProjectRationale(projectRationale);

        this.__emitChange();
        break;
      default:
        // noop
    }
  }
};

module.exports = new DescriptionStore(Dispatcher);

