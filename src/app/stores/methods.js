import Dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import {Store} from 'flux/utils';
import assign from 'object-assign';
import MethodActions from '../actions/methodActions';

require("babel-polyfill");

let _methods = require('../methods-short');
let _method_details = require("../methods");

function setSelected(id, selected) {
  _methods[id].selected = selected;
}

function setReason(id, reason) {
  _methods[id].reason = reason;
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
        let details = _method_details[meth_id];
        if(details.id === meth_id){
          curr_method.details = details.text;
        }
        sel_methods.push(curr_method);
      }
    }
    sel_methods.sort(function(a, b){return b.normalized_final_score - a.normalized_final_score})
    return sel_methods;
  }

  getMethodsNotChosen() {
    
    let sel_methods = [];
    
    let keys = Object.keys(_methods);
    for(let meth_id of keys){
      let curr_method = _methods[meth_id];

      if(!curr_method.selected && curr_method.reason !== undefined){
        let details = _method_details[meth_id];
        if(details.id === meth_id){
          curr_method.details = details.heading+"<br/>"+details.text+"<br/>";
        }
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
      case MethodActions.SET_REASON:
        setReason(action.id, action.reason || 0);
        this.__emitChange();
        break;
      default:
        // noop
    }
  }

};

module.exports = new MethodStore(Dispatcher);

