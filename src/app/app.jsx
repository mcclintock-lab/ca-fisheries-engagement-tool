
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
import MethodStore from './stores/methods';


import Results from './components/results';
import GoalOverview from './components/goal_overview';
import CharOverview from './components/char_overview'
import Step3 from './components/step3'
import FisheryDescription from './components/fishery_description'

import qs from 'querystring';

import Intro from './components/intro';
import Principles from './components/principles';
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
  if(window.location.toString().indexOf('/principles') !== -1 ){
    history.push(...window.location, {
      pathname: "/principles"
    }); 
  } else {
    history.push(...window.location, {
      pathname: "/intro"
    }); 
  }
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
  <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={Main}>
      <Route path="goals/:id" component={Goals}/>
      <Route path="timeline" component={Timeline}/>
      <Route path="characteristics/:id" component={Characteristics}/>
      <Route path="results" component={Results}/>
      <Route path="goal_overview" component={GoalOverview}/>
      <Route path="char_overview" component={CharOverview}/>
      <Route path="fishery_description" component={FisheryDescription}/>
      <Route path="principles" component={Principles}/>
      <Route path="step3" component={Step3} />
      <Route path="*" component={Intro}/>
      
    </Route>
  </Router>
), document.getElementById('app'));

window.Dispatcher = Dispatcher;