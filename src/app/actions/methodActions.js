import Dispatcher from '../dispatcher';

let MethodActions = {

  SET_SELECTED: 'SET_SELECTED',
  SET_REASON: 'SET_REASON',

  setSelected(id, selected) {
    Dispatcher.dispatch({
      actionType: MethodActions.SET_SELECTED,
      id: id,
      selected: selected
    });
  },
  setReason(id, reason){
    Dispatcher.dispatch({
      actionType: MethodActions.SET_REASON,
      id: id,
      reason: reason
    });    
  }
};

module.exports = MethodActions;