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
                label={item.heading}/>
            )
          })}
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton onTouchTap={this._handleNext} label="Next Step" />
        </CardActions>
      </Card>
    );
  },

  componentWillMount() {
    _checkboxes = [];
  },

  getSettings() {
    let settings = {};
    for (let checkbox of _checkboxes) {
      settings[checkbox.props.name] = checkbox.isChecked();
    }
    return settings;
  },

  _handleNext() {
    WorkflowActions.nextStep(this.props.location, this.props.history);
  },

  routerWillLeave() {
    let settings = this.getSettings();
    let any = false;
    for (let key in settings) {
      any = any || settings[key];
    }
    if (!any) {
      window.alert("You must choose at least one stage");
      return false
    } else {
      TimelineActions.setTimeliness(settings);
      return true;
    }
  },
});

export default Timeline;
