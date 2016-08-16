import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
const RadioButton = require('material-ui/lib/radio-button');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardMedia = require('material-ui/lib/card/card-media');
import Avatar from 'material-ui/lib/avatar';
import TimelineStore from '../stores/timeline';
import TimelineActions from '../actions/timelineActions';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardHeader from 'material-ui/lib/card/card-header';
import WorkflowActions from '../actions/workflowActions';
import { Lifecycle, RouteContext } from 'react-router';

import {Component} from 'react';
import {Container} from 'flux/utils';
import TextField from 'material-ui/lib/text-field';

let radioGroupStyle = {
  paddingTop: '30px',
  color: 'red',
  textAlign: 'left'
};
const notesStyle = {
  textAlign: 'left',
  width:'100%'
};

const Timeline = React.createClass({
  mixins: [Lifecycle],

  getInitialState() {
    return this.calculateState();
  },


  calculateState() {
    return {
      items: TimelineStore.getAll(),
      notes: TimelineStore.getNotes()
    };
  },

  componentDidMount() {
    this.storeListener = TimelineStore.addListener(this._onChange);
    this._handleOptionChange();
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
      <Card initiallyExpanded={true}>
        <CardTitle
          title="Timing"
          avatar={<div />} />
        <CardText expandable={true} style={{textAlign: 'left', marginLeft: '25px', padding:'0px'}}>
            <div>
              Selecting the appropriate stakeholder engagement strategies also depends on the timing of the anticipated engagement in your management process. For example, establishing an Advisory Group with defined membership and a direct role in the decision-making process may be appropriate in the “Early Planning” phase, but would be less appropriate if a decision or final management plan is already before the California Fish and Game Commission for approval.
              <br/><br/>NOTE: although marine resource management has been ongoing for decades in some cases, this DST is designed to assist in selecting engagement strategies to support a specific marine resource management effort (e.g., developing a new FMP, sharing information about a new Departmental policy or regulation). When you are considering the timing, consider it for this specific effort as opposed to  previous, ongoing, or related engagement events.

              <br/><br/><b>Identify the management phase that most closely aligns to the stage in which you will implement your engagement strategy:</b>

            </div>

            <RadioButtonGroup style={radioGroupStyle} onChange={this._handleOptionChange} name="timing" ref="buttonGroup">
              <RadioButton
                value="early-planning"
                label="Early planning (the decision-making process has not started)"
                id="early-planning"
                style={{marginBottom:16}} />
              <RadioButton
                value="late-planning"
                label="During planning (the decision-making process is underway)"
                id="late-planning"
                style={{marginBottom:16}}/>
              <RadioButton
                value="implementation"
                label="Implementation (a decision has been made and is currently being implemented)"
                id="implementation"
                style={{marginBottom:16}}/>
               <RadioButton
                value="ongoing-engagement"
                label="Ongoing Engagement (stakeholder engagement outside of a specific decision-making process)"
                id="ongoing-engagement"
                style={{marginBottom:16}}/>       
            </RadioButtonGroup>
          <TextField style={notesStyle} onChange={this._handleNotesChange()} 
                 name="notesTextField"
                floatingLabelText="Notes (optional):" defaultValue={this.state.notes}>
          </TextField>
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton onTouchTap={this._handlePrev} label="Back to Goals"/>
          <RaisedButton primary={true} disabled={!this._optionIsChosen()} onTouchTap={this._handleNext} label="Go to Characteristics Overview"/>
        </CardActions>
      </Card>
    );
  },

  _handleNotesChange(event){
    return (function(event) {
      let notes = event.target.value;
      TimelineActions.setNotes(notes); 
    }).bind(this);
  },

  _handleOptionChange(event){
    
    if(event !== undefined && event.target !== undefined){
      let selectedId = event.target.id;
      TimelineActions.setTimeliness(selectedId);
      this.setState(this.calculateState());
    } else {
      //on load, default selected isn't selecting default correctly. setting it here.
      let selid = this._getSelectedTiming();
      if(selid){
        this.refs.buttonGroup.setSelectedValue(selid);  
      }
      
    }

  },

  componentWillMount() {
  },

  _getSelectedTiming(){
    let chosen = [];
    let timings = TimelineStore.getAll()
    for(let item of timings){
      if(item.chosen){
        return item.id;
      }
    }
    return undefined;
  },


  _optionIsChosen(){
    let timing = this._getSelectedTiming();
    if(timing){
      return (timing !== undefined);
    } else {
      return false;
    }
  },

  _handleNext() {
    this.props.history.push(...this.props.location, "/char_overview");
  },

  _handlePrev() {
    this.props.history.push(...this.props.location, "/goals/empower");
  },

  routerWillLeave() {
    //let selectedId = this.refs.buttonGroup.getSelectedValue();
    //TimelineActions.setTimeliness(selectedId);
    return true;

  },
});

export default Timeline;
