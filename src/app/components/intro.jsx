import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { Router, Route, Link } from 'react-router';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
const CardActions = require('material-ui/lib/card/card-actions');

const containerStyle = {
};

const Intro = React.createClass({

  getInitialState() {
    return {
    };
  },

  componentWillMount() {
  },

  _handleTouchTap() {
    this.props.history.push(...this.props.location, "/goals/build-trust");
  },


  render() {
    return (
      <div>
        <CardTitle
          title="California Fisheries Stakeholder Engagement Tool"
          avatar={<div />} />
        <CardText expandable={true}>
        This app will help you determine what methods of stakeholder engagement will be most effective for your process after answer a series of questions about your circumstances.
        </CardText>
        <CardActions>
        <RaisedButton label="Let's get started" primary={true} onTouchTap={this._handleTouchTap} />
        </CardActions>
      </div>
    );
  },
});

export default Intro;
