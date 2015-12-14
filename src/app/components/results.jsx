import React from 'react';
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');
const Avatar = require('material-ui/lib/avatar');
const Paper = require('material-ui/lib/paper');
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import Colors from 'material-ui/lib/styles/colors';
import RaisedButton from 'material-ui/lib/raised-button';

import GoalStore from '../stores/goals';
import TimelineStore from '../stores/timeline';
import CharacteristicStore from '../stores/characteristics';
import {knuthShuffle} from 'knuth-shuffle';
import WorkflowActions from '../actions/workflowActions';

let size = 18;

let avatarStyle = {
  height: size - 2,
  width: size - 2,
  lineHeight: size + 'px',
  fontSize: size / 2 + 6,
  top: 4,
  color: 'white',
  backgroundColor:Colors.cyan500
};


const Results = React.createClass({


  calculateRecommendedMethods() {
    // Each data structure has a property with user-input
    // for goals, it's goal.priority
    let goals = GoalStore.getAll();
    // for timeliness, it's time.chosen
    let timeliness = TimelineStore.getAll();
    // for fishery characteristics, it's char.answer
    let characteristics = CharacteristicStore.getAll();

    // rankings are pulled in as an array of objects representing each row
    let rankings = require('../data/rankings.csv');
    
    // Here all are the methods, processed from the input markdown files.
    let methods = require('../methods');

    // Chad's dumb random shuffle and pick 4 method
    let keys = knuthShuffle(Object.keys(methods)).slice(0, 4);
    return keys.map(function(key) { return methods[key]});
  },

  calculateState() {
    return {
      goals: GoalStore.getAll(),
      timeliness: TimelineStore.getAll(),
      characteristics: CharacteristicStore.getAll(),
      recommendations: this.calculateRecommendedMethods()
    }
  },

  getInitialState() {
    return this.calculateState();
  },

  render() {
    return (
      <Tabs>
        <Tab label="Recommendations" >
          <Card>
            <CardText>
              These stakeholder engagement methods are recommended based on your responses. Click or tap on methods to see further description including required resources and evaluation criteria.
            </CardText>
            
              {this.state.recommendations.map(function(rec) {
                return (
                  <Card key={rec.heading} initiallyExpanded={false}>
                    <CardTitle title={rec.heading} actAsExpander={true}
    showExpandableButton={true}/>
                    <CardText expandable={true} dangerouslySetInnerHTML={{__html: rec.text}} />
                  </Card>
                )
              })}
              <CardActions style={{textAlign:'center'}}>
                <CardText style={{textAlign:'left'}}>You can save these results by expanding the questions above and using your browser to print this page. You can also save and share a bookmark to these results or take the survey again.</CardText>
                <RaisedButton onTouchTap={this._handleTakeAgain} label="Take Survey Again" />
                <RaisedButton onTouchTap={this._handleBookmark} label="Copy a link to these results" />
              </CardActions>
          </Card>
        </Tab>
        <Tab label="Your Answers" >
          <Paper>
          <List subheader="Goals">
            {this.state.goals.map(function(goal) {
              return (
                <ListItem onTouchTap={this._handleGoalTap(goal)} key={goal.id} primaryText={goal.header} rightIcon={<Avatar style={avatarStyle}>{goal.priority || "1"}</Avatar>} />
              )
            }, this)}
          </List>
          <ListDivider />
          <List subheader="Timeliness">
            {this.state.timeliness.map(function(timeline) {
              return (
                <ListItem onTouchTap={this._handleTimeTap(timeline)} key={timeline.id} primaryText={timeline.heading} rightIcon={timeline.chosen ? <Avatar style={avatarStyle}>✓</Avatar> : null} />
              )
            }, this)}
          </List>
          <ListDivider />
          <List subheader="Fishery Characteristics">
            {this.state.characteristics.map(function(characteristic) {
              return (
                <ListItem onTouchTap={this._handleCharTap(characteristic)} key={characteristic.id} primaryText={characteristic.heading} rightIcon={<Avatar style={avatarStyle}>{characteristic.answer || "0"}</Avatar>} />
              )
            }, this)}
          </List>
          <ListDivider />
          </Paper>

        </Tab>
      </Tabs>
    );
  },

  _handleTakeAgain() {
    window.location = "/intro";
  },

  _handleBookmark() {
    WorkflowActions.serializeResultsToUrl(this.props.history, this.props.location);
    alert("Copy the updated link from your browser location bar");
  },

  _handleGoalTap(item) {
    return (function() {
      this.props.history.push(...this.props.location, {pathname: "/goals/" + item.id});
    }).bind(this);
  },

  _handleTimeTap(item) {
    return (function() {
      this.props.history.push(...this.props.location, {pathname: "/timeline"});
    }).bind(this);
  },

  _handleCharTap(item) {
    return (function() {
      this.props.history.push(...this.props.location, {pathname: "/characteristics/" + item.id});
    }).bind(this);
  },

});

module.exports = Results;