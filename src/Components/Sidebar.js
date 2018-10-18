import React from 'react';
import APILink from '../Elements/APILink.js'
import TutorialLink from '../Elements/TutorialLink.js'
import './sidebar.css'

const Sidebar = props => {
  let orgData = props.orgData;
  let orgAPIList = props.orgAPIList;
  let orgName = orgData.orgName
  let displayImage = orgData.displayImage
  let tutorialList = props.linkList
  
  let APILinks = [];
  let tutorialLinks = [];

  if (orgAPIList === null) {
    props.getOrganizationData(orgData.orgName)
  } else {
    for (let i=0; i < orgAPIList.length; i++) {
      APILinks.push(
        <APILink 
          key={i}
          orgAPIData={props.orgAPIList[i]}
          getAPIData={props.getAPIData}
        />
      )
    }
  }

  for (let n=0; n < tutorialList.length; n++) {
    tutorialLinks.push(
      <TutorialLink 
        key={n}
        displayName={tutorialList[n].displayName}
        resource={tutorialList[n].resource}
        getStaticFile={props.getStaticFile}
      />
    )
  }

  return (
    <div className="side-bar">
      <header className="side-bar-header">
          <img src={displayImage} className="side-bar-logo" alt="logo" />
          <h1 className="org-title">{orgName}</h1>
      </header>
      <div className="side-bar-body">
        <h3 className="side-bar-title">TUTORIALS</h3>
        {tutorialLinks}
        <h3 className="side-bar-title">API DOCS</h3>
        {APILinks}
      </div>
      <div className="side-bar-footer">
        <h4><a href="http://app.swaggerhub.com">POWERED BY SWAGGERHUB</a></h4>
      </div>
    </div>
  )
}

export default Sidebar;