import React, { Component } from 'react';
import SwaggerUI from 'swagger-ui';
import ReactMarkdown from 'react-markdown';
import Config from './Resources/config.json';
import Sidebar from './Components/Sidebar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDefinition: false,
      orgData: null,
      linkList: null,
      orgAPIList: null,
      apiData: null,
      linkData: null
    }
    this.swaggerhub = this.swaggerhub.bind(this)
    this.getOrganizationData = this.getOrganizationData.bind(this)
    this.getAPIData = this.getAPIData.bind(this)
    this.getStaticFile = this.getStaticFile.bind(this)
  }

  componentWillMount() {
    this.setState({
      orgData:  Config.customConfiguration.orgData,
      linkList: Config.customConfiguration.linkData
    })
  };

  componentDidUpdate() {
    if (this.state.isDefinition) {
      SwaggerUI({
        domNode: document.getElementById('docs'),
        layout: "BaseLayout",
        docExpansion: ["none"],
        url: this.state.apiData
      });
    } else {
      // handle tutorial rendering
      // fetch(howItWorks).then((response) => response.text()).then((text) => {
      //   this.setState({tutorialText: text})
      // })
    }
  }

  swaggerhub(method, resource, params) {
    let url = ""
    if (params) {
      url = "https://api.swaggerhub.com/apis/" + resource + "?" + params
    } else {
      url = "https://api.swaggerhub.com/apis/" + resource
    }

    return fetch(url, {
        method: method
    }).then(response => {
      if (response.ok) {
        return response.json()
      } throw new Error('There was an issue requesting the API')
    }).then(json => {
      return json
    })
  }

  getOrganizationData(organization) {
    let callParams = "page=0&limit=20&sort=NAME&order=ASC"
    let callPath = organization;
    this.swaggerhub('GET', callPath, callParams).then(response => {
      this.setState({
        orgAPIList: response.apis
      })
    })
  }

  getAPIData(apiLink) {
    let apiURL = "https://api.swaggerhub.com/apis/" + apiLink

    this.setState({
      isDefinition: true,
      apiData: apiURL
    })
  }

  getStaticFile(filePath) {
    let requiredFile = require("./Resources/sidebar/" + filePath)

    fetch(requiredFile).then((response) => response.text()).then((text) => {
      this.setState({
        isDefinition: false,
        linkData: text
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="page-body">
          <Sidebar
            orgData={this.state.orgData}
            orgAPIList={this.state.orgAPIList}
            linkList={this.state.linkList}
            getOrganizationData={this.getOrganizationData}
            getAPIData={this.getAPIData}
            getStaticFile={this.getStaticFile}
          />
          <div className="docs-container">
            <div id="docs" />
          </div>
          <div className="markdown-container">
            <ReactMarkdown 
              source={this.state.linkData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
