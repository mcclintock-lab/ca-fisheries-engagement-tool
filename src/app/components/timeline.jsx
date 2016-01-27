import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
const Checkbox = require('material-ui/lib/checkbox');
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

let _checkboxes = [];

const Timeline = React.createClass({
  mixins: [Lifecycle],

  getInitialState() {
    
    
    return this.calculateState();
  },

  calculateState() {
    return {
      items: TimelineStore.getAll()
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
        <CardText expandable={true} style={{textAlign: 'left', marginLeft: 25}}>
          <div>
            Selecting the appropriate stakeholder engagement strategies also depends on the timing of the anticipated engagement in your management process. For example, establishing an Advisory Group with defined membership and a direct role in the decision-making process may be appropriate in the “Early Planning” phase, but would be less appropriate if a decision or final management plan is already before the California Fish and Game Commission for approval. 
          </div>
          <br/>
          <h4>
            Identify the management phase that most closely aligns to the stage in which you will implement your engagement strategy:
          </h4>
          {this.state.items.map(function(item) {
            return (
              <Checkbox
                ref={(function(checkbox) {this.push(checkbox);}).bind(_checkboxes)}
                key={item.id}
                name={item.id}
                value={item.id}
                defaultChecked={item.chosen}
                onCheck={this._handleOptionChange}
                label={item.heading}/>
            )
          }, this)}
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton onTouchTap={this._handlePrev} label="Back to Goals"/>
          <RaisedButton primary={true} disabled={!this._optionIsChosen} onTouchTap={this._handleNext} label="Go to Characteristics Overview"/>
        </CardActions>
      </Card>
    );
  },

  _handleOptionChange(){
    let hasOptions = this._hasCheckedOptions();
    if(hasOptions){
      this._optionIsChosen = hasOptions;
      
    } else {
      this._optionIsChosen = false;
    }
    this.setState(this.calculateState());
  },

  _hasCheckedOptions(){
    let isChecked = false;
    if (_checkboxes ){
      for (let checkbox of _checkboxes) {
        if(checkbox !== undefined && checkbox !== null){
          if(checkbox.isChecked()){
            isChecked = true;
          }
        }
      }
      return isChecked;
    } else {
      return false;
    }
  },

  componentWillMount() {
    _checkboxes = [];
  },


  getSettings() {
    let settings = {};
    for (let checkbox of _checkboxes) {
      if(checkbox){
        settings[checkbox.props.name] = checkbox.isChecked();
      }
    }
    return settings;
  },

  _handleNext() {
    this.props.history.push(...this.props.location, "/char_overview");
  },

  _handlePrev() {
    this.props.history.push(...this.props.location, "/goals/empower");
  },

  routerWillLeave() {

    TimelineActions.setTimeliness(this.getSettings());
    return true;

  },
});

export default Timeline;
