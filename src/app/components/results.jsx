import React from 'react';
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');
const Avatar = require('material-ui/lib/avatar');
const Paper = require('material-ui/lib/paper');
const clone = require('clone');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
const RadioButton = require('material-ui/lib/radio-button');

import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import Colors from 'material-ui/lib/styles/colors';
import RaisedButton from 'material-ui/lib/raised-button';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';
import {GridList, GridTile} from 'material-ui/lib/grid-list';
import Badge from 'material-ui/lib/badge';

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
import MethodStore from '../stores/methods';
import WorkflowActions from '../actions/workflowActions';
import MethodActions from '../actions/methodActions';
import GoodStrategy from 'material-ui/lib/svg-icons/toggle/star';
import OKStrategy from 'material-ui/lib/svg-icons/toggle/star-half';
import BadStrategy from 'material-ui/lib/svg-icons/toggle/star-border';

let size = 18;
const goal_text_values = {1:"Not a Priority", 2: "Somewhat of a Priority", 3: "High Priority"};
const characteristic_text_values = {0:"Unknown", 1: "No", 2: "Yes", 3: "Both"};
const goal_color_values = {1: "#ffcdd2", 2: "#dfdf74", 3: "#80CBC4"};

let avatarStyle = {
  height: size - 2,
  width: size - 2,
  lineHeight: size + 'px',
  fontSize: size / 2 + 6,
  top: 4,
  color: 'white',
  backgroundColor:Colors.cyan500
};
const noteStyle = {
  color:'lightBlack',
  fontSize:'0.8em',
  paddingLeft:'10px',
  fontStyle:'italic'
};
const gridStyles = {
  nameCol:{
    width:'120px',
    paddingLeft:5,
    paddingTop:0,
    paddingRight:5,
    paddingBottom:0,
    fontSize:'14px',
    whiteSpace:'normal',
    textAlign:'left'
  },

  headerNameCol:{
    width:'120px',
    height:'90px',
    paddingLeft:5,
    paddingTop:0,
    paddingRight:0,
    paddingBottom:2,
    fontSize:'8px',
    verticalAlign:'bottom'
  },

  scoreCol:{
    width:'32px',
    height:'32px',
    textAlign:'center',
    padding:'2px 1px 0px 0px'
  },

  goalHeader:{
    fontSize:'11px',
    padding:'0px 0px 0px 0px',
    textAlign:'left',
    verticalAlign:'middle',
    color:'black',
    width:'32px',
    whiteSpace:'normal',
    lineHeight:'11px',
    transform:'rotate(270deg)',
    height:'80px',
    fontWeight:500
  },

  tooltipStyles: {
    whitespace: 'normal',
    wordWrap: 'break-word',
    width:'80px',
    height:'40px'
  },

  headerRow: {
    width:'100%',
    whiteSpace:'normal'
  },

  footerCell: {
    width:'200px',
    textAlign:'middle',
    paddingLeft:'5px',
    paddingTop:'5px',
    whiteSpace:'normal',
    fontSize:'12px',
    verticalAlign:'top'
  }
};

