import Dispatcher from '../dispatcher';

let DescriptionActions = {

  SET_FISHERY: 'SET_FISHERY',

  setFishery(fishery){
    Dispatcher.dispatch({
      actionType: DescriptionActions.SET_FISHERY,
      fishery: fishery
    });
  },

  SET_STAKEHOLDERS: 'SET_STAKEHOLDERS',
  setStakeholders(stakeholders){
    Dispatcher.dispatch({
      actionType: DescriptionActions.SET_STAKEHOLDERS,
      stakeholders: stakeholders
    });
  }
  
};

module.exports = DescriptionActions;