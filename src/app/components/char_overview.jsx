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
const CharOverview = React.createClass({

  getInitialState() {
    return {
    };
  },

  componentWillMount() {
  },

  _handlePrev() {
    this.props.history.push(...this.props.location, "/timeline");
  },

  _handleNext() {
    this.props.history.push(...this.props.location, "/characteristics/undefined-community");
  },


  render() {
    return (
      <div>
        <CardTitle
          title="Stakeholder Characteristics"
          avatar={<div />} />
        <CardText expandable={true}>
        <div style={textStyle}>
          <p>
            It is also important to identify key characteristics of the fishery stakeholders with whom you will be engaging. 
            These characteristics may vary widely depending on the fishery in question; for example, 
            selecting a stakeholder strategy that works for the commercial salmon fishery may not work for recreational spearfishers. 
            In the following pages, you will identify characteristics that appropriately describe your target fishery stakeholders.
            <br/><br/>Note that you may select “yes” for two seemingly contradictory characteristics (i.e., there may be an instance in your fishery where some members of the stakeholder community have a high degree of technological literacy while others rarely use technology- In this case you would select “yes” to both “high level of technological literacy” AND “low level of technological literacy”). 
          </p>
          <hX>The stakeholder characteristics are as follows:</hX>
          <ol>
            <li>Undefined Stakeholder Community</li>
            <li>Linguistic Diversity</li>
            <li>Organized Institutions Exist within the Fishery </li>
            <li>High Capacity for Engagement</li>
            <li>Low Capacity for Engagement</li>
            <li>High Level of Technological Literacy</li>
            <li>Low Level of Technological Literacy</li>
            <li>Large Geographic Size</li>
            <li>Small Geographic Size</li>
            <li>Existing Leaders within the Fishery</li>
            <li>No Existing Leaders within the Fishery</li>
            <li>Recent Engagement with Resource Managers</li>
          </ol>
        </div>
        </CardText>
        <CardActions>
        <RaisedButton label="Back to Timing" onTouchTap={this._handlePrev} />
        <RaisedButton label="Go to Characteristics" primary={true} onTouchTap={this._handleNext} />
        </CardActions>
      </div>
    );
  },
});

export default CharOverview;
