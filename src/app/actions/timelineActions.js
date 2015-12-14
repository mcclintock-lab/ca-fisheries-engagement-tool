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
};

module.exports = TimelineActions;