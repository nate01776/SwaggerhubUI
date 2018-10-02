import React from 'react';
// import './Sidebar.css';
import APILink from './APILink.js'

const Sidebar = props => {
  let orgData = props.orgData;
  let orgAPIData = props.orgAPIData;
  
  let APILinks = [];

  if (orgAPIData === null) {
    props.getOrganizationData(orgData.orgName)
  } else {
    for (let i=0; i < orgAPIData.length; i++) {
      APILinks.push(
        <APILink 
          key={i}
          orgAPIData={props.orgAPIData[i]}
          getAPIData={props.getAPIData}
        />
      )
    }
  }

  return (
    <div className="sidebar">
      <div className="side-bar-body">
        <h3 className="side-bar-title">TUTORIALS</h3>
        <h4>This should support .md</h4>
        <h3 className="side-bar-title">API DOCS</h3>
        {APILinks}
      </div>
    </div>
  )
}

export default Sidebar;