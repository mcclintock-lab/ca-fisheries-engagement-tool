import Dispatcher from '../dispatcher';

let GoalActions = {

  SET_PRIORITY: 'SET_PRIORITY',

  setPriority(id, priority) {
    Dispatcher.dispatch({
      actionType: GoalActions.SET_PRIORITY,
      id: id,
      priority: priority
    });
  },

  SET_PRIORITY_AND_ADVANCE: 'SET_PRIORITY_AND_ADVANCE',

  setPriorityAndAdvance(id, priority) {
    Dispatcher.dispatch({
      actionType: GoalActions.SET_PRIORITY_AND_ADVANCE,
      id: id,
      priority: priority
    });
  }

};

module.exports = GoalActions;