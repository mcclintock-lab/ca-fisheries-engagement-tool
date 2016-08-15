import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { Router, Route, Link } from 'react-router';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import TextField from 'material-ui/lib/text-field';
import DescriptionStore from '../stores/description';
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
      console.log("handling text change with name ", name)
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

  render() {
    return (

      <div>
        <CardTitle
          title="Resource Description"
          avatar={<div />} />
        <CardText expandable={true}>
        <div style={{textAlign:'left'}}>
          <p>
            Please enter the following information about the this project and its purpose. Note: this
            information is recorded for your use only, and will be displayed in the reports generated by this Decision 
            Support Tool.
          </p>

          <TextField style={textStyle} onChange={this._handleTextChange()} 
                ref="userNameTextField" name="userNameTextField"
                floatingLabelText="Your Name" defaultValue={DescriptionStore.getUserName()}></TextField>
          <TextField style={textStyle} onChange={this._handleTextChange()} 
                ref="projectNameTextField" name="projectNameTextField"
                floatingLabelText="Project Name" defaultValue={DescriptionStore.getProjectName()}></TextField>
          <TextField style={textStyle} onChange={this._handleTextChange()} 
                ref="projectRationaleTextField" name="projectRationaleTextField"
                floatingLabelText="Project Rationale" defaultValue={DescriptionStore.getProjectRationale()}></TextField>

          <TextField  style={textStyle} onChange={this._handleTextChange()} 
                ref="fisheryTextField" name="fisheryTextField"
                floatingLabelText="Resource Name" defaultValue={DescriptionStore.getFishery()}></TextField>
          <TextField style={textStyle} onChange={this._handleTextChange()} 
                ref="stakeholdersTextField"  floatingLabelText="Stakeholders" name="stakeholdersTextField" 
                defaultValue={DescriptionStore.getStakeholders()}></TextField>
        

        </div>
        </CardText>
        <CardActions>
        <RaisedButton label="Back to Intro" onTouchTap={this._handlePrev} />
        <RaisedButton label="Go to Goals Overview" primary={true} onTouchTap={this._handleNext} />
        </CardActions>
      </div>
    );
  },
});

export default FisheryDescription;
