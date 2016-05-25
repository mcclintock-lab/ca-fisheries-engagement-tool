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
    let GoalStore = require('../stores/goals');
    let CharacteristicStore = require('../stores/characteristics');
    let TimelineStore = require('../stores/timeline');
    let answers = {};
    for (let goal of GoalStore.getAll()) {
      answers[goal.id] = goal.priority;
    }
    for (let timeline of TimelineStore.getAll()) {
      answers[timeline.id] = timeline.chosen;
    }
    for (let char of CharacteristicStore.getAll()) {
      answers[char.id] = char.answer;
    }
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