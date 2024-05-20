import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/application';
import reportWebVitals from './reportWebVitals'
import { datadogRum } from '@datadog/browser-rum'
import { datadogLogs } from '@datadog/browser-logs'

const {
  REACT_APP_DATADOG_CLIENT_TOKEN,
  REACT_APP_DATADOG_APPLICATION_ID
} = process.env

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()


datadogRum.init({
    applicationId: REACT_APP_DATADOG_APPLICATION_ID as string,
    clientToken: REACT_APP_DATADOG_CLIENT_TOKEN as string,
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'us3.datadoghq.com',
    service: 'linkdrop-dashboard',
    env: '<ENV_NAME>',
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0', 
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
})

datadogLogs.init({
  clientToken: REACT_APP_DATADOG_CLIENT_TOKEN as string,
  site: 'us3.datadoghq.com',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
  trackSessionAcrossSubdomains: true
})