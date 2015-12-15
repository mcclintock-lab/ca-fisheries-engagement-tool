import React from 'react';
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createHashHistory } from 'history'

import Main from './components/main'; // Our custom react component
import Goals from './components/goals';
import GoalStore from './stores/goals';
import Timeline from './components/timeline';
import TimelineStore from './stores/timeline';
import Characteristics from './components/characteristics';
import CharacteristicStore from './stores/characteristics';
import Results from './components/results';
import qs from 'querystring';

import Intro from './components/intro';
import Dispatcher from './dispatcher';
import WorkflowActions from './actions/workflowActions';


//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let history = createHashHistory();
GoalStore.history = history;
TimelineStore.history = history;

if (window.location.toString().indexOf('/results') !== -1) {
  // Okay, we'll marshal state from the query string
  WorkflowActions.marshalAnswers(qs.decode(window.location.hash.replace('?', '')));
} else {
  console.log('nope');
  history.push(...window.location, {
    pathname: "/intro"
  });  
}

let unlisten = history.listen(location => {
  if (location.pathname.indexOf('goals') !== -1) {
    if (!Dispatcher.isDispatching()) {
      let id = location.pathname.split('/goals/')[1];
      if (GoalStore.canProceedToGoal(id)) {
        Dispatcher.dispatch({
          actionType: 'URL_UPDATE',
          path: location.pathname,
          goalID: id
        });
      }    
    }    
  } else if (location.pathname.indexOf('characteristics') !== -1) {
    if (!Dispatcher.isDispatching()) {
      let id = location.pathname.split('/characteristics/')[1];
      Dispatcher.dispatch({
        actionType: 'URL_UPDATE',
        path: location.pathname,
        id: id
      });
    }    
  }
});

render((
  <Router history={history}>
    <Route path="/" component={Main}>
      <Route path="goals/:id" component={Goals}/>
      <Route path="timeline" component={Timeline}/>
      <Route path="characteristics/:id" component={Characteristics}/>
      <Route path="results" component={Results}/>
      <Route path="*" component={Intro}/>
    </Route>
  </Router>
), document.getElementById('app'));

window.Dispatcher = Dispatcher;