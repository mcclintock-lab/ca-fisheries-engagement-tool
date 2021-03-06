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


import CharacteristicStore from '../stores/characteristics';
import {Component} from 'react';
import {Container} from 'flux/utils';
import CharacteristicActions from '../actions/characteristicActions';
import WorkflowActions from '../actions/workflowActions';
import TextField from 'material-ui/lib/text-field';

const containerStyle = {
};
const notesStyle = {
  textAlign: 'left',
  width:'100%'
};
const textStyle = {
  textAlign: 'left',
  height: '120'
};

const buttonDirs = {
  next: "next",
  prev: "prev"
};

let radioGroupStyle = {
  paddingTop: '30px',
  color: 'red',
  textAlign: 'left'
};

const CharacteristicForm = React.createClass({

  render() {
    return (
      <Card initiallyExpanded={true}>
        <CardHeader
          title={this.props.heading}
          subtitle={"Question " + this.props.index + " of " + this.props.questionLength}
          avatar={<div />} />
        <CardText expandable={true}>
          <div style={textStyle}>
            {this.props.description}
          </div>
          {this._getRadioButtons(CharacteristicStore.getActive())}
          <TextField style={notesStyle} onChange={this._handleNotesChange()} 
                 name="notesTextField"
                floatingLabelText="Notes (optional):" defaultValue={this._getNotes()}>
          </TextField>
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton onTouchTap={this._handlePrevQuestion} label={this.props.index === 1 ? "Back to Characteristics Overview" : "Previous Question"}/>
          <RaisedButton primary={true} onTouchTap={this._handleNextQuestion} disabled={!this._optionIsChosen()} label={this.props.index === this.props.questionLength ? "Complete" : "Next Question"}/>
          <RaisedButton secondary={true} style={this._isComplete() ? {display:'inline-block'} : {display:'none'}} onTouchTap={this._goToStep2} label="Go to Step 2 (Results)" disabled={!this._isComplete()}/>
        </CardActions>
      </Card>
    )
  },
  _isComplete(){
    return WorkflowActions.isComplete();
  },
  _goToStep2(event){
    if(event){
      WorkflowActions.goToStep2();
    }
  },
  _isSpecialCase(char_id){
    return (char_id === "high-capacity-for-engagement" || 
        char_id === "high-tech-literacy" || 
        char_id === "large-geographic-size" || 
        char_id === "existing-leaders");
  },

  _getRadioButtons(active_char){
    let buttons = null;
    let active_char_id = active_char.id;
    if(this._isSpecialCase(active_char_id)){
      buttons = <RadioButtonGroup style={radioGroupStyle} onChange={this._handleOptionChange} name="ranking" ref="buttonGroup" defaultSelected={this.props.answer}>
          <RadioButton
            value="2"
            label={active_char.yesbutton}
            style={{marginBottom:16}}/>
          <RadioButton
            value="1"
            label={active_char.nobutton}
            style={{marginBottom:16}}/>
          <RadioButton
            value="3"
            label="Both"
            style={{marginBottom:16}}/>
          <RadioButton
            value="0"
            label="Unknown"
            style={{marginBottom:16}} />
        </RadioButtonGroup>
    } else {
      buttons = <RadioButtonGroup style={radioGroupStyle} onChange={this._handleOptionChange} name="ranking" ref="buttonGroup" defaultSelected={this.props.answer}>
          <RadioButton
            value="2"
            label="Yes"
            style={{marginBottom:16}}/>
          <RadioButton
            value="1"
            label="No"
            style={{marginBottom:16}}/>
          <RadioButton
            value="0"
            label="Unknown"
            style={{marginBottom:16}} />
        </RadioButtonGroup>
    }
      return buttons;

  },

  getAnswer() {
    return this.refs.buttonGroup.getSelectedValue();
  },

  _getNotes(){
    let ag = CharacteristicStore.getActive();
    if(ag){
      return ag.notes;
    } else {
      return "";
    }
  },
  _handleNotesChange(event){
    return (function(event) {
      let notes = event.target.value;
      let ac = CharacteristicStore.getActive();
      CharacteristicActions.setNotes(ac.id, notes); 
    }).bind(this);
  },

  //we only want to check if *any* option is chosen
  _optionIsChosen(){
    
    let ag = CharacteristicStore.getActive();
    if(ag){
      return (ag.answer !== undefined);
    } else {
      return false;
    }
  },

  _handleOptionChange(event){
    //fire the change...
    let ag = CharacteristicStore.getActive();
    let answer = event.target.value
    
    if(ag){
      if(answer){
        CharacteristicActions.setAnswer(ag.id, answer);
      } else {
        CharacteristicActions.setAnswer(ag.id, ag.answer);  
      }
      
    } 
  },

  _handleNextQuestion() {
    this.props.onNext(this.getAnswer(), buttonDirs.next);
  },

  _handlePrevQuestion() {
    this.props.onNext(this.getAnswer(), buttonDirs.prev);
  }

})

const Characteristics = React.createClass({

  mixins: [Lifecycle],

  routerWillLeave(a, b) {
    let answer = this.refs.form.getAnswer();
    if(answer !== null && answer !== ""){
      CharacteristicActions.setAnswer(this.refs.form.props.id, answer);
    } 
    
  },

  calculateState() {
    return {
      characteristics: CharacteristicStore.getAllSettable(),
      activeQuestion: CharacteristicStore.getActive()
    };
  },

  getInitialState() {
    return this.calculateState();
  },

  componentDidMount() {
    this.storeListener = CharacteristicStore.addListener(this._onChange);
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
        <CharacteristicForm ref="form" onNext={this._handleFormComplete} {...this.state.activeQuestion} index={this.state.characteristics.indexOf(this.state.activeQuestion) + 1} questionLength={this.state.characteristics.length} key={this.state.activeQuestion.id} />
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

export default Characteristics;
