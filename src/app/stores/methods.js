import Dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import {Store} from 'flux/utils';
import assign from 'object-assign';
import MethodActions from '../actions/methodActions';
require("babel-polyfill");

let _methods = require('../methods-short');

function setSelected(id, selected) {
  console.log('selected: ', selected)
  _methods[id].selected = selected;

}

class MethodStore extends Store {

  getAll() {
    return _methods;
  }

  getSelectedMethods() {
    
    let sel_methods = [];
    
    let keys = Object.keys(_methods);
    for(let meth_id of keys){
      let curr_method = _methods[meth_id];
      if(curr_method.selected){
        sel_methods.push(curr_method);
      }
    }
    sel_methods.sort(function(a, b){return b.normalized_final_score - a.normalized_final_score})
    return sel_methods;
    
  }

  getUnselectedMethods() {
    return _methods.filter( (meth) => !meth.selected );
  }

  __onDispatch = function(action) {
    switch(action.actionType) {
      case MethodActions.SET_SELECTED:
        setSelected(action.id, action.selected || 0);
        this.__emitChange();
        break;
      default:
        // noop
    }
  }

};

module.exports = new MethodStore(Dispatcher);

