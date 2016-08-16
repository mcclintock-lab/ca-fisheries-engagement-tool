import pathInfo from '../pathInfo';
import Dispatcher from '../dispatcher';

let WorkflowActions = {
  
  nextStep(location, history) {
    let GoalStore = require('../stores/goals');
    let info = pathInfo(location);
    
    if (info.inGoals) {

      let nextGoal = GoalStore.getNextGoal();
      if (nextGoal) {
        history.push(
          ...location, {pathname: "/goals/" + nextGoal.id}
        );      
      } else {
        history.push(
          ...location, {pathname: "/timeline/"}
        );              
      }
    } else if (info.inTimeline) {
      history.push(...location, {pathname: "/char_overview"});
    } else if (info.inCharacteristics) {
      let CharacteristicStore = require('../stores/characteristics');
      let next = CharacteristicStore.getNext();
      if (next) {
        history.push(
          ...location, {pathname: "/characteristics/" + next.id}
        );      
      } else {
        history.push(
          ...location, {pathname: "/results/"}
        );              
      }      
    } 
  },

  prevStep(location, history) {
    let GoalStore = require('../stores/goals');
    let info = pathInfo(location);
    if (info.inGoals) {
      let prevGoal = GoalStore.getPrevGoal()
      if (prevGoal) {
        history.push(
          ...location, {pathname: "/goals/" + prevGoal.id}
        );      
      } else { 
        history.push(
          ...location, {pathname: "/goal_overview"}
        );   
      }
    } else if (info.inTimeline) {
      history.push(...location, {pathname: "/goals/empower"})
    } else if (info.inCharacteristics) {
      let CharacteristicStore = require('../stores/characteristics')
      let prev = CharacteristicStore.getPrev()
      if (prev) {
        history.push(
          ...location, {pathname: "/characteristics/" + prev.id}
        );      
      } else {
        history.push(
          ...location, {pathname: "/char_overview"}
        );              
      }      
    } else if (info.inStep3){
      history.push(
        ...location, {pathname: "/results/"}
      );  
    }
  },

  serializeResultsToUrl(history, location) {
    let note_key = ".note"
    let GoalStore = require('../stores/goals');
    let CharacteristicStore = require('../stores/characteristics');
    let TimelineStore = require('../stores/timeline');
    let DescriptionStore = require('../stores/description');
    let answers = {};
    for (let goal of GoalStore.getAll()) {
      answers[goal.id] = goal.priority;
      let notes = goal.notes;
      if(notes === undefined){
        notes = "";
      }
      answers[goal.id+note_key] = encodeURIComponent(notes);
    }
    for (let timeline of TimelineStore.getAll()) {
      answers[timeline.id] = timeline.chosen;
      let notes = timeline.notes;
      if(notes === undefined){
        notes = "";
      }
      answers[timeline.id+note_key] = encodeURIComponent(notes);
    }
    for (let char of CharacteristicStore.getAllSettable()) {
      answers[char.id] = char.answer;
      let notes = char.notes;
      if(notes === undefined){
        notes = "";
      }
      answers[char.id+note_key] = encodeURIComponent(notes);
    }
    let fishery = encodeURIComponent(DescriptionStore.getFishery());
    if(fishery === undefined || fishery.length === 0){
      fishery = "Unnamed";
    }
    let stakeholders = encodeURIComponent(DescriptionStore.getStakeholders());
    if(stakeholders === undefined || stakeholders.length === 0){
      stakeholders = "Unnamed";
    }
    let userName = encodeURIComponent(DescriptionStore.getUserName());
    if(userName === undefined || userName.length === 0){
      userName = "Unnamed";
    }
    let projectName = encodeURIComponent(DescriptionStore.getProjectName());
    if(projectName === undefined || projectName.length === 0){
      projectName = "Unnamed";
    }
    let projectRationale = encodeURIComponent(DescriptionStore.getProjectRationale());
    if(projectRationale === undefined || projectRationale.length === 0){
      projectRationale = "Unnamed";
    }

    answers['fishery_description'] = fishery;
    answers['fishery_stakeholders'] = stakeholders;
    answers['userName'] = userName;
    answers['projectName'] = projectName;
    answers['projectRationale'] = projectRationale;

    let queryString = "?"
    for (let key in answers) {
      queryString = queryString + "&" + key + "=" + answers[key];
    }

    history.push({pathname: '/results', search: "?" + queryString.substring(2)});
  },

  MARSHAL_ANSWERS: 'MARSHAL_ANSWERS',

  marshalAnswers(answers) {
    Dispatcher.dispatch({
      actionType: WorkflowActions.MARSHAL_ANSWERS,
      answers: answers
    });
  }

};

module.exports = WorkflowActions;