import Dispatcher from '../dispatcher';

let TimelineActions = {

  SET_TIMELINESS: 'SET_TIMELINESS',
  SET_TIMELINESS_AND_ADVANCE: 'SET_TIMELINESS_AND_ADVANCE',
  SET_TIMELINESS_AND_GOBACK: 'SET_TIMELINESS_AND_GOBACK',
  SET_NOTES: 'SET_TIME_NOTES',
  setTimeliness(settings) {
    Dispatcher.dispatch({
      actionType: TimelineActions.SET_TIMELINESS,
      settings: settings
    });
  },
  setNotes(notes) {
    Dispatcher.dispatch({
      actionType: TimelineActions.SET_NOTES,
      notes: notes
    });
  },
  

  setTimelinessAndAdvance(settings) {
    Dispatcher.dispatch({
      actionType: TimelineActions.SET_TIMELINESS_AND_ADVANCE,
      settings: settings
    });
  },

  

  setTimelinessAndGoBack(settings) {
    Dispatcher.dispatch({
      actionType: TimelineActions.SET_TIMELINESS_AND_GOBACK,
      settings: settings
    });
  }
};

module.exports = TimelineActions;