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
import Menu from 'material-ui/lib/menu/menu';
import MenuItem from 'material-ui/lib/menu/menu-item';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import Popover from 'material-ui/lib/popover/popover'

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
import CharacteristicStore from '../stores/characteristics';

import {Component} from 'react';
import {Container} from 'flux/utils';
import { Lifecycle, RouteContext } from 'react-router';
import reactMixin from 'react-mixin';


const containerStyle = {
  textAlign: 'center',
  paddingTop: 20,
};

const cardStyle = {
  minWidth: 300,
  margin: '0 auto',
  maxWidth: '800'
};

const principlesCardStyle = {
  minWidth: 300,
  margin: '0 auto',
  maxWidth: '1000'
};

const standardActions = [
  {
    text: 'Okay',
  },
];

const stepListStyle = {
  width: '33%',
  float: 'left'
};

const menuStyle = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

const selSize = 41;
const deselSize = 36;
let selAvatarStyle = {
  height: selSize - 2,
  width: selSize - 2,
  lineHeight: selSize-2 + 'px',
  fontSize: selSize / 2 + 6,
  top:8,
  color: 'white',
  backgroundColor:Colors.green500

};

let deselAvatarStyle = {
  height: deselSize - 2,
  width: deselSize - 2,
  lineHeight: deselSize + 'px',
  fontSize: deselSize / 2 + 6,
  color: Colors.grey300,
  top: 11,
  backgroundColor:Colors.grey500
};


const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [RouteContext],

  calculateState() {
    let alltabs = {
      goals:{
        id: "Goals",
        values: GoalStore.getAll()
      },
      timing: { 
        id: "Timing",
        values: []
      },
      characteristics:{ 
        id: "Characteristics",
        values: CharacteristicStore.getAllSettable()
      }
    };

    return {
      activeGoal: GoalStore.getActiveGoal(),
      alltabs: alltabs,
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      goalsOpen: false,
      open: false
    };
  },

  getInitialState() {
    let state = this.calculateState();
    console.log('state: ', state);
    return state;
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


  calculateProgress() {
    let path = this.props.location.pathname;
    let all = GoalStore.getAll();
    if (path.indexOf('intro') !== -1) {
      return 0;
    } else if(path.indexOf('fishery_description') !== -1){
      return 1;
    } else if (path.indexOf('goal_overview') !== -1){
      return 2;
    } else if (path.indexOf('goals') !== -1) {
      let activeGoal = GoalStore.getActiveGoal();
      let fraction = all.indexOf(activeGoal) / all.length;
      return (33 * fraction) + 2;
    } else if (path.indexOf('timeline') !== -1) {
      return 45;
    } else {
      let active = CharacteristicStore.getActive();
      let all = CharacteristicStore.getAllSettable();
      let fraction = all.indexOf(active) / all.length;
      return (30 * fraction) + 70;
    }
  },

  _goalsTouch(event){
    event.preventDefault();
    console.log('event: ', event.currentTarget);
    return (function() {
      this.setState({
        goalsOpen:true,
        charAnchorEl: event.currentTarget,
      });
    }).bind(this, event);  
  },

  _timingTouch(){
    return (function() {
      console.log("timing!!")
    }).bind(this);  
  },

  _characteristicsTouch(event){
    event.preventDefault();
    
    let target = event.currentTarget;
    console.log("targ: ", target);
    this.setState({
        charAnchorEl: target,
        open:true
    });


    
  },

  _handleGoalsClose(){
    return (function() {
      this.setState({goalsOpen:false});
    }).bind(this);  
  },

  _handleCharacteristicsClose(){
    return (function() {
      this.setState({open:false});
    }).bind(this);  
  },

  _getCharacteristicMenuItems(){
    let mis = [];
    let chars = CharacteristicStore.getAllSettable();
    let i=0;
    for(let char of chars){

      let mi = <MenuItem value={"foobar"} style={{width:'120px'}} primaryText={"charsssssss"} index={i} key={i}>{"beep"}</MenuItem>
      mis.push(mi);
      i+=1;
    }
    console.log("mis", mis);
    return mis;
  },

  render() {

    let isGoals = this.props.location.pathname.indexOf('goals') !== -1;
    let isTimeline = this.props.location.pathname.indexOf('timeline') !== -1;
    let isCharacteristics = this.props.location.pathname.indexOf('characteristics') !== -1;
    let isIntro = this.props.location.pathname.indexOf('intro') !== -1;
    let isResults = this.props.location.pathname.indexOf('results') !== -1;
    let isPrinciples = this.props.location.pathname.indexOf('principles') !== -1;
    let isGoalsOverview = this.props.location.pathname.indexOf('goal_overview') !== -1;
    let isCharOverview = this.props.location.pathname.indexOf('char_overview') !== -1;
    let isStep3 = this.props.location.pathname.indexOf('step3') !== -1;
    let tabs = Object.keys(this.state.alltabs);
    let menu_items = [<MenuItem primaryText={"blarp"}>"blarp"</MenuItem>]
    console.log("rendering!!!!!");
    let headerContent = (
      <div>
        <h3 style={{width:'100%'}, {marginTop:"0px"},{textAlign:"center"}}>Step 1 (Quantitative)</h3>

        <List className="navHeader">
          <ListItem style={stepListStyle} leftAvatar={<Avatar style={(isGoals || isGoalsOverview) ? selAvatarStyle : deselAvatarStyle}>A</Avatar>}>Goals</ListItem>  

          <ListItem style={stepListStyle} leftAvatar={<Avatar style={isTimeline ? selAvatarStyle : deselAvatarStyle}>B</Avatar>}>Timing</ListItem>  
          <ListItem style={stepListStyle} leftAvatar={<Avatar style={(isCharacteristics || isCharOverview) ? selAvatarStyle : deselAvatarStyle}>C</Avatar>}>Characteristics</ListItem>  
        </List>

        <LinearProgress mode="determinate" color={"#4CAF50"} value={this.calculateProgress()} />
      </div>
    );

    let resultsHeaderContent = (
      <div>
        <h3 style={{width:'100%'}, {marginTop:"0px"},{textAlign:"center"}}>{isResults ? 'Step 2 (Qualitative)' : 'Step 3 (Decision)'}</h3>

      </div>
    );

    return (
      <div style={containerStyle}>
        <Card style={ isPrinciples ? principlesCardStyle: cardStyle}>
          {(isResults || isStep3) ? resultsHeaderContent : (isIntro || isPrinciples || isStep3) ? null : headerContent}  
          {this.props.children}
        </Card>
      </div>
    );
  }
});

// reactMixin(Main.prototype, RouteContext);

export default Main;
