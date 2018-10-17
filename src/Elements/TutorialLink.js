import React from 'react';
// import './APILink.css'

const TutorialLink = props => {
    let displayName = props.displayName
    let resource = props.resource

  function handleClick() {
    props.getStaticFile(resource)
  }

  return (  
    <div className="api-link" onClick={() => handleClick()}>
      {displayName}
    </div>
  )
}

export default TutorialLink;