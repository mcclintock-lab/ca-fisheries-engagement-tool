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

const containerStyle = {
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
          {this.props.description}
          <RadioButtonGroup style={radioGroupStyle} name="ranking" ref="buttonGroup" defaultSelected={this.props.answer || "0"}>
            <RadioButton
              value="0"
              label="0. Unknown"
              style={{marginBottom:16}} />
            <RadioButton
              value="1"
              label="1. Yes"
              style={{marginBottom:16}}/>
            <RadioButton
              value="2"
              label="2. No"
              style={{marginBottom:16}}/>
          </RadioButtonGroup>
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton onTouchTap={this._handleNextQuestion} label={this.props.index === this.props.questionLength ? "Complete" : "Next Question"}/>
        </CardActions>
      </Card>
    )
  },

  getAnswer() {
    return this.refs.buttonGroup.getSelectedValue();
  },

  _handleNextQuestion() {
    this.props.onNext(this.getAnswer());
  }

})

const Characteristics = React.createClass({

  mixins: [Lifecycle],

  routerWillLeave(a, b) {
    CharacteristicActions.setAnswer(this.refs.form.props.id, this.refs.form.getAnswer());
  },

  calculateState() {
    return {
      characteristics: CharacteristicStore.getAll(),
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


  _handleFormComplete(priority) {
    WorkflowActions.nextStep(this.props.location, this.props.history);
  }

});

export default Characteristics;