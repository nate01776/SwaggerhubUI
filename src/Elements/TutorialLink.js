import React from 'react';
// import './APILink.css'

const TutorialLink = props => {
    let name = props.linkName

  function handleClick() {
    props.getStaticFile(name)
  }

  return (  
    <div className="api-link" onClick={() => handleClick()}>
      {name}
    </div>
  )
}

export default TutorialLink;