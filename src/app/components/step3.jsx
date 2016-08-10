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
import GoodStrategy from 'material-ui/lib/svg-icons/action/grade';
import OKStrategy from 'material-ui/lib/svg-icons/image/brightness-1';
import BadStrategy from 'material-ui/lib/svg-icons/navigation/arrow-drop-down';

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
  render() {
    return (
      <Tabs>
        <Tab label={"Selected stakeholder engagement strategies"} >
          <Card>
            <CardText>
              <div>
                The following strategies were selected by <em>{this.getUserName()}</em> for the <em>{this.getProjectName()}</em> project with the following rationale:<br/>
                <i>{this.getProjectRationale()}</i>. These strategies are for the <i>{this.getFishery()}</i> fishery with <i>{this.getStakeholders()}</i> stakeholders.
              </div>
              <p>
                The following report includes additional information for the strategies selected during Step 2. In it, you will find keys to successful implementation, and methods for evaluating how effective the strategy has been at achieving desired outcomes. In addition, the report contains user-entered information for why recommended strategies were or were not chosen by the user during Step 2.  
              </p>
              <p>
                <b>{this._hasSelected() ? "To save a copy of this report, choose 'Print' and Save as a PDF." : ''}</b>
              </p>
            </CardText>
            <div style={gridStyles.root}>
              <Card key={"comparisonMatrix"} initiallyExpanded={true}>
                <CardTitle title="Strategy Effectiveness:" style={{textAlign:'center', paddingBottom:'0px'}} actAsExpanded={true} showExpandableButton={true}/>
                <CardText expandable={true}>        
                {this._hasSelected() ? (this._getGoalsForRecommendations(this.state.recommendations)) : <i>You did not select any stakeholder engagement strategies. Please return to step 2 and select a set of strategies to include in the reports.</i>}
                </CardText>
              </Card>
            </div>
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
              <br/>
              <div style={{paddingLeft:"10px", paddingRight:"10px"}}>
              <h3>
                {this._hasNoAnswersSelected() ? 'The following strategies were not selected' : '' }
              </h3>
               </div>
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


              <CardActions style={{textAlign:'center'}}>
                <RaisedButton onTouchTap={this._handleStep2} label="Return to Step 2 (Results)" />
                <RaisedButton onTouchTap={this._handleTakeAgain} label="Retake Survey" />
              </CardActions>
          </Card>
        </Tab>
      </Tabs>
    );
  },

  _getRecText(rec){
    let el = document.createElement( 'html' );
    el.innerHTML = rec.text;
    let subsections = el.getElementsByTagName( 'h4' );
    let lists = el.getElementsByTagName("ul")
    let full_details = "";
    
    let t = "";
    if(rec.hasImg){
      t = subsections[0].outerHTML+lists[0].outerHTML+subsections[1].outerHTML+lists[1].outerHTML;
    } else {
      t = rec.text
    }
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
        let short_name = score.name.split(" ");
        let disp_name = short_name[0];
        if(short_name.length > 1){
          disp_name = short_name[0]+" "+short_name[1];
        }
        if(short_name.length > 2){
          disp_name = disp_name+"..."
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

  _getGoalsForRecommendations(recs){

    let good_color = "#388E3C";
    let bad_color = "#e57373";
    let ok_color = "#BDBDBD";
    let all_rows = [];
    for(let rec of recs){
      let cols = [];
      let nameCol = <TableRowColumn style={gridStyles.nameCol} key={rec.id+"_name"}> {rec.heading}</TableRowColumn>
      let scoreCol = <TableRowColumn style={gridStyles.scoreCol} key={rec.id+"_score"}> {rec.normalized_final_score}</TableRowColumn>
      cols.push(nameCol);
      cols.push(scoreCol);
      for(let score of rec.goal_scores){
        let svg = null;
        if(score.is_max){
          let color=
          svg = <GoodStrategy color={good_color}></GoodStrategy>
        } else if(score.is_min){
          let color=
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