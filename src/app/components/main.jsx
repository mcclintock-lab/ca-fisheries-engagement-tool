/** In this file, we create a React component which incorporates components provided by material-ui */

import React from 'react';
import { Lifecycle, RouteContext } from 'react-router';
import reactMixin from 'react-mixin';

import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardHeader from 'material-ui/lib/card/card-header';
import Popover from 'material-ui/lib/popover/popover'

const Checkbox = require('material-ui/lib/checkbox');
const RadioButton = require('material-ui/lib/radio-button');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
const Toggle = require('material-ui/lib/toggle');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardMedia = require('material-ui/lib/card/card-media');
import Avatar from 'material-ui/lib/avatar';
const LinearProgress = require('material-ui/lib/linear-progress');
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import SelectField from 'material-ui/lib/select-field';
import GoalStore from '../stores/goals';
import CharacteristicStore from '../stores/characteristics';
import TimelineStore from '../stores/timeline'
import {Component} from 'react';
import {Container} from 'flux/utils';

const containerStyle = {
  textAlign: 'center',
  paddingTop: 20,
};

const cardStyle = {
  minWidth: 300,
  margin: '0 auto',
  maxWidth: '800'
};

const principlesCardStyle = {
  minWidth: 300,
  margin: '0 auto',
  maxWidth: '1000'
};

const dropDownStyleVisible = {
  fontSize:'10px',
  textColor:Colors.grey500,
  textAlign:'left',
  height:'44px',
  width:'30%',
  marginLeft:'10px',
  marginRight:'10px'
};

const dropDownSpanStyle = {
  width:'100%',
  minWidth:'800px'
}

let dropDownDiv = {
  height:'44px',
};

const standardActions = [
  {
    text: 'Okay',
  },
];

const stepListStyle = {
  width: '33%',
  height:'50px',
  float:'left',
  display:'inline-block'
};


const selSize = 41;
const deselSize = 36;
let selAvatarStyle = {
  height: selSize - 2,
  width: selSize - 2,
  lineHeight: selSize-2 + 'px',
  fontSize: selSize / 2 + 6,
  top:8,
  color: 'white',
  backgroundColor:Colors.green500

};

let deselAvatarStyle = {
  height: deselSize - 2,
  width: deselSize - 2,
  lineHeight: deselSize + 'px',
  fontSize: deselSize / 2 + 6,
  color: Colors.grey300,
  top: 11,
  backgroundColor:Colors.grey500
};

let selectSpan = {
  height:'44px',
  width:'98%',
  verticalAlign:'middle'
}

