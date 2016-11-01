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
import DescriptionStore from '../stores/description';
import GoodStrategy from 'material-ui/lib/svg-icons/toggle/star';
import OKStrategy from 'material-ui/lib/svg-icons/toggle/star-half';
import BadStrategy from 'material-ui/lib/svg-icons/toggle/star-border';

let size = 18;

const goal_text_values = {1:"Not a Priority", 2: "Somewhat of a Priority", 3: "High Priority"};
const characteristic_text_values = {0:"Unknown", 1: "No", 2: "Yes", 3: "Both"};
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
let descriptionStyle={
  display:'block',
  fontSize:'0.9em'
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
const noteStyle = {
  color:'lightBlack',
  fontSize:'0.8em',
  paddingLeft:'10px',
  fontStyle:'italic'
};
const Step3 = React.createClass({
  
  calculateRecommendedMethods() {
    let methods = MethodStore.getSelectedMethods();
    return methods;
  },

  calculateMethodsNotChosen() {
    let methods = MethodStore.getMethodsNotChosen();
    return methods;
  },


  calculateState() {
    return {
      goals: GoalStore.getAll(),
      timeliness: TimelineStore.getAll(),
      characteristics: CharacteristicStore.getAllWithSpecialCases(),
      recommendations: this.calculateRecommendedMethods(),
      recs_not_picked: this.calculateMethodsNotChosen()
    }
  },

  getInitialState() {
    let state = this.calculateState();
    state.numRecsToView = 10;
    return state;
  },

  getFishery(){
    let fishery = DescriptionStore.getFishery();
    if(fishery === undefined || fishery.length === 0){
      return "No fishery identified";
    }
    return fishery;
  },
  getStakeholders(){
    let stakeholders = DescriptionStore.getStakeholders();
    if(stakeholders === undefined || stakeholders.length === 0){
      return "No stakeholders identified";
    }
    return stakeholders;
  },
  getUserName(){
    let userName = DescriptionStore.getUserName();
    if(userName === undefined || userName.length === 0){
      return "No name given";
    }
    return userName;
  },
  getProjectName(){
    let projectName = DescriptionStore.getProjectName();
    if(projectName === undefined || projectName.length === 0){
      return "No project name given";
    }
    return projectName;
  },
  getProjectRationale(){
    let rationale = DescriptionStore.getProjectRationale();
    if(rationale === undefined || rationale.length === 0){
      return "No rationale given";
    }
    return rationale;
  },
  _getNoteText(notes){
    if(notes !== undefined){
      return <span style={noteStyle}>{notes}</span>
    } else {
      return ""
    }
  },
  render() {
    return (
      <Tabs>
        <Tab label={"Selected stakeholder engagement strategies"} >
              <Card>
              <CardTitle title="Resource Description:" style={{textAlign:'center', paddingBottom:'0px'}} actAsExpanded={true} showExpandableButton={true}/>
              <CardText>
                  <span style={descriptionStyle}><i>Your name:</i> {this.getUserName()}</span>
                  <span style={descriptionStyle}><i>Marine resource:</i> {this.getProjectName()}</span>
                  <span style={descriptionStyle}><i>Marine resource management effort:</i> {this.getProjectRationale()}</span>
                  <span style={descriptionStyle}><i>Stakeholders:</i> {this.getFishery()}</span>
                  <span style={descriptionStyle}><i>Why is stakeholder engagement important for this effort?</i> {this.getStakeholders()}</span>

              </CardText>
            </Card>
              <Card>
              <div style={{margin:'10px'}}>
                The following report includes additional information for the strategies selected during Step 2. In it, you will find keys to successful implementation, and methods for evaluating how effective the strategy has been at achieving desired outcomes. In addition, the report contains user-entered information for why recommended strategies were or were not chosen by the user during Step 2.  
              </div>
              <Card key={"comparisonMatrix"} initiallyExpanded={true}>
                <CardTitle title="Strategy Effectiveness:" style={{textAlign:'center', paddingBottom:'0px'}} actAsExpanded={true} showExpandableButton={true}/>
                <CardText expandable={true}>        
                {this._hasSelected() ? (this._getGoalsForRecommendations(this.state.recommendations)) : <i>You did not select any stakeholder engagement strategies. Please return to step 2 and select a set of strategies to include in the reports.</i>}
                </CardText>
              </Card>
            
              <Card style={this._hasSelected() ? {display:'block'} : {display:'none'}}>
                <CardTitle title="The following strategies were selected:" style={{textAlign:'center', paddingBottom:'0px'}} actAsExpanded={true} showExpandableButton={false}/>
              </Card>
              {this.state.recommendations.map(function(rec) {
                return (
                  <Card key={rec.heading} initiallyExpanded={false}>
                    <CardTitle title={rec.heading} subtitle={this._getSubtitleText(rec)}/>
                    <CardText style={{marginTop:'0px', paddingTop:'0px'}} expandable={false}>
                      <div>
                        <div style={{lineHeight:'12px', paddingLeft:'5px', fontSize:'1.2em'}}>Reason for selecting the strategy:</div>
                        <div style={{ paddingLeft:"15px", paddingRight:"5px", width:"90%", paddingBottom:'10px', paddingTop:'5px'}}>{rec.reason === undefined ? "No reason was given": rec.reason}</div>
                      </div>

                      <div style={{lineHeight:'12px', paddingTop: '5px', paddingLeft:'5px', paddingBottom:'10px', fontSize:'1.1em'}}>User Priorities and Expert Rankings:</div>
                      <div style={{paddingLeft:"15px", paddingRight:"10px"}}>
                          The following table shows how you prioritized each engagement goals and how experts ranked this strategy's efficacy in achieving that goal. Highlighted rows are goals that are a priority for you and are effectively achieved with this engagement strategy, as ranked by experts.
                      </div>
                      <div><img style={{width:"98%", paddingLeft:"5px", paddingRight:"5px"}} src={rec.img}/></div>
                      <div dangerouslySetInnerHTML={{__html: this._getRecText(rec)}}>
                      </div>
                    </CardText>
                  </Card>
                )
              }, this)}
              <Card style={this._hasNoAnswersSelected() ? {display:'block'} : {display:'none'}}>
                <CardTitle title="The following strategies were not selected:" style={{textAlign:'center', paddingBottom:'0px'}} actAsExpanded={true} showExpandableButton={false}/>
              </Card>
 
              {this.state.recs_not_picked.map(function(rec) {
                return (
                  <Card key={rec.heading} initiallyExpanded={false}>
                    <CardTitle title={rec.heading} subtitle={this._getSubtitleText(rec)}/>
                    <CardText style={{marginTop:'0px', paddingTop:'0px'}}  expandable={false}>
                      <div>
                      <div style={{lineHeight:'12px', paddingLeft:'5px', fontSize:'1.2em'}}>Reason for <b>NOT</b> selecting the strategy:</div>
                      <div style={{ paddingLeft:"15px", paddingRight:"5px", width:"90%", paddingBottom:'10px', paddingTop:'5px'}}>{rec.reason === undefined ? "No reason was given": rec.reason}</div>
                      </div>
                    </CardText>
                  </Card>
                )
              }, this)}

              <Card key={"yourAnswers"} initiallyExpanded={true}>
                <CardTitle title="Your Answers:" style={{textAlign:'center', paddingBottom:'0px'}} actAsExpanded={true} showExpandableButton={true}/>
                <CardText expandable={true}>        
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
                </CardText>
              </Card>

              
              <CardActions style={{textAlign:'center'}}>
                <RaisedButton onTouchTap={this._handleTakeAgain} label="Retake Survey" />
                <RaisedButton onTouchTap={this._handleStep2} label="Return to Step 2 (Results)" />
                <RaisedButton primary={true} onTouchTap={this._print} label="Print" />
              </CardActions>
          </Card>
        </Tab>
      </Tabs>
    );
  },
  _print(event){
    if(event){
      window.print();
    }
  },
  _hasNotes(){
    return true
  },
  _getNotes(){
    let recs = this.state.recommendations;

  },

  _getRecText(rec){
    let el = document.createElement( 'html' );
    el.innerHTML = rec.text;
    let subsections = el.getElementsByTagName( 'h4' );
    let lists = el.getElementsByTagName("ul")
    let full_details = "";
    
    let t = "";
    //if(rec.hasImg){
    //  t = subsections[0].outerHTML+lists[0].outerHTML+subsections[1].outerHTML+lists[1].outerHTML;
    //} else {
    t = rec.text
    //}
    t = t+rec.details;
    return t
  },

  _getGoalHeaders(recs){
    let vals = [];
    for(let rec of recs){
      let nameCol = <TableHeaderColumn style={gridStyles.headerNameCol} tooltip={"Strategy Name"} key={"namecol"}>Name</TableHeaderColumn>
      let scoreCol = <TableHeaderColumn style={gridStyles.goalHeader} tooltip={"Strategy Score"} key={"scorecol"}>Score</TableHeaderColumn>
      vals.push(nameCol);
      vals.push(scoreCol);

      for(let score of rec.goal_scores){
        let disp_name = score.name;
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
  _getEmptyTable(){
    let emptyCol = <TableRowColumn key={"empty_col"}> No strategies were selected</TableRowColumn>
    let tableRow = <TableRow style={{width:'100%'}} children={emptyCol}></TableRow>
    let thead = <TableHeader style={{height:"80px"}} displaySelectAll={false} adjustForCheckbox={false} children = {this._getGoalHeaders(recs)}></TableHeader>
    
    let all_rows = [tableRow];
    let tbody = <TableBody  displayRowCheckbox={false} children={all_rows}></TableBody>
    let table = <Table>{tbody}</Table>
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

  _getSubtitleText(rec){
    let sel_text = rec.selected ? "Yes" : "No"
    return "Score: "+rec.normalized_final_score;
  },
  _numSelected(){
    let sel_methods = MethodStore.getSelectedMethods()
    return (sel_methods.length === 1 ? " strategy." : sel_methods.length+" strategies.");
  },
  _hasSelected(){
    let sel_methods = MethodStore.getSelectedMethods()
    return (sel_methods !== undefined && sel_methods.length > 0);
  },
  _hasNoAnswersSelected(){
    let sel_methods = MethodStore.getMethodsNotChosen()
    return (sel_methods !== undefined && sel_methods.length > 0);
  },
  _getGoalText(val){
    return goal_text_values[val];
  },
  _getGoalColor(val){
    return goal_color_values[val];
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