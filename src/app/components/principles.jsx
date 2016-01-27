import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { Router, Route, Link } from 'react-router';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
const CardActions = require('material-ui/lib/card/card-actions');
import Dialog from 'material-ui/lib/dialog';

const containerStyle = {

};
const textStyle = {
  textAlign: 'left'
};
const cardStyle = {
  minWidth: 300,
  margin: '0 auto',
  maxWidth: '1000'
};

const Principles = React.createClass({

  getInitialState() {
    return {
    };
  },

  componentWillMount() {
  },

  _handleTouchTap() {
    
  },


  render() {
    return (
      <div>
        <CardTitle
          title="Key Stakeholder Engagement Principles and Implementation Guidance" 
          avatar={<div />} />
        <CardText expandable={true}>
        <div style={textStyle}>

<table style={{verticalAlign:"text-top", padding:'5px'}}>
<thead>
<tr >
<td width="100px">
<strong>Principle</strong>
</td>
<td width="220px">
<strong>Description</strong>
</td>
<td width="220px">
<p><strong>Why Implement?</strong></p>
</td>
<td style={{width:"450px"}}>
<strong style={{paddingLeft:"22px"}}>Guidance to Implement in Practice</strong>
</td>
</tr>
</thead>
<tbody>
<tr style={{verticalAlign:"text-top"}}>
<td >
  Engage early and Often
</td>
<td>
<p>Engaging stakeholders early and often allows managers to identify the boundaries of stakeholder values and preferences around management issues and ensure that management alternatives are, and remain, in the public interest.</p>
</td>
<td >
<p>Early public involvement can reduce delays in the approval process and the likelihood of issues becoming politicized. Engaging stakeholders early can also nurture trust, expand management options, improve communication, improve process efficiency, enable conflict management, and increase representation.</p>
<p><strong>&nbsp;</strong></p>
</td>
<td>
<ul>
<li>Involve stakeholders in defining the management problem; decision-making reflects the interests and concerns of stakeholders at that time.</li>
<li>Involve stakeholders before management alternatives are identified and solidified to ensure all viable options are on the table</li>
<li>Use consistent mechanisms for updating and engaging stakeholders in the decision-making process (e.g., website is updated bimonthly).</li>
<li>Employ engagement strategies over a time frame during which stakeholders can feasibly influence the management decision (e.g., stakeholders are contacted 1-2 months ahead of an engagement opportunity that will inform decision-making; stakeholders are engaged <em>before</em> managers use their best judgment about the decision).</li>
</ul>
<p>&nbsp;</p>
</td>
</tr>
<tr style={{verticalAlign:"text-top"}}>
<td>
<p>Set Clear Goals</p>
</td>
<td>
<p>Setting goals ensures managers and stakeholders alike are working towards a common endpoint.</p>
<p><strong>&nbsp;</strong></p>
</td>
<td>
<p>Clear goals for stakeholder engagement, particularly when established in collaboration with stakeholders, improve clarity around decision-making expectations and opportunities for public participation.</p>
</td>
<td>
<ul>
<li>Involve stakeholders in identifying clear long- and short-term planning and agency management goals (measurable, achievable, and specific).</li>
<li>Have clear goals for stakeholder engagement (e.g., goals based on this checklist).</li>
<li>Employ metrics to determine the efficacy of stakeholder engagement and adapt strategies over time based on this evaluation (see introduction section outlining possible engagement metrics).</li>
</ul>
<p>&nbsp;</p>
</td>
</tr>
<tr style={{verticalAlign:"text-top"}}>
<td>
<p>Build Relationships</p>
</td>
<td>
<p>Building key relationships between managers and fishery stakeholders can strengthen trust by putting a human face to management actions, connecting agency staff to communities through key communicators, and increasing empathy and understanding between managers and stakeholders.</p>
<p><strong>&nbsp;</strong></p>
</td>
<td >
<p>Relationships and agency visibility contribute to public acceptance and allow managers to more quickly and nimbly respond to pressing stakeholder concerns&mdash;creating social resilience around management decision-making.</p>
</td>
<td>
<ul>
<li>When appropriate, use personal names or identifying photos to communicate with stakeholders.</li>
<li>Utilize communication platforms accessible by the affected stakeholder community.</li>
<li>Disseminate materials in many different venues (e.g., physical, online, press).</li>
<li>Respond to or contact stakeholders individually, and meet in-person when requested or appropriate.</li>
<li>Acknowledge and affirm stakeholders for their efforts to engage.</li>
<li>Interact with stakeholders informally in community settings.</li>
</ul>
<p>&nbsp;</p>
</td>
</tr>
<tr style={{verticalAlign:"text-top"}}>
<td>
<p>Ensure Transparency</p>
</td>
<td>
<p>Transparency ensures the goals, motivations, and activities for management decision-making are communicated publicly and engagement processes are clearly documented. The public should be aware of how they can, and cannot, influence outcomes, and how their perspectives were ultimately considered within decision-making.</p>
<p><strong>&nbsp;</strong></p>
</td>
<td>
<p>Transparency around how managers are approaching decision-making processes builds trust and interest in contributing. Transparency also helps establish stakeholder expectations and illuminate where interpretation or understanding may differ across stakeholders. Clarity in messaging is critical for reducing public misunderstanding, negative backlash to agency actions, and distrust.</p>
<p><strong>&nbsp;</strong></p>
</td>
<td>
<ul>
<li>Provide mechanisms for stakeholders to easily identify the status of the decision-making process and how they may engage proactively.</li>
<li>Clearly and transparently communicate why and how the management decision is made (i.e., who will make the final decision, what is the role of stakeholders and fisheries users in the decision-making process, what information was used to influence the decision, how the decision will lead to outcomes optimizing, on balance, the public good, etc.).</li>
<li>If information is withheld, communicate the reasons for doing so to stakeholders.</li>
<li>Use clear, simple, and accessible language (e.g., language, structure, vocabulary); employ analogies and real-world examples in communications; and proofread outgoing materials.</li>
<li>If a mistake is made, admit it and rectify it as soon as possible.</li>
<li>Clearly define, in writing and verbally, the roles and influence of management, stakeholders, and the general public in the decision-making process.</li>
<li>Provide clear rationale and need for stakeholder participation (e.g., stakeholders will be able to contribute to management goal-setting, invitations to engage clearly state how participation is in the stakeholders&rsquo; best interest).</li>
</ul>
<p>&nbsp;</p>
</td>
</tr>
<tr style={{verticalAlign:"text-top"}}>
<td>
<p>Pursue Inclusivity</p>
</td>
<td>
<p>Ensuring an inclusive and public process is critical for safeguarding equitable decision-making and receiving a diversity of stakeholder voices.</p>
<p>&nbsp;</p>
</td>
<td>
<p>The marginalization of voices can lead to the delay or preclusion of management action, and the exclusion of voices can limit the information accrued to inform decision-making and stakeholder buy-in.</p>
</td>
<td>
<ul>
<li>Engage a representative cross section of stakeholder interests affected by the management decision and confirm this selection through transparent assessment of the affected communities.</li>
<li>Disseminate information in the languages and formats that all potential stakeholders can understand.</li>
</ul>
<p>&nbsp;</p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
        </div>
        </CardText>
      </div>
    );
  },
});

export default Principles;