const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [RouteContext],

  calculateState() {
    let completed_goals = this.getCompletedGoals();
    let completed_chars = this.getCompletedCharacteristics();
    let active_goal = this.getActiveGoalId();
    let active_timing = this.getActiveTimingId();
    let active_characteristic = this.getActiveCharacteristicId();
    let completed_timing = this.getCompletedTiming();
    let disableGoals = this.disableGoalsSelect(active_goal, completed_goals);
    let disableTiming = this.disableTimingSelect(active_timing);
    let disableCharacteristics = this.disableCharacteristicsSelect(active_characteristic);

    return {
      completed_goals: completed_goals,
      completed_characteristics: completed_chars,
      completed_timing: completed_timing,
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      active_goal:active_goal,
      active_characteristic: active_characteristic,
      active_timing: active_timing,
      disableGoals: disableGoals,
      disableTiming: disableTiming,
      disableCharacteristics: disableCharacteristics
    };
  },  
  disableGoalsSelect(active_goal_id, completed_goals){
    if(completed_goals === undefined || completed_goals.length === 0 || completed_goals[0].payload === 'none'){
      return true;
    } else{
      return false;
    }
  },
  disableTimingSelect(active_timing){
    return active_timing === 'none';
  },
  disableCharacteristicsSelect(active_characteristic){
    return active_characteristic === 'none';
  },

  getActiveTimingId(){
    let timing = TimelineStore.getSelectedTiming();

    if(timing === undefined || timing.length === 0){
      return 'none';
    } else {
      return timing.id;
    }
  },

  getCompletedTiming(){
    let timing = TimelineStore.getSelectedTiming();
    if(timing === undefined || timing.length === 0){
      return [{payload: 'none', text: 'No timing selected'} ]
    } else {
      let ttext = timing.heading;
      let tarray = ttext.split(/[ ,]+/);
      let textval = tarray[0]+" "+tarray[1]+"...";
      return [{payload: timing.id, text: textval} ];
    }
  },
  getActiveGoalId(){
    let active = GoalStore.getActiveGoal();
    let active_goal = 'none';
    let completed_goals = GoalStore.getCompletedGoals();
    if(active !== undefined){
      if(active.id === 'collaborate' && completed_goals.length === 0){
        active_goal = 'none';
      } else{
        active_goal = active.id; 
      }
       
    } 
    return active_goal;
  },
  hasNoGoals(){
    let all_goals = GoalStore.getCompletedGoals();
    if(all_goals === null || all_goals.length === 0){
      return true;
    } else {
      return false;
    }
  },

  getActiveCharacteristicId(){
    let active = CharacteristicStore.getActive();
    let completed_chars = CharacteristicStore.getCompleted();
    let active_char = 'none';

    if(active !== undefined){
      if(active.id === 'no-recent-engagement' && completed_chars.length === 0){
        active_char = 'none';
      } else{
        active_char = active.id; 
      }
    } 
    return active_char;
  },

  getCompletedGoals(){
    let completed = [];
    let active_goal = this.getActiveGoalId();
    let activeIncluded = false;
    let all_goals = GoalStore.getCompletedGoals();

    if(all_goals !== null && all_goals.length > 0){
      for(let g in all_goals){
        let goal = all_goals[g]
        if(g !== null){
          if(goal.id === active_goal){
            activeIncluded = true;
          }
          completed.push({payload:goal.id, text:this.getTrimmedHeader(goal.header)})
        }
      }
    }

    if(completed.length === 0 && active_goal !== 'build-trust'){

      completed = [{payload:'none',text:'No Goals Completed'}];
    } else {
      if(!activeIncluded){
        let ag = GoalStore.getActiveGoal();
        if(ag){
          if(completed.length === 0 && ag.id === 'collaborate'){
            completed = [{payload:'none',text:'No Goals Completed'}];
          } else {
            completed.push({payload:ag.id, text:this.getTrimmedHeader(ag.header)})
          }
        }
      }
    }
    return completed;
  },
  getTrimmedHeader(name){
    if(name.length > 44){
      return name.slice(0,44)+"..."
    } else {
      return name;
    }
  },
  getCompletedCharacteristics(){
    let completed = [];
    let all_chars = CharacteristicStore.getCompleted();
    let active_id = this.getActiveCharacteristicId();
    if(all_chars !== null && all_chars.length > 0){
      for(let c in all_chars){
        let char = all_chars[c]
        if(char !== null){
          completed.push({payload:char.id, text:this.getTrimmedHeader(char.heading)})
        }
      }
    }

    if(completed.length === 0 && active_id !== 'undefined-community'){
      completed = [{payload:'none',text:'No Characteristics Completed'}];
    } else {
      let ac = CharacteristicStore.getActive();

      if(ac){
        if(completed.length === 0 && ac.id === 'no-recent-engagement'){
          completed = [{payload:'none',text:'No Characteristics Completed'}];
        } else {
          let activeNotThere = true;
          for(let ch of completed){
            console.log("ch:::", ch);
            console.log("ac.id::", ac.id);
            if(ch.payload === ac.id){
              activeNotThere = false;
            }
          }
          if(activeNotThere){
            completed.push({payload:ac.id, text:this.getTrimmedHeader(ac.heading)}); 
          }
          
        }
      }
    }
    return completed;
  },
  getInitialState() {
    let state = this.calculateState();

    return state;
  },

  componentDidMount() {
    this.goalListener = GoalStore.addListener(this._onChange);
    this.timeListener = TimelineStore.addListener(this._onChange);
    this.charListener = CharacteristicStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    if (this.goalListener) {
      this.goalListener.remove();
    }
    if(this.timeListener){
      this.timeListener.remove();
    }
    if(this.charListener){
      this.charListener.remove();
    }
  },

  _onChange() {
    this.setState(this.calculateState());
  },



  componentWillMount() {

    // this.setState({muiTheme: newMuiTheme});
    if (this.props.location.pathname === "/") {
      this.props.history.push("/intro");
    }
  },

  calculateProgress() {
    let path = this.props.location.pathname;
    let all = GoalStore.getAll();
    if (path.indexOf('intro') !== -1) {
      return 0;
    } else if(path.indexOf('fishery_description') !== -1){
      return 1;
    } else if (path.indexOf('goal_overview') !== -1){
      return 2;
    } else if (path.indexOf('goals') !== -1) {
      let activeGoal = GoalStore.getActiveGoal();
      let fraction = all.indexOf(activeGoal) / all.length;
      return (33 * fraction) + 2;
    } else if (path.indexOf('timeline') !== -1) {
      return 45;
    } else {
      let active = CharacteristicStore.getActive();
      let all = CharacteristicStore.getAllSettable();
      let fraction = all.indexOf(active) / all.length;
      return (30 * fraction) + 70;
    }
  },

  _handleGoalSelect: function(event,key,payload) {
    let completed_goals = GoalStore.getCompletedGoals();
    if(completed_goals === undefined || completed_goals.length === 0){
      return;
    }
    if(event !== undefined && event.target !== undefined && event.target.value !== undefined){
      let item_id = event.target.value;
      this.props.history.push(...this.props.location, {pathname: "/goals/" + item_id});      
    }

  },

  _handleTimeSelect: function(event,key,payload) {
    let completed = TimelineStore.getSelectedTiming();
    if(completed === undefined || completed.length === 0){
      return;
    }
    console.log("event: ", event, "target:", event.target, "value:", event.target.value);
    if(event !== undefined && event.target !== undefined && event.target.value !== undefined){
      let item_id = event.target.value;
      this.props.history.push(...this.props.location, {pathname: "/timeline"});  
    }
    
  },

  _handleCharacteristicsSelect: function(event,key,payload) {
    let completed = CharacteristicStore.getCompleted();
    if(completed === undefined || completed.length === 0){
      return;
    }
    if(event !== undefined && event.target !== undefined && event.target.value !== undefined){
      let item_id = event.target.value;
      this.props.history.push(...this.props.location, {pathname: "/characteristics/" + item_id});
    }
  },
  
  render() {

    let isGoals = this.props.location.pathname.indexOf('goals') !== -1;
    let isTimeline = this.props.location.pathname.indexOf('timeline') !== -1;
    let isCharacteristics = this.props.location.pathname.indexOf('characteristics') !== -1;
    let isIntro = this.props.location.pathname.indexOf('intro') !== -1;
    let isResults = this.props.location.pathname.indexOf('results') !== -1;
    let isPrinciples = this.props.location.pathname.indexOf('principles') !== -1;
    let isGoalsOverview = this.props.location.pathname.indexOf('goal_overview') !== -1;
    let isCharOverview = this.props.location.pathname.indexOf('char_overview') !== -1;
    let isStep3 = this.props.location.pathname.indexOf('step3') !== -1;
    let headerContent = (
      <div>
        <h3 style={{width:'100%'}, {marginTop:"0px"},{textAlign:"center"}}>Step 1 (Quantitative)</h3>
        <span style={{width:'100%'}}>
          <List className="navHeader">
            <ListItem style={stepListStyle} leftAvatar={<Avatar style={(isGoals || isGoalsOverview) ? selAvatarStyle : deselAvatarStyle}>A</Avatar>}>
              Goals
            </ListItem>
            <ListItem style={stepListStyle} leftAvatar={<Avatar style={isTimeline ? selAvatarStyle : deselAvatarStyle}>B</Avatar>}>
              Timing
            </ListItem>  
            <ListItem style={stepListStyle} leftAvatar={<Avatar style={(isCharacteristics || isCharOverview) ? selAvatarStyle : deselAvatarStyle}>C</Avatar>}>
              Characteristics
            </ListItem>  
          </List>
        </span>
        <span style={dropDownSpanStyle}>
          <SelectField disabled={this.state.disableGoals} style={dropDownStyleVisible} 
            floatingLabelText="Go to:" valueMember="payload" displayMember="text" 
            onClick={this._handleGoalSelect} 
            iconStyle={{fill:'black'}}
            menuItems={this.state.completed_goals}  
            value={this.state.active_goal}
          />
          <SelectField floatingLabelText="Go to:" ref="timingSelect" disabled={this.state.disableTiming} 
            onClick={this._handleTimeSelect}
            style={dropDownStyleVisible} valueMember="payload" displayMember="text" 
            iconStyle={{fill:'black'}}
            menuItems={this.state.completed_timing}  
            value={this.state.active_timing}
          />
          <SelectField floatingLabelText="Go to:" ref="charsSelect" disabled={this.state.disableCharacteristics} 
            style={dropDownStyleVisible}  valueMember="payload" displayMember="text" 
            onClick={this._handleCharacteristicsSelect} 
            iconStyle={{fill:'black'}}
            menuItems={this.state.completed_characteristics}  
            value={this.state.active_characteristic}
          />
        </span>

        <span style={{width:'100%'}}>
          <LinearProgress mode="determinate" color={"#4CAF50"} value={this.calculateProgress()} />
        </span>
      </div>
    );

    let resultsHeaderContent = (
      <div>
        <h3 style={{width:'100%'}, {marginTop:"0px"},{textAlign:"center"}}>{isResults ? 'Step 2 (Qualitative)' : 'Step 3 (Decision)'}</h3>

      </div>
    );

    return (
      <div style={containerStyle}>
        <Card style={ isPrinciples ? principlesCardStyle: cardStyle}>
          {(isResults || isStep3) ? resultsHeaderContent : (isIntro || isPrinciples || isStep3) ? null : headerContent}  
          {this.props.children}
        </Card>
      </div>
    );
  }
});

// reactMixin(Main.prototype, RouteContext);

export default Main;
