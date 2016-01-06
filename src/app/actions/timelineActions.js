import Dispatcher from '../dispatcher';

let TimelineActions = {

  SET_TIMELINESS: 'SET_TIMELINESS',

  setTimeliness(settings) {
    Dispatcher.dispatch({
      actionType: TimelineActions.SET_TIMELINESS,
      settings: settings
    });
  },

  SET_TIMELINESS_AND_ADVANCE: 'SET_TIMELINESS_AND_ADVANCE',

  setTimelinessAndAdvance(settings) {
    Dispatcher.dispatch({
      actionType: TimelineActions.SET_TIMELINESS_AND_ADVANCE,
      settings: settings
    });
  },

  SET_TIMELINESS_AND_GOBACK: 'SET_TIMELINESS_AND_GOBACK',

  setTimelinessAndGoBack(settings) {
    Dispatcher.dispatch({
      actionType: TimelineActions.SET_TIMELINESS_AND_GOBACK,
      settings: settings
    });
  }
};

module.exports = TimelineActions;