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
    let scores = require('../data/rankings.csv');
    //let goalLookups = require('../data/goal_lookups.csv')
    //let charLookups = require('../data/char_lookups.csv')
    
    // Here all are the methods, processed from the input markdown files.
    let methods = require('../methods');

    // Chad's dumb random shuffle and pick 4 method
    
    
    for(let goal of goals){
      //console.log("goal: ", goal);
    }

    for(let t of timeliness){
      //console.log("timeliness: ", t);
    }

    for(let s of scores){
      //console.log("score: ", s);
    }

   
    //for each id in the ranking
    //find goal priority using id
    //find lookup val from goalLookups using goal.priority and ranking[id]
    //set new score field to lookup val


    for(let tech_method of scores){
      console.log("============== method id: ", tech_method['ID (do not change)']);
      for(let goal of goals){
        //console.log("method: ", tech_method)
        let expert_score = tech_method[goal.id];
        let user_score = goal.priority;
        //switch with lookup
        let final_score = expert_score*user_score;
        //console.log("score: ", final_score);
        //for each id in the ranking
        //for each timeliness id
        //if timeliness.id == "Yes" and ranking[timeless.chosen] == "true" then keep score field
        //else replace score field with 0
        tech_method[goal.id] = 0;
        for(let time of timeliness){
          //console.log("time id: ", time);
          let techtime = tech_method[time.id];
          //console.log("score time id: ", techtime);
          if((techtime === "Yes") && (time.chosen === true)){
            //console.log("goal name: ", tech_method[goal.id]);
            //console.log("setting final score to ", final_score);
            tech_method[goal.id] = tech_method[goal.id]+final_score;
          } 
        }
      }
    }

    //sum up goal scores per technology
    for(let tech_method of scores){
      let method_total = 0;
      for(let goal of goals){
        let tmscore = tech_method[goal.id];
        method_total = method_total+tmscore;
      }
      tech_method.sum_score = method_total;
    }

    //for all characteristics, per technology
    //sum score of characteristic, keeping track of all nums where answer != 2
    //normalize the score
    for(let tech_method of scores){
      let tech_method_score = 0;
      let norm_count = 0;
      for(let fish_char of characteristics){
        let fcid = fish_char.id;
        let user_char = tech_method[fcid];
        if(user_char !== 2){
          norm_count+=1;
        }

        let expert_char = fish_char.answer;
        //replace this with lookup
        let char_score = user_char*expert_char;
        tech_method_score = tech_method_score + char_score
      }
      //console.log("tech method score: ", tech_method_score);
      //console.log("norm count: ", norm_count);

      let normalized_score = tech_method_score/norm_count;
      tech_method.fishery_score = tech_method_score;
      tech_method.normalized_score = normalized_score;
    }

    
    //for each technology,
    //multiply normalized characteristic score by summed goal scores per technology
    for(let tech_method of scores){
      tech_method.final_score = tech_method.normalized_score*tech_method.sum_score;
    }
    let score_values = scores.map(function(key) {return Number(key.final_score);});

    //calculate the max score for normalization
    let max_score = this.getMaxOfArray(score_values);

    for(let score_val of scores){
      let fscore = score_val.final_score;
      if(fscore <= 0){
        fscore = 0.0;
      }
      score_val.normalized_final_score = (fscore/max_score)*100;
    }

    //sort, and return top 10 for now
    scores.sort(function(a, b){
      return a.normalized_final_score === b.normalized_final_score ? 0 : +(b.normalized_final_score > a.normalized_final_score) || -1;
    });
    

    let top_scores = scores.slice(0, 10);

    //get the methods and set final score
    let final_methods = []
    for(let score of top_scores){
      let theid = score['ID (do not change)'];
      let method = methods[theid];
      method.normalized_final_score = Math.round(score.normalized_final_score);
      final_methods.push(method);
    }

    return final_methods;

  },

  getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
  },
  getGoalLookup(){
    return {

    }
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
                    <CardTitle title={rec.heading} subtitle={"Score: "+rec.normalized_final_score} actAsExpander={true}
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

module.exports = Results;