const Results = React.createClass({
  
  calculateRecommendedMethods() {
    // Each data structure has a property with user-input
    // for goals, it's goal.priority
    let goals = GoalStore.getAll();
    // for timeliness, it's time.chosen
    let timeliness = TimelineStore.getAll();
    // for fishery characteristics, it's char.answer
    let characteristics = CharacteristicStore.getAllWithSpecialCases();

    // rankings are pulled in as an array of objects representing each row
    let rankings = require('../data/rankings.csv');
    let rankings_details = require('../data/rankings_details.csv');
    
    let scores = clone(rankings);
    let ID_STR = 'ID (do not change)';
    // Here all are the methods, processed from the input markdown files.
    let methods = MethodStore.getAll();

    //for each id in the ranking
    //find goal priority using id
    //find lookup val from goalLookups using goal.priority and ranking[id]
    //set new score field to lookup val

    let expert_user_lookup=[[1,1,1],[1,2,3],[1,4,5]];
    let fish_char_lookup = [[0,-1,0],[1,0,0],[1,0,3],[2,0,4]];
    let tech_method_goal_scores = []

    let user_score_dict = {1:"Not a Priority", 2: "Somewhat of a Priority", 3: "High Priority"};
   
    let expert_score_dict = {1:"Not Effective", 2: "Somewhat Effective", 3: "Highly Effective"};
    for(let tech_method of scores){
      for(let goal of goals){

        let expert_score = tech_method[goal.id];
        let user_score = goal.priority;
        let final_score = expert_user_lookup[expert_score-1][user_score-1];

        goal.final_goal_score = final_score;
        let tmid = tech_method[ID_STR];
        let rationale = this.getExpertRationale(rankings_details, tmid, goal.id);

        
        let is_max = (final_score === 5);
        let is_min = (final_score === 1);
        let scores = {"goal_id": goal.id, "ttip":goal.description, "name":goal.header, 
                      "user_score_text": user_score_dict[user_score], "user_score":user_score, 
                      "expert_score_text": expert_score_dict[expert_score],
                      "expert_score":expert_score, "is_max":is_max, "expert_rationale": rationale,
                      "is_min": is_min};
        if(tech_method_goal_scores[tmid] === undefined){
          tech_method_goal_scores[tmid] = [scores];
        } else {
          tech_method_goal_scores[tmid].push(scores);
        }
        
        //for each id in the ranking
        //for each timeliness id
        //if timeliness.id == "Yes" and ranking[timeless.chosen] == "true" then keep score field
        //else replace score field with 0
        tech_method[goal.id] = 0;
        for(let time of timeliness){
          let techtime = tech_method[time.id];
          
          if((techtime === "Yes") && (time.chosen === true)){
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

    let no_value = 1;
    //expert first, then user. expert values are -1,0,1,2
    //this table is a little odd since a '1' for a user is a No, but a '0' is unknown, which means it should be counted
    
    //for all characteristics, per technology
    //sum score of characteristic, keeping track of all nums where answer != 1 (a value for No)
    //normalize the score
    for(let tech_method of scores){
      let tech_method_score = 0;
      let norm_count = 0;
      for(let fish_char of characteristics){
        let fcid = fish_char.id;
        let expert_char = tech_method[fcid];
        let user_char = fish_char.answer;
        if(user_char !== 1){
          norm_count+=1;
        }

        let expert_dex = Number(expert_char)+1;
        let user_dex = Number(user_char);
        let final_char_score = fish_char_lookup[expert_dex][user_dex];
        fish_char.final_characteristics_score = final_char_score;
        tech_method_score = tech_method_score + final_char_score;
      }

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
      if(max_score === 0){
        score_val.normalized_final_score = fscore;
      } else {
        score_val.normalized_final_score = (fscore/max_score)*100;
      }
    }

    //sort, and return top 10 for now
    scores.sort(function(a, b){
      return a.normalized_final_score === b.normalized_final_score ? 0 : +(b.normalized_final_score > a.normalized_final_score) || -1;
    });
    let numRecs = 10;
    if(this.state === null || this.state.numRecsToView === null){
      numRecs = 10;
    } else {
      numRecs = this.state.numRecsToView;
    }

    let top_scores = scores.slice(0, numRecs);


    //get the methods and set final score
    let final_methods = []
    for(let score of top_scores){
      let theid = score['ID (do not change)'];
      
      let method = methods[theid];
      method.normalized_final_score = Math.round(score.normalized_final_score);
      let goal_scores = tech_method_goal_scores[theid]
      goal_scores.sort(function(a,b){
        let a_us = a.user_score;
        let a_ex = a.expert_score;
        let b_us = b.user_score;
        let b_ex = b.expert_score;
        let a_fs = expert_user_lookup[a_ex-1][a_us-1];
        let b_fs = expert_user_lookup[b_ex-1][b_us-1];
        return a_fs === b_fs ? 0 : +(b_fs > a_fs) || -1;
      });
      method.id = theid;
      method.goal_scores = goal_scores;



      let imgs = [, , "", "social-media", ""];
      //gross. get rid of this when you get real images
      if(method.id === "key-communicators"){
        method.img = require('./key-communicators.png');
        method.hasImg = true;
      } else if(method.id === "fishery-association-meetings"){
        method.img = require('./fishery-association-meetings.png');
        method.hasImg = true;
      } else if(method.id === "informal-meetings"){
        method.img = require('./informal-meetings.png');
        method.hasImg = true;
      } else if(method.id === "social-media"){
        method.img = require('./social-media.png');
        method.hasImg = true;
      } else if(method.id === "stakeholder-advisory-groups"){
        method.img = require('./stakeholder-advisory-groups.png');
        method.hasImg = true;
      } else {
        method.hasImg = false;
      }
      final_methods.push(method);
    }
    WorkflowActions.setComplete(true);
    return final_methods;

  },

  getExpertRationale(ranking_details, method_id, goal_id){
    let ID_STR = 'ID (do not change)'
    for (let tech_method of ranking_details){
      let tmid = tech_method[ID_STR]
      if(tmid === method_id){
        let rationale = tech_method[goal_id]
        return rationale
      }
    }
  },

  getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
  },

  calculateState() {
    return {
      goals: GoalStore.getAll(),
      timeliness: TimelineStore.getAll(),
      characteristics:  CharacteristicStore.getAllSettable(),
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
        <Tab label="Recommendations" style={{textAlign:"left", verticalAlign: "middle", paddingLeft:"15px"}}>
          <Card>
            <CardText>
              <p>
                These stakeholder engagement strategies are recommended based on your Step 1 responses. NOTE: It is unlikely that you could achieve your engagement goals using just a single strategy. To ensure all of your high priority goals are addressed, it may be necessary to “mix and match” two or more strategies based on the table below (for example, you may need to implement Key Communicators, public workshops, and Social Media to meet all of your goals).  
              </p>
              <p>
                In addition to selecting those strategies you would like to implement using the “yes/no” function, a text box is provided to give you the option of writing a justification for choosing or not choosing the strategy. Any information you wish to provide will be displayed in a report in Step 3 and can be used to record your thought process for selecting (or not selecting) each strategy. Be sure to refer back to the <a target="blank" href="#principles">“Best Practices”</a> listed in the user manual when assessing your results and providing a rationale for your selection.
              </p>
            </CardText>
            <span style={{textAlign:'center', marginLeft:'15px', fontSize:'150%', display:'block', width:'100%'}}>
            <span style={{verticalAlign:'middle', textAlign:'center'}}>Number of Recommended Strategies To Show:</span>
              <span>
                <SelectField style={{textAlign:'left', color:'#ff0000', marginLeft:'15px', marginTop:'2px', verticalAlign:'middle', width:'10%', fontSize:'125%'}} valueMember="payload" displayMember="text" 
                onChange={this._handleSelectValueChange} 
                iconStyle={{fill:'black'}}
                menuItems={[{ payload: 5, text: '5' },{ payload: 10, text: '10' },{ payload: 15, text: '15' },{ payload: 20, text: '20' },{ payload: 25, text: '25' },{ payload: 28, text: 'All' }]}  
                value={this.state.numRecsToView}
                />
              </span>
            </span>
            <div style={gridStyles.root}>

              <Card key={"comparisonMatrix"} initiallyExpanded={true}>
                <CardTitle title="Strategy Effectiveness:" style={{textAlign:'center', paddingBottom:'0px'}} actAsExpanded={true} showExpandableButton={true}/>

                <CardText expandable={true}>
                <p>
                  Below you will find a matrix of the most highly ranked strategies and your high priority goals. Beside each strategy is a Score based on all of the questions you answered in Step 1 (goals, time, and resource/stakeholder characteristics). The Scores are relative to one another, and range from 0-100, with a score of 100 being the most closely matched strategy given all of your responses.<br/><br/>
                  The icons in the matrix represent how effective a given strategy is in achieving a given goal, with a green star representing “Highly effective, high priority”; a gray circle representing “Less effective, Lower priority”; and a red dash representing “Not effective, not a priority.” The icons are based solely on goal priorities and strategy effectiveness for the goals. For this reason, it is important that you take both the relative Score and goal effectiveness into account
                </p>        
                {(this._getGoalsForRecommendations(this.state.recommendations))}
                </CardText>
              </Card>
            </div>
            <div><Card><CardTitle style={{textAlign:'center'}} title="Details of Each Strategy:"/></Card></div>
              {this.state.recommendations.map(function(rec) {
                return (
                  <Card style={{textAlign:'left'}} key={rec.heading} initiallyExpanded={false}>
                  
                    <CardTitle style={{textAlign:'left'}} title={rec.heading} subtitle={this._getSubtitleText(rec)} actAsExpander={true}
                      showExpandableButton={true}/>
                    
                    <CardText style={{textAlign:'left'}} expandable={true}> 
                      <div><img style={{width:"98%", paddingLeft:"5px", paddingRight:"5px"}} src={rec.img}/></div>
                      <div dangerouslySetInnerHTML={{__html: this._getRecText(rec)}}>
                      </div>
                      <div style={{textAlign:'left', paddingLeft:"10px"}}>
                        <h3>Do you plan to use this strategy?</h3>
                        <RadioButtonGroup recId={rec.id} defaultSelected={rec.selected ? "1" : "0"}>
                        <RadioButton 
                            value="1"
                            label="Yes"
                            style={{marginBottom:8}} onTouchTap={this._handleSelected(rec.id)} />
                          <RadioButton
                            value="0"
                            label="No"
                            style={{marginBottom:4}} onTouchTap={this._handleUnselected(rec.id)}/>
                        </RadioButtonGroup>
                        <TextField style={{width:"80%", paddingLeft:"40px"}} onChange={this._handleReasonChange(rec.id)} hintText={rec.reason !== undefined ? rec.reason : "Please enter the reason you -will- or -will not- use the strategy. "}></TextField>
                      </div>
                    </CardText>
                  </Card>
                )
              }, this)}
              <CardActions style={{textAlign:'center'}}>
                <CardText style={{textAlign:'left'}}>
                  To generate a detailed report of the strategies that you have selected, select or tap the 'Go to Step 3' button. 
                  <br/><br/><b>Note: to include a strategy in the report, please choose the 'Yes' button at the end of each strategy description shown above</b>
                </CardText>
                <RaisedButton onTouchTap={this._handleTakeAgain} label="Retake Survey" />
                <RaisedButton onTouchTap={this._handleBookmark} label="Copy a link to These Results" />
                <RaisedButton onTouchTap={this._handleStep3} label="Go To Step 3" />
              </CardActions>
          </Card>
        </Tab>
        <Tab label="Review or Change Your Answers" >
          <Paper>
          <h3 style={{"textAlign":"center"}}>
            Click on any answer to return to the tool and change your response.
          </h3>
          <List subheader="Goals">
            {this.state.goals.map(function(goal) {
              return (
                <ListItem onTouchTap={this._handleGoalTap(goal)} key={goal.id} primaryText={goal.header} secondaryText={this._getNoteText(goal.notes)} ><div style={{float:"right", fontSize:'11', color:'gray', textAlign:'left'}}>{this._getGoalText(goal.priority)}</div></ListItem>
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
            <ListItem secondaryText={this._getNoteText(TimelineStore.getNotes())}/>
          </List>
          <ListDivider />
          <List subheader="Fishery Characteristics">
            {this.state.characteristics.map(function(characteristic) {
              return (
                <ListItem onTouchTap={this._handleCharTap(characteristic)} key={characteristic.id} primaryText={characteristic.heading} secondaryText={this._getNoteText(characteristic.notes)} ><div style={{float:"right", fontSize:'11', color:'gray', textAlign:'left'}}>{this._getCharacteristicText(characteristic)}</div></ListItem>
              )
            }, this)}
          </List>
          <ListDivider />
          </Paper>
        </Tab>
      </Tabs>
    );
  },

  _getNoteText(notes){
    if(notes !== undefined){
      return <span style={noteStyle}>{notes}</span>
    } else {
      return ""
    }
  },

  _getGoalHeaders(recs){
    let vals = [];
    for(let rec of recs){
      let nameCol = <TableHeaderColumn style={gridStyles.headerNameCol} tooltip={"Strategy Name"} key={"namecol"}>Name</TableHeaderColumn>
      let scoreCol = <TableHeaderColumn style={gridStyles.goalHeader} tooltip={"Strategy Score"} key={"scorecol"}>Score</TableHeaderColumn>
      vals.push(nameCol);
      vals.push(scoreCol);

      for(let score of rec.goal_scores){
        let disp_name = score.name
        if(score.name === "Levels of Engagement"){
          disp_name = "Inform"
        } else {
          let short_name = score.name.split(" ");
          disp_name = short_name[0];
          if(short_name.length > 1){
            disp_name = short_name[0]+" "+short_name[1];
          }
          if(short_name.length > 2){
            disp_name = disp_name+"..."
          }          
        }

        let curr = <TableHeaderColumn  style={gridStyles.goalHeader} key={score.goal_id}><span style={{ display:'inline-block', wordWrap:"break-word", width:'100px', textAlign:'left'}} >{disp_name}</span></TableHeaderColumn>
        vals.push(curr);
      }
      
      let row = <TableRow style={gridStyles.headerRow} children={vals}></TableRow>
      return row;
    }
  },

  _getScoreIds(goal_scores){
    let ids = []
    for(let score of goal_scores){
      ids.push(score.goal_id);
    }
    return ids;
  },

  _getGoalForId(id, goal_score){
    for(let score of goal_score){
      if(score.goal_id === id){
        return score;
      }
    }
  },
  _getGoalsForRecommendations(recs){
    let good_color = "#388E3C";
    let bad_color = "#e1c9bf";
    let ok_color = "#dbdb07";
    let all_rows = [];
    let all_goals = null;
    for(let rec of recs){
      let cols = [];
      let nameCol = <TableRowColumn style={gridStyles.nameCol} key={rec.id+"_name"}> {rec.heading}</TableRowColumn>
      let scoreCol = <TableRowColumn style={gridStyles.scoreCol} key={rec.id+"_score"}> {rec.normalized_final_score}</TableRowColumn>
      cols.push(nameCol);
      cols.push(scoreCol);

      if(all_goals === null){
        all_goals = this._getScoreIds(rec.goal_scores)
      }

      for(let score_id of all_goals){
        let svg = null;
        let score = this._getGoalForId(score_id, rec.goal_scores)

        if(score.is_max){
          svg = <GoodStrategy color={good_color}></GoodStrategy>
        } else if(score.is_min){
          svg = <BadStrategy color={bad_color}></BadStrategy>
        } else {
          svg = <OKStrategy color={ok_color}></OKStrategy>
        }
        let curr = <TableRowColumn style={gridStyles.scoreCol} key={rec.id+"_"+score.goal_id}> {svg}</TableRowColumn>
        cols.push(curr);
      }
      let trow = <TableRow style={{width:'100%'}} children={cols}></TableRow>
      all_rows.push(trow);
    } 

    let tbody = <TableBody  displayRowCheckbox={false} children={all_rows}></TableBody>
    let thead = <TableHeader style={{height:"80px"}} displaySelectAll={false} adjustForCheckbox={false} children = {this._getGoalHeaders(recs)}></TableHeader>
    let tfoot = this._getMatrixLegend(good_color, ok_color, bad_color);
    let table = <Table>{thead}{tbody}{tfoot}</Table>
    return table;
  },

  _getMatrixLegend(good_color, ok_color, bad_color){
    let good = <GoodStrategy color={good_color} style={{verticalAlign:'bottom'}}/>
    let ok = <OKStrategy color={ok_color} style={{verticalAlign:'bottom'}}/>
    let bad = <BadStrategy color={bad_color} style={{verticalAlign:'bottom'}}/>
    let blankCol = <TableRowColumn colSpan={1}></TableRowColumn>
    let goodCol = <TableRowColumn style={gridStyles.footerCell} colSpan={3}>{good}{"High Priority, Highly Effective"}</TableRowColumn>
    let okCol = <TableRowColumn style={gridStyles.footerCell} colSpan={4}><span>{ok}</span>{"Mixed Priority & Effectiveness"}</TableRowColumn>
    let badCol = <TableRowColumn style={gridStyles.footerCell} colSpan={4}><span>{bad}</span>{"Not a Priority OR Not Effective"}</TableRowColumn>
    let trow = <TableRow children={[blankCol, goodCol, okCol, badCol]}/>
    let footer = <TableFooter displaySelectAll={false} adjustForCheckbox={false} children={trow}></TableFooter>
    return footer
  },
  _getRecText(rec){
    let el = document.createElement( 'html' );
    el.innerHTML = rec.text;
    let subsections = el.getElementsByTagName( 'h4' );
    let lists = el.getElementsByTagName("ul")
    let full_details = "";
    
    
    //if(rec.hasImg){
    //  return subsections[0].outerHTML+lists[0].outerHTML+subsections[1].outerHTML+lists[1].outerHTML;
    //} else {
    return rec.text
    //}
  },

  _getSubtitleText(rec){
    let sel_text = rec.selected ? "Yes" : "No"
    return "Score: "+rec.normalized_final_score
  },
  _handleUnselected(recId, event){
    return (function() {
      MethodActions.setSelected(recId, false);
    }).bind(recId);    
  },

  _handleSelected(recId, event){
    return (function() {
      MethodActions.setSelected(recId, true);
    }).bind(recId);
  },

  _handleReasonChange(recId, event){
    return (function(event) {
      MethodActions.setReason(recId, event.target.value);
    }).bind(this);
  },

  _getGoalText(val){
    return goal_text_values[val];
  },

  _getGoalColor(val){
    return goal_color_values[val];
  },

  _getCharacteristicText(characteristic){
    let val = characteristic.answer;
    let char_id = characteristic.id;
    if(char_id === "high-capacity-for-engagement" || char_id === "high-tech-literacy"){
      if(val === "3"){
        return "High and Low";
      } else if(val === "2"){
        return "High";
      } else if(val === "1"){
        return "Low";
      } else {
        return "Unknown";
      }
    } else if(char_id === "large-geographic-size"){
      if(val === "3"){
        return "Large and Small";
      } else if(val === "2"){
        return "Large";
      } else if(val === "1"){
        return "Small";
      } else {
        return "Unknown";
      }
    } else if(char_id === "existing-leaders"){
      if(val === "3"){
        return "Both";
      } else if(val === "2"){
        return "Existing";
      } else if(val === "1"){
        return "No Existing";
      } else {
        return "Unknown";
      }
    } else {
      return characteristic_text_values[val]
    }
    
  },
  _isSpecialCase(char_id){
    return (char_id === "high-capacity-for-engagement" || 
        char_id === "high-tech-literacy" || 
        char_id === "large-geographic-size" || 
        char_id === "existing-leaders");
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


   _handleStep3(){
    this.props.history.push(...this.props.location, "/step3");
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