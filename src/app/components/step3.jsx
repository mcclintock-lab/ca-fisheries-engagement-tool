import React from 'react';
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');
const Avatar = require('material-ui/lib/avatar');
const Paper = require('material-ui/lib/paper');
const clone = require('clone');
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import Colors from 'material-ui/lib/styles/colors';
import RaisedButton from 'material-ui/lib/raised-button';
import SelectField from 'material-ui/lib/select-field';


import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import GoalStore from '../stores/goals';
import TimelineStore from '../stores/timeline';
import CharacteristicStore from '../stores/characteristics';
import {knuthShuffle} from 'knuth-shuffle';
import WorkflowActions from '../actions/workflowActions';
import MethodStore from '../stores/methods';

let size = 18;
const goal_text_values = {1:"Not a Priority", 2: "Somewhat of a Priority", 3: "High Priority"};
const characteristic_text_values = {0:"Unknown", 1: "No", 2: "Yes"};
const goal_color_values = {1: "#ffcdd2", 2: "#FFECB3", 3: "#80CBC4"};

let avatarStyle = {
  height: size - 2,
  width: size - 2,
  lineHeight: size + 'px',
  fontSize: size / 2 + 6,
  top: 4,
  color: 'white',
  backgroundColor:Colors.cyan500
};


const Step3 = React.createClass({
  
  calculateRecommendedMethods() {
    let methods = MethodStore.getSelectedMethods();
    console.log('recomended methods ????', methods);
    return methods;
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
    let state = this.calculateState();
    state.numRecsToView = 10;
    return state;
  },
  render() {
    return (
      <Tabs>
        <Tab label="Selected Stakeholder Engagement Strategies" >
          <Card>
            <CardText>
              <p>
                These are the stakeholder engagement strategies that you selected:
              </p>
            
            </CardText>
              {this.state.recommendations.map(function(rec) {
                return (
                  <Card key={rec.heading} initiallyExpanded={false}>
                  
                    <CardTitle title={rec.heading} subtitle={"Score: "+rec.normalized_final_score}/>

                    <CardText expandable={false}>
                      <div style={{paddingLeft:"10px", paddingRight:"10px"}}>
                        <em >
                          The following table shows how you prioritized each engagement goals and how experts ranked this strategy's efficacy in achieving that goal. Highlighted rows are goals that are a priority for you and are effectively achieved with this engagement strategy, as ranked by experts.
                        </em>
               
                      </div>
                      <Table >
                      <TableHeader displaySelectAll={false} adjustForCheckbox={false}> 
                        <TableRow >
                          <TableHeaderColumn style={{padding:"12px",width:"26%", wordWrap:'break-word', whiteSpace:'normal'}} tooltip='Highlighted goals received the maximum score'>Goal</TableHeaderColumn>
                          <TableHeaderColumn style={{padding:"12px",width:"17%", wordWrap:'break-word', whiteSpace:'normal'}} tooltip='The ranking you selected'>Your Priority</TableHeaderColumn>
                          <TableHeaderColumn  style={{padding:"12px",width:"17%", wordWrap:'break-word', whiteSpace:'normal'}} tooltip='Effectiveness of tech method for the goal, as rated by experts'>Expert Rating</TableHeaderColumn>
                          <TableHeaderColumn  style={{padding:"12px",width:"40%", wordWrap:'break-word', whiteSpace:'normal'}} tooltip='Rationale for Ranking'>Expert Rationale</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody style={{padding:"8px"}} displayRowCheckbox={false}>
                        {rec.goal_scores.map(function(goal) {
                          return (
                            <TableRow tooltip={goal.ttip}  style={{backgroundColor: goal.is_max ? "#C0D9AF" : "white"}}>
                              <TableRowColumn style={{padding:"12px",width: "26%", wordWrap:'break-word', whiteSpace:'normal'}}>
                                {goal.name}
                              </TableRowColumn>
                              <TableRowColumn style={{padding:"12px",width:"16%",wordWrap:'break-word', whiteSpace:'normal'}}>
                                {goal.user_score_text}
                              </TableRowColumn>
                              <TableRowColumn style={{padding:"12px", width:"18%", wordWrap:'break-word', whiteSpace:'normal'}}>
                                {goal.expert_score_text}
                              </TableRowColumn>
                              <TableRowColumn style={{padding:"12px",width:"40%", wordWrap:'break-word', whiteSpace:'normal'}}>
                                {goal.expert_rationale}
                              </TableRowColumn>
                            </TableRow>
                          )
                        }, this)}
                        </TableBody>
                      </Table>
                      <div dangerouslySetInnerHTML={{__html: rec.text}}>
                      </div>
                    </CardText>

                  </Card>
                )
              })}
              <CardActions style={{textAlign:'center'}}>
                <RaisedButton onTouchTap={this._handleStep2} label="Return to Step 2" />
                <RaisedButton onTouchTap={this._handleTakeAgain} label="Retake Survey" />
              </CardActions>
          </Card>
        </Tab>
      </Tabs>
    );
  },
  _getGoalText(val){
    
    return goal_text_values[val];
  },
  _getGoalColor(val){
    return goal_color_values[val];
  },

  _getCharacteristicText(val){
    return characteristic_text_values[val]
  },
  _getAvatarStyle(val){
    let height = 18;
    let color_val = goal_color_values[val];
    let avatarStyle = {
      height: size - 2,
      width: 42,
      lineHeight: size + 'px',
      fontSize: size / 2 ,
      top: 4,
      color: 'black',
      backgroundColor:'white',
      highlightColor:Colors.green500
    };
    return avatarStyle;
  },
  _handleSelectValueChange: function(e) {
    this.state.numRecsToView = e.target.value;
    this.setState({
        numRecsToView: e.target.value,
        recommendations: this.calculateRecommendedMethods()
    });
  },


   _handleStep2(){
    console.log("going to step 2!!!");
    this.props.history.push(...this.props.location, "/results");
   },

  _handleTakeAgain() {
    window.location = "/";
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

module.exports = Step3;