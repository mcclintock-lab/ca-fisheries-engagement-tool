import Dispatcher from '../dispatcher';

let GoalActions = {

  SET_PRIORITY: 'SET_PRIORITY',
  SET_PRIORITY_AND_ADVANCE: 'SET_PRIORITY_AND_ADVANCE',
  SET_PRIORITY_AND_GOBACK: 'SET_PRIORITY_AND_GOBACK',
  SET_NOTES: 'SET_GOAL_NOTES',
  setPriority(id, priority) {
    Dispatcher.dispatch({
      actionType: GoalActions.SET_PRIORITY,
      id: id,
      priority: priority
    });
  },
  setNotes(id, notes){
    Dispatcher.dispatch({
      actionType: GoalActions.SET_NOTES,
      id: id,
      notes: notes
    });
  },

  setPriorityAndAdvance(id) {
    Dispatcher.dispatch({
      actionType: GoalActions.SET_PRIORITY_AND_ADVANCE,
      id: id
    });
  },

  

  setPriorityAndGoBack(id) {
    Dispatcher.dispatch({
      actionType: GoalActions.SET_PRIORITY_AND_GOBACK,
      id: id
    });
  }
}



module.exports = GoalActions;