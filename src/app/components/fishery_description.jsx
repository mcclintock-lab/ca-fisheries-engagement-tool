import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { Router, Route, Link } from 'react-router';
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import TextField from 'material-ui/lib/text-field';
import DescriptionStore from '../stores/description';
import WorkflowActions from '../actions/workflowActions';
import DescriptionActions from '../actions/descriptionActions';
const CardActions = require('material-ui/lib/card/card-actions');

const containerStyle = {
};
const textStyle = {
  textAlign: 'left',
  width: '700px',
  display:'block'
};

const FisheryDescription = React.createClass({

  calculateState() {
    return {
      fishery: DescriptionStore.getFishery(),
      stakeholders: DescriptionStore.getStakeholders(),
      userName: DescriptionStore.getUserName(),
      projectName: DescriptionStore.getProjectName(),
      projectRationale: DescriptionStore.getProjectRationale()
    }
  },

  getInitialState() {
    let state = this.calculateState();
    return state;
  },

  componentDidMount() {

  },

  componentWillUnmount() {

  },

  _handleTextChange(event){
    return (function(event) {
      let name = event.target.name;
      if(name === "fisheryTextField"){
        let fishery = this.refs.fisheryTextField.getValue();
        DescriptionActions.setFishery(fishery);       
      } else if(name === "stakeholdersTextField"){
        let stakeholders = this.refs.stakeholdersTextField.getValue();
        DescriptionActions.setStakeholders(stakeholders);
      } else if(name === "userNameTextField"){
        let userName = this.refs.userNameTextField.getValue();
        DescriptionActions.setUserName(userName);
      } else if(name === "projectNameTextField"){
        let projectName = this.refs.projectNameTextField.getValue();
        DescriptionActions.setProjectName(projectName);
      } else if(name === "projectRationaleTextField"){
        let projectRationale = this.refs.projectRationaleTextField.getValue();
        DescriptionActions.setProjectRationale(projectRationale);
      }

    }).bind(this);
    
  },


  _handlePrev() {
    this.props.history.push(...this.props.location, "/intro");
  },

  _handleNext() {
    this.props.history.push(...this.props.location, "/goal_overview");
  },
  _isComplete(){
    return WorkflowActions.isComplete();
  },
  _goToStep2(event){
    if(event){
      WorkflowActions.goToStep2();
    }
  },
  render() {
    return (
      <Card style={{paddingBottom:'2px'}} initiallyExpanded={true}>
        <CardTitle
          title="Stakeholder Engagement Context Overview" style={{paddingTop:'5px'},{paddingBottom:'0px'}}
          avatar={<div />} />
        <CardText expandable={true}>
        <div style={{textAlign:'left'}}>
 
          <p>
            NOTE: this information is for your use only, and will be displayed in the reports generated by this Decision Support Tool. To ensure the correct stakeholder engagement strategies are implanted to meet the specific goals and stakeholder characteristics for your marine resource, it may be necessary to run through this DST for each major stakeholder constituency (i.e., fishers, buyers, NGOs, etc.). In step 3 of this DST, look across all of the strategies selected for each major stakeholder group and implement those that resonate most across all groups.
          </p>

          <TextField style={textStyle} onChange={this._handleTextChange()} 
                ref="userNameTextField" name="userNameTextField"
                floatingLabelText="Your name" defaultValue={DescriptionStore.getUserName()}></TextField>
          <TextField style={textStyle} onChange={this._handleTextChange()} 
                ref="projectNameTextField" name="projectNameTextField"
                floatingLabelText="Marine resource " defaultValue={DescriptionStore.getProjectName()}></TextField>
          <TextField style={textStyle} onChange={this._handleTextChange()} 
                ref="projectRationaleTextField" name="projectRationaleTextField"
                floatingLabelText="Marine resource management effort" defaultValue={DescriptionStore.getProjectRationale()}></TextField>
          <TextField  style={textStyle} onChange={this._handleTextChange()} 
                ref="fisheryTextField" name="fisheryTextField"
                floatingLabelText="Stakeholders" defaultValue={DescriptionStore.getFishery()}></TextField>
          <TextField style={textStyle} onChange={this._handleTextChange()} 
                ref="stakeholdersTextField"  floatingLabelText="Why is stakeholder engagement important for this effort?" name="stakeholdersTextField" 
                defaultValue={DescriptionStore.getStakeholders()}></TextField>
        

        </div>
        </CardText>
        <CardActions>
        <RaisedButton label="Back to Intro" onTouchTap={this._handlePrev} />
        <RaisedButton label="Go to Goals Overview" primary={true} onTouchTap={this._handleNext} />
                  <RaisedButton secondary={true} style={this._isComplete() ? {display:'inline-block'} : {display:'none'}} onTouchTap={this._goToStep2} label="Go to Step 2 (Results)" disabled={!this._isComplete()}/>
        </CardActions>
      </Card>
    );
  },
});

export default FisheryDescription;
