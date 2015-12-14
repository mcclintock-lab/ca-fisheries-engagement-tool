/** In this file, we create a React component which incorporates components provided by material-ui */

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
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
const LinearProgress = require('material-ui/lib/linear-progress');
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import GoalStore from '../stores/goals';
import {Component} from 'react';
import {Container} from 'flux/utils';
import { Lifecycle, RouteContext } from 'react-router';
import reactMixin from 'react-mixin';
import CharacteristicStore from '../stores/characteristics';

const containerStyle = {
  textAlign: 'center',
  paddingTop: 20,
};

const cardStyle = {
  minWidth: 300,
  margin: '0 auto',
  maxWidth: '600'
};

const standardActions = [
  {
    text: 'Okay',
  },
];


const stepListStyle = {
  width: '32%',
  float: 'left'
};

const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [RouteContext],

  calculateState() {
    return {
      activeGoal: GoalStore.getActiveGoal(),
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  getInitialState() {
    return this.calculateState();
  },

  componentDidMount() {
    this.storeListener = GoalStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    if (this.storeListener) {
      this.storeListener.remove();
    }
  },

  _onChange() {
    this.setState(this.calculateState());
  },


  // getChildContext() {
  //   return {
  //     muiTheme: this.state.muiTheme,
  //   };
  // }

  componentWillMount() {
    // let newMuiTheme = ThemeManager.modifyRawThemePalette(ThemeManager.getMuiTheme(LightRawTheme), {
    //   accent1Color: Colors.deepOrange500,
    // });

    // this.setState({muiTheme: newMuiTheme});
    if (this.props.location.pathname === "/") {
      this.props.history.push("/intro");
    }
  },

  _handleRequestClose() {
    this.setState({
      open: false,
    });
  },

  _handleTouchTap() {
    this.setState({
      open: true,
    });
  },

  calculateProgress() {
    let path = this.props.location.pathname;
    if (path.indexOf('intro') !== -1) {
      return 0;
    } else if (path.indexOf('goals') !== -1) {
      let activeGoal = GoalStore.getActiveGoal();
      let all = GoalStore.getAll();
      let fraction = all.indexOf(activeGoal) / all.length;
      return (33 * fraction) + 2;
    } else if (path.indexOf('timeline') !== -1) {
      return 45;
    } else {
      let active = CharacteristicStore.getActive();
      let all = CharacteristicStore.getAll();
      let fraction = all.indexOf(active) / all.length;
      return (30 * fraction) + 70;
    }
  },

  render() {

    let isGoals = this.props.location.pathname.indexOf('goals') !== -1;
    let isTimeline = this.props.location.pathname.indexOf('timeline') !== -1;
    let isCharacteristics = this.props.location.pathname.indexOf('characteristics') !== -1;
    let isIntro = this.props.location.pathname.indexOf('intro') !== -1;
    let isResults = this.props.location.pathname.indexOf('results') !== -1;

    let headerContent = (
      <div>
        <List className="navHeader">
          <ListItem style={stepListStyle} leftAvatar={<Avatar backgroundColor={isGoals ? Colors.green500 : Colors.gray500}>1</Avatar>}>Goals</ListItem>  
          <ListItem style={stepListStyle} leftAvatar={<Avatar backgroundColor={isTimeline ? Colors.green500 : Colors.gray500}>2</Avatar>}>Timeline</ListItem>  
          <ListItem style={stepListStyle} leftAvatar={<Avatar backgroundColor={isCharacteristics ? Colors.green500 : Colors.gray500}>3</Avatar>}>Fishery</ListItem>  
        </List>
        
        <LinearProgress mode="determinate" color={"#4CAF50"} value={this.calculateProgress()} />
      </div>
    );


    return (
      <div style={containerStyle}>
        <Card style={cardStyle}>
          {isIntro || isResults ? null : headerContent}  
          {this.props.children}
        </Card>
      </div>
    );
  }
});

// reactMixin(Main.prototype, RouteContext);

export default Main;
