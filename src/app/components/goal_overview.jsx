import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { Router, Route, Link } from 'react-router';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
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
            <em>Note that you may select multiple goals as your priorities!</em>
          </hX>
            <ol>
              <li>Building trust between fisheries stakeholders and fisheries managers</li>
              <li>Efficient engagement (due to tight time constraints in your process/decision)</li>
              <li>Educating stakeholders on how to participate in the process</li>
              <li>Engaging with under represented groups, particularly when they are affected by management of a specific fishery </li>
              <li>Building relationships with key communicators who are well respected in their fishery and/or are able to easily reach out to fisheries users</li>
              <li>Conducting social or biological research in the fishery</li>
              <li>Informing stakeholders about the process or decision</li>
              <li>Soliciting input from stakeholders directly</li>
              <li>Involving stakeholders in the decision-making process</li>
              <li>Collaborating with stakeholders in the development of a new program or regulation</li>
            </ol>
            <p style={{textAlign:"center", marginLeft:"8%", marginRight:"8%"}}>One additional goal is empowering stakeholders to manage the fishery- either directly alone or in partnership with fisheries managers. Two tools for achieving this goal include co-management regimes and collaborative fisheries research. </p>
        </div>
        </CardText>
        <CardActions>
        <RaisedButton label="Back to Fishery Description" onTouchTap={this._handlePrev} />
        <RaisedButton label="Go to Goals" primary={true} onTouchTap={this._handleNext} />
        </CardActions>
      </div>
    );
  },
});

export default GoalOverview;
