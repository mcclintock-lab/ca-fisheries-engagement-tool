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
import SelectField from 'material-ui/lib/select-field';

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
import TextField from 'material-ui/lib/text-field';

import GoalStore from '../stores/goals';
import {Component} from 'react';
import {Container} from 'flux/utils';
import GoalActions from '../actions/goalActions';
import WorkflowActions from '../actions/workflowActions';
import Slider from "material-ui/lib/slider"
const containerStyle = {
};

const textStyle = {
  textAlign: 'left',
  height: '100px'
};
const notesStyle = {
  textAlign: 'left',
  width:'100%'
};
const goalItemStyle = {
  textAlign: 'left'
};

const buttonDirs = {
  next: "next",
  prev: "prev"
};
const inform = "inform";
const involve = "involve";
const solicit = "solicit-input";
const collaborate = "collaborate";

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
          title={this._getActiveGoal().id === inform ? "Levels of Engagement" : this._getActiveGoal().header}
          subtitle={this._getActiveGoal().id === "inform" ? "Question 7 of 7" : "Question " + (GoalStore.getActiveGoalIndex()+1) + " of " + GoalStore.getNumGoals()}
          avatar={<div />} />
        <CardText expandable={true}>
          {this._getDescription()}
          {this._getControls()}
          {this._getLOESlider()}
                
          <TextField style={notesStyle} onChange={this._handleNotesChange()} 
                 name="notesTextField"
                floatingLabelText="Notes (optional):" defaultValue={this._getActiveGoal().notes}>
          </TextField>
          
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton  onTouchTap={this._handlePrevQuestion} label={this._getActiveGoal().id === "build-trust" ? "Back to Goal Overview" :"Previous Question"}/>
          <RaisedButton  primary={true} onTouchTap={this._handleNextQuestion} disabled={!this._optionIsChosen()} label={this._getActiveGoal().id === "inform" ? "Go to Timing" : "Next Question"}/>
          <RaisedButton secondary={true} style={this._isComplete() ? {display:'inline-block'} : {display:'none'}} onTouchTap={this._goToStep2} label="Go to Step 2 (Results)" disabled={!this._isComplete()}/>
        </CardActions>
      </Card>
    )
  },
  _getDescription(){
    let descDiv = null;
    let activeGoal = this._getActiveGoal();
    if(this._isLevelsOfEngagement(activeGoal.id)){
      descDiv = <div style={{textAlign:'left'}}>
          Not all marine resource management efforts or decisions require the same level of stakeholder 
          engagement. In some cases, simply informing stakeholders of minor updates to management areas
          through one-way communications such as an email listserv or newsletter may be sufficient. In other
          cases, it may be important to solicit input directly from stakeholders to gauge opinion on a specific set
          of questions. Involving stakeholders in a management decision requires a two-way exchange of 
          information and an assurance on the part of the manager that input will help shape management 
          alternatives, and collaborating with stakeholders compels managers and stakeholders to work closely
          together to jointly develop alternatives on a marine resource.
          <br/><br/>These four levels can be thought of as a “spectrum” of engagement involving progressively higher
          amounts of input and cooperation between stakeholders and marine resource managers (where
          “informing” requires the lowest level of interaction and “collaborating” requires the highest level).
          <br/><br/>Please select the appropriate level of engagement from the options below (<b>note that each progressively
          higher level of engagement includes all of the stakeholder strategies appropriate for the levels below it</b>):
        </div>
    } else {
      descDiv = <div style={{height:'80px', textAlign:'left'}}>
        {this.props.description}
      </div>

    }
    return descDiv;
  },

  _selectLevelOfEngagement(event, value){

    if(value === 0){
      GoalActions.setPriority(inform, 3);
      GoalActions.setPriority(solicit, 1);
      GoalActions.setPriority(involve, 1);
      GoalActions.setPriority(collaborate, 1);
    } else if(value === 1){
      GoalActions.setPriority(inform, 3);
      GoalActions.setPriority(solicit, 3);
      GoalActions.setPriority(involve, 1);
      GoalActions.setPriority(collaborate, 1);
    } else if(value === 2){
      GoalActions.setPriority(inform, 3);
      GoalActions.setPriority(solicit, 3);
      GoalActions.setPriority(involve, 3);
      GoalActions.setPriority(collaborate, 1);
    } else if(value === 3){
      GoalActions.setPriority(inform, 3);
      GoalActions.setPriority(solicit, 3);
      GoalActions.setPriority(involve, 3);
      GoalActions.setPriority(collaborate, 3);
    }
  },
  _getLOESlider(){
    let activeGoal = this._getActiveGoal();

    if(!this._isLevelsOfEngagement(activeGoal.id)){
      return "";
    } else {
      let activeStep = this._getSelectedLevelOfEngagement();
      let controls= <div style={{align:'center', width: '100%', maxWidth: 750, marginLeft:'auto', marginRight:'auto', marginTop: '0px', marginBottom:'0px'}}>
                        <Slider style={{width:'305px', paddingLeft:'125px', paddingRight:'20px',marginBottom:'0px'}} name="levelsOfEngagement" value={this._getSelectedLevelOfEngagement()} min={0} max={3} step={1} onChange={this._selectLevelOfEngagement}/>
                        <span style={{marginTop:'0px', width:'550px', textAlign:'left'}}>
                          <span style={{display:"inline-block", verticalAlign:'top', textAlign:'center',marginLeft:'-5px',width:'80px'}}>Inform <br/><i>(low)</i></span>
                          <span style={{display:"inline-block", verticalAlign:'top',textAlign:'center',marginLeft:'8px',width:'200px'}}>Solicit Input</span>
                          <span style={{display:"inline-block", verticalAlign:'top',textAlign:'center',paddingLeft:'5px',width:'100px'}}>Involve</span>
                          <span style={{display:"inline-block", verticalAlign:'top', textAlign:'center',paddingLeft:'10px',width:'175px'}}>Collaborate <br/><i>(high)</i></span>
                        </span>
                    </div>
      return controls;
    }
  },

  _getSelectedLevelOfEngagement(){
    let inform_priority = GoalStore.getPriority(inform);
    let solicit_priority = GoalStore.getPriority(solicit);
    let involve_priority = GoalStore.getPriority(involve);
    let collaborate_priority = GoalStore.getPriority(collaborate);

    if(collaborate_priority.priority === 3){
      return 3;
    }
    if(involve_priority.priority === 3){
      return 2;
    }
    if(solicit_priority.priority === 3){
      return 1;
    }
    return 0;
  },

  _isLevelsOfEngagement(goal_id){
    return goal_id === "inform";
  },

  _getActiveGoal(){
    let all_goals = GoalStore.getAll();
    let activeGoal = null;
    for(let g of all_goals){
      if(g.active){
        activeGoal = g;
      }
    }
    return activeGoal;
  },

  _getControls(p){
      let activeGoal =this._getActiveGoal();
      if(this._isLevelsOfEngagement(activeGoal.id)){
        return [];
      }

      let priority = "";
      if(activeGoal.priority === undefined){
        priority = ""
      } else {
        priority = ""+activeGoal.priority;
      }
      
      let controls = <RadioButtonGroup style={radioGroupStyle} onChange={this._handleOptionChange} name="ranking" ref="buttonGroup" defaultSelected={priority}>
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
      return controls

  },

  _isComplete(){
    return WorkflowActions.isComplete();
  },
  _goToStep2(event){
    if(event){
      WorkflowActions.goToStep2();
    }
  },

  getPriority() {
    if(this.refs.buttonGroup === undefined){
      //levels of engagement card
      return undefined;
    } else {
      return this.refs.buttonGroup.getSelectedValue();
    }
    
  },

  //we only want to check if *any* option is chosen
  _optionIsChosen(){
    let ag = this._getActiveGoal();

    if(ag){
      if(ag.id === "inform"){
        let loes = GoalStore.getLevelsOfEngagement();
        for(let loe of loes){
          if(loe.priority === undefined){
            return false;
          }
        }
        return true;
      } else {
        return (ag.priority !== undefined);
      }
      
    } else {
      return false;
    }
  },

  _handleNotesChange(event){
    return (function(event) {
      let notes = event.target.value;
      let ag = this._getActiveGoal();
      GoalActions.setNotes(ag.id, notes); 
    }).bind(this);
  },

  _handleOptionChange(event){
    //fire the change...
    let ag = GoalStore.getActiveGoal();
    let priority = event.target.value;
    if(ag){
      if(priority){
        GoalActions.setPriority(ag.id, priority);
      } else {
        GoalActions.setPriority(ag.id, ag.priority);  
      }
      
    } 
  },

  _handleNextQuestion() {
    this.props.onNext(buttonDirs.next);
  },

  _handlePrevQuestion() {
    this.props.onNext(buttonDirs.prev);
  }

})

