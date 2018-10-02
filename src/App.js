import React, { Component } from 'react';
import SwaggerUI from 'swagger-ui';
import Config from './config.json';
import Sidebar from './Sidebar.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // swaggerVersion: null,
      orgData: null,
      orgAPIData: null,
      apiData: null,
    }
    this.swaggerhub = this.swaggerhub.bind(this)
    this.getOrganizationData = this.getOrganizationData.bind(this)
    this.getAPIData = this.getAPIData.bind(this)
  }

  componentWillMount() {
    this.setState({
      orgData:  Config.customConfiguration.orgData
    })
  };

  componentDidUpdate() {
    SwaggerUI({
      domNode: document.getElementById('docs'),
      layout: "BaseLayout",
      docExpansion: ["none"],
      url: this.state.apiData
    });
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
      } throw new Error('Doesnt look great')
    }).then(json => {
      return json
    })
  }

  getOrganizationData(organization) {
    let callParams = "page=0&limit=20&sort=NAME&order=ASC"
    let callPath = organization;
    this.swaggerhub('GET', callPath, callParams).then(response => {
      this.setState({
        orgAPIData: response.apis
      })
    })
  }

  getAPIData(apiLink) {
    let apiURL = "https://api.swaggerhub.com/apis/" + apiLink

    this.setState({
      apiData: apiURL
    })
  }

  render() {
    let orgName = this.state.orgData.orgName
    let displayImage = this.state.orgData.displayImage

    return (
      <div className="App">
        <header className="App-header">
          <img src={displayImage} className="App-logo" alt="logo" />
          <h1 className="App-title">{orgName}</h1>
        </header>
        <div className="page-body">
          <Sidebar
            orgData={this.state.orgData}
            orgAPIData={this.state.orgAPIData}
            getOrganizationData={this.getOrganizationData}
            getAPIData={this.getAPIData}
          />
          <div>
            <div id="docs"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
