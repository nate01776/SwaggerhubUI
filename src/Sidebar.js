import React from 'react';
// import './Sidebar.css';
import APILink from './APILink.js'

const Sidebar = props => {
  let orgData = props.orgData;
  let orgAPIData = props.orgAPIData;
  let orgName = orgData.orgName
  let displayImage = orgData.displayImage
  
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
      <header className="App-header">
          <img src={displayImage} className="App-logo" alt="logo" />
          <h1 className="App-title">{orgName}</h1>
      </header>
      <div className="side-bar-body">
        <h3 className="side-bar-title">TUTORIALS</h3>
        <h4>This should support .md</h4>
        <h3 className="side-bar-title">API DOCS</h3>
        {APILinks}
        <h3>SANDBOX</h3>
        <h4>workflows against virt</h4>
      </div>
    </div>
  )
}

export default Sidebar;