import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import SvgIcon from 'material-ui/lib/svg-icon';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardHeader from 'material-ui/lib/card/card-header';
const Checkbox = require('material-ui/lib/checkbox');
const RadioButton = require('material-ui/lib/radio-button');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
const Toggle = require('material-ui/lib/toggle');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardMedia = require('material-ui/lib/card/card-media');
import Avatar from 'material-ui/lib/avatar';
import FlatButton from 'material-ui/lib/flat-button';
import { Lifecycle, RouteContext } from 'react-router';
import reactMixin from 'react-mixin';


import GoalStore from '../stores/goals';
import {Component} from 'react';
import {Container} from 'flux/utils';
import GoalActions from '../actions/goalActions';
import WorkflowActions from '../actions/workflowActions';

const containerStyle = {
};

const textStyle = {
  textAlign: 'left',
  height: '120'
};

const goalItemStyle = {
  textAlign: 'left'
};

const buttonDirs = {
  next: "next",
  prev: "prev"
};

const GoalItem = React.createClass({

  render() {
    return (
      <ListItem 
        disabled={true} 
        style={goalItemStyle} 
        primaryText={this.props.header} 
        rightIcon={<Avatar style={{color: 'white'}}>{this.props.priority}</Avatar>} 
      />
    )
  },

});


let radioGroupStyle = {
  paddingTop: '30px',
  color: 'red',
  textAlign: 'left'
};

const GoalForm = React.createClass({

  render() {
    return (
      <Card initiallyExpanded={true}>
        <CardHeader
          title={this.props.header}
          subtitle={"Question " + this.props.index + " of " + this.props.goalsLength}
          avatar={<div />} />
        <CardText expandable={true}>
          <div style={textStyle}>
          {this.props.description}
          </div>
          <RadioButtonGroup style={radioGroupStyle} onChange={this._handleOptionChange} name="ranking" ref="buttonGroup" defaultSelected={this.props.priority}>
            <RadioButton
              value="1"
              label="Not a Priority"
              style={{marginBottom:16}} />
            <RadioButton
              value="2"
              label="Somewhat of a Priority"
              style={{marginBottom:16}}/>
            <RadioButton
              value="3"
              label="High Priority"
              style={{marginBottom:16}}/>
          </RadioButtonGroup>
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton  onTouchTap={this._handlePrevQuestion} disabled={this.props.index === 1} label="Previous Question"/>
          <RaisedButton  onTouchTap={this._handleNextQuestion} disabled={!this._optionIsChosen()} label={this.props.index === this.props.goalsLength ? "Next Step" : "Next Question"}/>
        </CardActions>
      </Card>
    )
  },


  getPriority() {
    return this.refs.buttonGroup.getSelectedValue();
  },

  //we only want to check if *any* option is chosen
  _optionIsChosen(){
    let ag = GoalStore.getActiveGoal();
    if(ag){
      return (ag.priority !== undefined);
    } else {
      return false;
    }
  },

  _handleOptionChange(event){
    //fire the change...
    let ag = GoalStore.getActiveGoal();
    let priority = this.getPriority();
    if(ag){
      if(priority){
        GoalActions.setPriority(ag.id, priority);
      } else {
        GoalActions.setPriority(ag.id, ag.priority);  
      }
      
    } 
  },

  _handleNextQuestion() {
    this.props.onNext(this.getPriority(), buttonDirs.next);
  },

  _handlePrevQuestion() {
    this.props.onNext(this.getPriority(), buttonDirs.prev);
  }

})

const Goals = React.createClass({

  mixins: [Lifecycle],

  routerWillLeave(a, b) {
    let id = this.refs.form.props.id;
    let priority = this.refs.form.getPriority();
    
    if(priority !== null && priority !== ""){
      GoalActions.setPriority(id, priority);  
    } 
    
  },

  calculateState() {
    return {
      goals: GoalStore.getAll(),
      activeGoal: GoalStore.getActiveGoal()
    };
  },

  getInitialState() {
    return this.calculateState();
  },

  componentDidMount() {
    this.storeListener = GoalStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    if (this.storeListener) {
      this.storeListener.remove();
    }
  },

  _onChange() {
    this.setState(this.calculateState());
  },

  render() {
    return (
      <div style={containerStyle}>
        <GoalForm ref="form" onNext={this._handleFormComplete}  {...this.state.activeGoal} index={this.state.goals.indexOf(this.state.activeGoal) + 1} goalsLength={this.state.goals.length} key={this.state.activeGoal.id} />
      </div>
    );
  },

  _handleFormComplete(priority, dir) {
    if(dir === buttonDirs.next){
      WorkflowActions.nextStep(this.props.location, this.props.history);
    } else {
      WorkflowActions.prevStep(this.props.location, this.props.history);
    }
  }

});

export default Goals;
