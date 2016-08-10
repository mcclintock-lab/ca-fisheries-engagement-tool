import Dispatcher from '../dispatcher';

let DescriptionActions = {

  SET_FISHERY: 'SET_FISHERY',
  SET_STAKEHOLDERS: 'SET_STAKEHOLDERS',
  SET_USER_NAME: 'SET_USER_NAME',
  SET_PROJECT_NAME: 'SET_PROJECT_NAME',
  SET_PROJECT_RATIONALE: 'SET_PROJECT_RATIONALE',
  setFishery(fishery){
    Dispatcher.dispatch({
      actionType: DescriptionActions.SET_FISHERY,
      fishery: fishery
    });
  },
  setStakeholders(stakeholders){
    Dispatcher.dispatch({
      actionType: DescriptionActions.SET_STAKEHOLDERS,
      stakeholders: stakeholders
    });
  },
  setUserName(userName){
    Dispatcher.dispatch({
      actionType: DescriptionActions.SET_USER_NAME,
      userName: userName
    });
  },
  setProjectName(projectName){
    Dispatcher.dispatch({
      actionType: DescriptionActions.SET_PROJECT_NAME,
      projectName: projectName
    });
  }, 
  setProjectRationale(projectRationale){
    Dispatcher.dispatch({
      actionType: DescriptionActions.SET_PROJECT_RATIONALE,
      projectRationale: projectRationale
    });
  } 
};

module.exports = DescriptionActions;
