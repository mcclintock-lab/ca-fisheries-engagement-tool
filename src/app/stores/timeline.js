import Dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import {Store} from 'flux/utils';
import assign from 'object-assign';
import TimelineActions from '../actions/timelineActions';
import WorkflowActions from '../actions/workflowActions';

import _timeline from '../data/timeliness';

function setTimeliness(settings) {
  for (let item of _timeline) {
    item.chosen = !!settings[item.id];
  }
}

class TimelineStore extends Store {

  getAll() {
    return _timeline;
  }

  __onDispatch = function(action) {

    switch(action.actionType) {
      case TimelineActions.SET_TIMELINESS:
        setTimeliness(action.settings || {});
        this.__emitChange();
        break;

      case TimelineActions.SET_TIMELINESS_AND_ADVANCE:
        setTimeliness(action.settings || {});
        this.history.push(...window.location, {pathname: '/characteristics/undefined-community'});
        this.__emitChange();
        break;

      case WorkflowActions.MARSHAL_ANSWERS:
        let answers = action.answers;
        for (let timeline of _timeline) {
          timeline.chosen = (answers[timeline.id] || "false") === "true";
        }
        this.__emitChange();
        break;

      default:
        // noop
    }

  }

};

module.exports = new TimelineStore(Dispatcher);

