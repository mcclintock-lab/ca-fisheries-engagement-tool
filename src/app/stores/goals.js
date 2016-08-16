import Dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import {Store} from 'flux/utils';
import assign from 'object-assign';
import GoalActions from '../actions/goalActions';
import WorkflowActions from '../actions/workflowActions';
require("babel-polyfill");

import _goals from '../data/goals';

// _goals.reverse();

function setPriority(id, priority) {
  let goal = _goals.find((goal) => goal.id === id);
  if (goal) {
    goal.priority = priority;
  }
}
function setNotes(id, notes){
  let goal = _goals.find((goal) => goal.id === id);
  if (goal) {
    goal.notes = notes;
  }
}

class GoalStore extends Store {

  getAll() {
    return _goals;
  }

  setActiveGoal(goalID) {
    for (let goal of _goals) {
      goal.active = goal.id === goalID;
    }
  }

  getCompletedGoals() {
    return _goals.filter( (goal) => goal.priority);
  }

  getIncompleteGoals() {
    return _goals.filter( (goal) => !goal.priority );
  }
  getUnsafeActiveGoal(){
    //this doesn't set a default -- its used in the tab header
    return _goals.find( (goal) => goal.active );
  }

  getActiveGoal() {
    let active_goal = _goals.find( (goal) => goal.active );
    
    if(active_goal === undefined){
      let activeId = _goals[_goals.length - 1].id;
      this.setActiveGoal(activeId);
      return activeId;
    } else{
      return active_goal;
    }
  }

  getActiveGoalNotes() {

    let active_goal = _goals.find( (goal) => goal.active );
    if(active_goal === undefined){
      return "";
    } else {
      return active_goal.notes;
    }
  }

  canProceedToGoal(goalID) {
    let goal = _goals.find( (goal) => goal.id === goalID);
    if (!goal) {
      return false;
    }
    let index = _goals.indexOf(goal);
    if (index > this.getCompletedGoals().length) {
      return false;
    } else {
      return true;
    }
  }

  getNextGoal() {
    let activeGoal = this.getActiveGoal();
    return _goals[_goals.indexOf(activeGoal) + 1];
  }

  getPrevGoal() {
    let activeGoal = this.getActiveGoal();
    return _goals[_goals.indexOf(activeGoal) - 1];
  }

  __onDispatch = function(action) {
    let notes_key = ".note";
    switch(action.actionType) {
      case GoalActions.SET_PRIORITY:
        setPriority(action.id, action.priority || 1);
        this.__emitChange();
        break;
      case GoalActions.SET_NOTES:
        setNotes(action.id, action.notes);
        this.__emitChange();
        break;  

      case GoalActions.SET_PRIORITY_AND_ADVANCE:
        setPriority(action.id, action.priority || 1);
        let nextGoal = this.getIncompleteGoals()[0];
        if (nextGoal) {
          this.setActiveGoal(nextGoal.id);
          this.history.push(...window.location, {pathname: '/goals/' + nextGoal.id});
        } else {
          this.history.push(...window.location, {pathname: '/timeline/'});
        }
        this.__emitChange();
        break;

      case 'URL_UPDATE':
        let goalID = action.goalID;
        for (let goal of _goals) {
          goal.active = goal.id === goalID;
        }
        this.__emitChange();
        break;

      case WorkflowActions.MARSHAL_ANSWERS:
        let answers = action.answers;
        for (let goal of _goals) {
          goal.priority = answers[goal.id] || 1;
          let notes = answers[goal.id+notes_key];
          if(notes === undefined){
            notes = "";
          }
          goal.notes = notes;
        }
        this.__emitChange();
        break;

      default:
        // noop
    }

  }

};

module.exports = new GoalStore(Dispatcher);

