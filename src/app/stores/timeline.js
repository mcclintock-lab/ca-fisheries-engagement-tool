import Dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import {Store} from 'flux/utils';
import assign from 'object-assign';
import TimelineActions from '../actions/timelineActions';
import WorkflowActions from '../actions/workflowActions';

import _timeline from '../data/timeliness';
let _notes = "";

function setTimeliness(id) {
  for (let item of _timeline) {
    if(item.id === id){
      item.chosen = true;
    } else {
      item.chosen = false;
    }
  }
}

function setTimingNotes(notes) {
  _notes = notes;
}

class TimelineStore extends Store {

  getAll() {
    return _timeline;
  }
  getSelectedTiming(){
    let timing = _timeline.find( (time) => time.chosen );
    return timing;
  }

  getNotes(){
    return _notes;
  }

  __onDispatch = function(action) {
    let notes_key = ".note";
    switch(action.actionType) {
      case TimelineActions.SET_TIMELINESS:
        setTimeliness(action.settings || {});
        this.__emitChange();
        break;
      case TimelineActions.SET_NOTES:
        setTimingNotes(action.notes);
        this.__emitChange();
        break;
      case TimelineActions.SET_TIMELINESS_AND_ADVANCE:
        setTimeliness(action.settings || {});
        this.history.push(...window.location, {pathname: '/characteristics/undefined-community'});
        this.__emitChange();
        break;

      case TimelineActions.SET_TIMELINESS_AND_GOBACK:
        setTimeliness(action.settings || {});
        this.history.push(...window.location, {pathname: '/goals/empower'});
        this.__emitChange();
        break;

      case WorkflowActions.MARSHAL_ANSWERS:
        let answers = action.answers;
        for (let timeline of _timeline) {
          timeline.chosen = (answers[timeline.id] || "false") === "true";
          let notes = answers[timeline.id+notes_key];
          if(notes === undefined){
            notes = "";
          }
          timeline.notes = notes;
        }
        this.__emitChange();
        break;

      default:
        // noop
    }

  }

};

module.exports = new TimelineStore(Dispatcher);

