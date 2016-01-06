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
  _optionIsChosen: false,
  mixins: [Lifecycle],
  hasValueSet: false,

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
        <CardHeader

          title="Timeliness"
          subtitle="What stages of the process are you planning for?"
          avatar={<div />} />
        <CardText expandable={true} style={{textAlign: 'left', marginLeft: 25}}>
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
          <RaisedButton onTouchTap={this._handlePrev} label="Previous Step"/>
          <RaisedButton disabled={!this._optionIsChosen} onTouchTap={this._handleNext} label="Next Step"/>
        </CardActions>
      </Card>
    );
  },

  _handleOptionChange(){
    let hasOptions = this._hasCheckedOptions()
    if(hasOptions){
      this._optionIsChosen = hasOptions;
      
    } else {
      this._optionIsChosen = false;
    }
    this.setState(this.calculateState());
  },

  _hasCheckedOptions(){
    let isChecked = false;
    for (let checkbox of _checkboxes) {
      if(checkbox){
        if(checkbox.isChecked()){
          isChecked = true;
        }
      }
    }
    return isChecked;
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
    WorkflowActions.nextStep(this.props.location, this.props.history);
  },

  _handlePrev() {
    WorkflowActions.prevStep(this.props.location, this.props.history);
  },

  routerWillLeave() {

    TimelineActions.setTimeliness(this.getSettings());
    return true;

  },
});

export default Timeline;
