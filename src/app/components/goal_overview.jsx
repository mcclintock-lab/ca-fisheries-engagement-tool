import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { Router, Route, Link } from 'react-router';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import WorkflowActions from '../actions/workflowActions';

const CardActions = require('material-ui/lib/card/card-actions');

const containerStyle = {
};
const textStyle = {
  textAlign: 'left'
};
const GoalOverview = React.createClass({

  getInitialState() {
    return {
    };
  },

  componentWillMount() {
  },

  _handlePrev() {
    this.props.history.push(...this.props.location, "/fishery_description");
  },

  _handleNext() {
    this.props.history.push(...this.props.location, "/goals/build-trust");
  },
  _isComplete(){
    return WorkflowActions.isComplete();
  },
  _goToStep2(event){
    if(event){
      WorkflowActions.goToStep2();
    }
  },

  render() {
    return (
      <div>
        <CardTitle
          title="Stakeholder Engagement Goals" 
          avatar={<div />} />
        <CardText expandable={true}>
        <div style={textStyle}>
          <hX>
            Selecting the appropriate stakeholder engagement strategy depends on the engagement goals you are trying to achieve. 
            Over the next several pages, you will be asked to provide input on how important the following goals are to your process/decision.
            <em> Note that you may select multiple goals as your priorities!</em>
          </hX>
            <ol>
              <li>Building trust between resource stakeholders and resource managers</li>
              <li>Efficient engagement (due to tight time constraints in your process/decision)</li>
              <li>Educating stakeholders on how to participate in the process</li>
              <li>Engaging with under represented groups, particularly when they are affected by management of a specific resource </li>
              <li>Building relationships with key communicators who are well respected in their resource and/or are able to easily reach out to resource users</li>
              <li>Conducting social or biological research in the resource</li>
              <li>Informing stakeholders about the process or decision</li>
              <li>Soliciting input from stakeholders directly</li>
              <li>Involving stakeholders in the decision-making process</li>
              <li>Collaborating with stakeholders in the development of a new program or regulation</li>
            </ol>
            <p style={{textAlign:"center", marginLeft:"8%", marginRight:"8%"}}>One additional goal is empowering stakeholders to manage the resource- either directly alone or in partnership with resource managers. Two tools for achieving this goal include co-management regimes and collaborative fisheries research. </p>
        </div>
        </CardText>
        <CardActions>
        <RaisedButton label="Back to Overview" onTouchTap={this._handlePrev} />
        <RaisedButton label="Go to Goals" primary={true} onTouchTap={this._handleNext} />
                  <RaisedButton secondary={true} style={this._isComplete() ? {display:'inline-block'} : {display:'none'}} onTouchTap={this._goToStep2} label="Go to Step 2 (Results)" disabled={!this._isComplete()}/></CardActions>
      </div>
    );
  },
});

export default GoalOverview;
