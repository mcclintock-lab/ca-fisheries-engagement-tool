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

const Step3 = React.createClass({
  mixins: [Lifecycle],

  getInitialState() {
    return {
    };
  },



  componentDidMount() {
    
  },

  componentWillUnmount() {
    
  },

  _onChange() {
    
    
  },

  render() {
    return (
      <Card initiallyExpanded={true}>
        <CardTitle
          title= "Making Decisions and Creating Reports"
          avatar={<div />} />
        <CardText expandable={true} style={{textAlign: 'left', marginLeft: 25}}>
          <div>
            <i>Step 3, making decisions and creating reports, will be part of the next phase of development.</i>
          </div>

        </CardText>
        <CardActions expandable={true}>
          <RaisedButton onTouchTap={this._handlePrev} label="Back to Results"/>
        </CardActions>
      </Card>
    );
  },




  componentWillMount() {
    _checkboxes = [];
  },


  getSettings() {

  },

  _handlePrev() {
    this.props.history.push(...this.props.location, "/results");

  },


  routerWillLeave() {

    return true;

  },
});

export default Step3;
