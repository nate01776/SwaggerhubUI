import React from 'react';
// import './APILink.css'

const APILink = props => {
  let name = props.orgAPIData.name;
  let fullPath = props.orgAPIData.properties[0].url;
  let parsedURL = fullPath.split("/apis/")[1];

  function handleClick() {
    props.getAPIData(parsedURL)
  }

  return (  
    <div className="api-link" onClick={() => handleClick()}>
      {name}
    </div>
  )
}

export default APILink;