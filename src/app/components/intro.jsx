import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions  from 'material-ui/lib/card/card-actions';

const containerStyle = {
};
const textStyle = {
  textAlign: 'left'
};

const Intro = React.createClass({

  getInitialState() {
    return {
    };
  },

  componentWillMount() {
  },

  _handleTouchTap() {
    this.props.history.push(...this.props.location, "/fishery_description");
  },

  render() {
    return (
      <div>
        <CardTitle
          title="California Fisheries Stakeholder Engagement Decision Support Tool"
          avatar={<div />} />
        <CardText expandable={true}>
        <div style={textStyle}>

          <h3>Engaging with Stakeholders</h3>
            <p>
              Meaningful and effective stakeholder engagement is essential for the sustainable management of fisheries throughout California. Given the number and diversity of stakeholders involved, engaging fishermen and other groups affected by fisheries management can be challenging. Fortunately, many different stakeholder engagement strategies exist to enable communication and collaboration between fisheries managers and stakeholders. Although these strategies may not be able to address all of the challenges in fisheries management, they can be designed to allow a free flow of information between fisheries stakeholders and managers, assisting in the decision-making process and creating more effective, long-lasting solutions to management issues.
            </p>
          <h3>What Does This Decision Support Tool Do?</h3>
            
              <hX>
                This decision support tool leads the user through a three-step process to best determine which stakeholder engagement strategies are most appropriate for your management process.
              </hX>
                <ul>
                  <li><b>Step 1: (Quantitative analysis)</b> Identify the most appropriate stakeholder engagement strategies, given:</li>
                    <ol type="A">
                      <li>Your priority stakeholder engagement goals</li>
                      <li>The timing of your current management process</li>
                      <li>The characteristics of your target stakeholders</li>
                    </ol>
                  <li> <b>Step 2: (Qualitative analysis)</b> Weigh the top scoring engagement strategies against additional opportunities and constraints, taking into consideration such factors as:</li>
                    <ul>
                      <li>Whether the resources (funding, staff availability, and necessary skills) are available to implement the project.</li>
                      <li>Whether the legal and regulatory landscape affecting the process may place some constraints on which strategies are appropriate.</li>
                      <li>The history of past experiences associated with the use of specific engagement strategies in the fishery; it the strategy was used in previous efforts and resisted by stakeholders, it may not be appropriate for this management process.</li> 
                    </ul>
                  <li><b>Step 3: (Decision)</b> Select your engagement strategy(ies), and prepare a report with rationale.</li>
                  
                </ul>
          <h3>Before you start using the decision support tool:</h3>
            <ul>
              <li>
                If the management process involves tribal consultation, please contact your department’s tribal liaison or the <a target="_blank" href="http://tribalgovtaffairs.ca.gov/">Governor’s Tribal Advisor Office</a>.
              </li>
              <li>
                Familiarize yourself with the key <a target="_blank" href="#/principles">Stakeholder Engagement Principles and Implementation Guidance</a>
              </li>
              
            </ul>
        </div>
        </CardText>
        <CardActions>
        <RaisedButton label="Let's get started" primary={true} onTouchTap={this._handleTouchTap} />
        </CardActions>
      </div>

    );
  },
});

export default Intro;