const Goals = React.createClass({

  mixins: [Lifecycle],

  routerWillLeave(a, b) {
    //this gets set when buttons are pressed now
    //let activeGoal = GoalStore.getActiveGoal();

    //let id = this.refs.form.props.id;
    //let priority = this.refs.form.getPriority();
    /*if(activeGoal !== null && activeGoal.priority !== undefined){
      GoalActions.setPriority(activeGoal.id, activeGoal.priority);  
    } 
    */
  },

  calculateState() {
    return {
      goals: GoalStore.getAll(),
      activeGoal: GoalStore.getActiveGoal(),
      goal_notes: GoalStore.getActiveGoalNotes()
    };
  },


  getInitialState() {
    let st = this.calculateState();
    return st;
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
        <GoalForm ref="form" onNext={this._handleFormComplete}  {...GoalStore.getActiveGoal()} index={GoalStore.getAll().indexOf(GoalStore.getActiveGoal()) + 1} goalsLength={GoalStore.getAll()-3} key={GoalStore.getActiveGoal().id} />
      </div>
    );
  },

  _handleFormComplete(dir) {
    if(dir === buttonDirs.next){
      WorkflowActions.nextStep(this.props.location, this.props.history);
    } else {
      WorkflowActions.prevStep(this.props.location, this.props.history);
    }
  }

});

export default Goals;
