import Dispatcher from '../dispatcher';

let MethodActions = {

  SET_SELECTED: 'SET_SELECTED',

  setSelected(id, selected) {
    Dispatcher.dispatch({
      actionType: MethodActions.SET_SELECTED,
      id: id,
      selected: selected
    });
  }
};

module.exports = MethodActions;