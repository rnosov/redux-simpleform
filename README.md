# Redux SimpleForm Component

Quickly create simple React forms styled with Bootstrap 4.

## Live Examples 

Two examples are available: 

1. [Contact Form](https://www.solarleague.org/about/contact/)
2. [Volunteer Form](https://www.solarleague.org/about/volunteering/)

## Introduction

`redux-simpleform`  is a package that simplifies the process of submitting of [SimpleForms](https://www.npmjs.com/package/simpleform) to your RESTful API endpoints. The state of the process is kept in the Redux store but not the contents of the form itself.

To install the package run the following command in the command prompt:

```sh
npm install redux-simpleform redux react-redux bootstrap@4.0.0-alpha.4 --save

```

Import `redux-simpleform` in the component where you want to use it like so:

```javascript
import 'bootstrap/dist/css/bootstrap.css'; //import Bootstrap if you haven't done it already
import SimpleForm, { formReducer } from 'redux-simpleform'; 
```


Create Redux store with the supplied reducer. `formReducer` must be on the `simpleform` key:

```javascript
const store = createStore(
  combineReducers({
    ...reducers,
    simpleform: formReducer
  })
);

```

Now you're ready to use it inside your render method:

```javascript
<SimpleForm
  formName="testForm"
  endpoint="https://localhost:10000/your/rest/api/endpoint"
  fields={[
    "name: |Jane Doe",
    "phone: *tel|+44 207 123 4567|Enter your phone number|Phone Number",
  ]}        
/>
```

Refer to [SimpleForm](https://www.npmjs.com/package/simpleform) documentation on how to create form fields.

## Documentation

### Redux SimpleForm Properties

- `endpoint` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** RESTful API endpoint that is responsible for processing the form data. **Required**.
- `formName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** A name that would be used to distinguish the form from other forms in the Redux store. Defaults to "redux-form". **Optional**.
- `onResponse` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)** Async function that is responsible for processing server response. **Optional**.
- `onFormWillFetch` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)** Function that is called just before form will be sent to the endpoint. It gets one argument (form data object) and must return transformed form data object. **Optional**.
- `fetchFunc` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)** Custom fetch function. Called with one argument (form object ). Must return a promise. **Optional**.
- `waitText` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Text displayed when form is being uploaded . Defaults to "Uploading form. Please wait ...". **Optional**.
- `errorText` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Text displayed when form has encountered errors on upload. Defaults to "Houston, we have a problem!". **Optional**.
- `successText` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Text displayed when form is uploaded without any issues. Defaults to "Your form has been submitted successfully". **Optional**.
- `welcomeText` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Text displayed when form is initially displayed. Defaults to "Welcome, please fill in the form below:". **Optional**.
- `scrollOrigin` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** [react-scroll](https://github.com/fisshy/react-scroll) element name that should be somewhere near the form. Once the submission is in progress viewport will be scrolled there. **Optional**.

### Children

Children are **ignored**.

### Polyfill

`redux-simpleform` is dependent upon the `fetch` function being available. Therefore, for older browsers you might want to polyfill it with the [whatwg-fetch](https://github.com/github/fetch).

### Universal Rendering

This package is compatible with universal or server side rendering (SSR).

## Step by Step Instructions

In order to start from scratch we'll use Facebook react starter kit called [Create React App](https://github.com/facebookincubator/create-react-app). In the command prompt type:


```sh
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm install simpleform bootstrap@4.0.0-alpha.4 --save
subl src/App.js #open with Sublime Text. Or use any other text editor.
npm start

```

Copy and paste the following code into app.js:

```javascript
import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'; // redux store utilities
import 'bootstrap/dist/css/bootstrap.css'; 
import SimpleForm, { formReducer } from 'redux-simpleform'; 
import logo from './logo.svg';
import './App.css';

const store = createStore(
  combineReducers({
    simpleform: formReducer,
  })
);

class App extends Component {
  render() {
    return (
      <div className="App">    
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="container">
          <SimpleForm
            store={store} 
            formName="testForm"
            endpoint="https://localhost:10000/your/reast/api/endpoint"
            fields={[
              "name: |Jane Doe",
              "phone: *tel|+44 207 123 4567|Enter your phone number|Phone Number",
            ]}
          />
        </div>
      </div>
    );
  }
}

export default App;
```

Save it, then open [http://localhost:3000/](http://localhost:3000/) to see the result.

## Forking This Package

Clone the this repository using the following command:

```sh
git clone https://github.com/rnosov/simpleform.git
```

In the cloned directory, you can run following commands:

### `npm install`

Installs required node modules

### `npm run build`

Builds the package for production to the `dist` folder

### `npm test`

Runs tests

## License

Copyright © 2016 Roman Nosov. This source code is licensed under the MIT license.
