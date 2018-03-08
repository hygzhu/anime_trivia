# react-redux-template

## Description
Making a reusable template with the following features:
* For development in React & Redux
* Utilizes Webpack
* Has Hot Module Replacement
* Deploys to Github Pages
* Environment Variables can be stored in a *.env* file (See Below)

## Usage
Uses yarn. Running *yarn install* will install all dependencies and *yarn start* will start the *webpack-dev-server*
```shell
yarn install
yarn start
```

## Source Directory File Structure
```
|-- src/
|-- |-- actions/
|-- |-- components/
|-- |-- |-- (Directories for components)/
|-- |-- |-- |-- action.js
|-- |-- |-- |-- component.js
|-- |-- |-- |-- component.css
|-- |-- |-- |-- reducer.js
|-- |-- containers/
|-- |-- reducers/
|-- |-- |-- index.js
|-- |-- app.css
|-- |-- app.js
|-- |-- index.html
|-- |-- index.js
|-- |-- store.js
```

This file system is structured around keeping separate features modularized:
* Each *component* is stored in its own directory, along with any corresponding *actions*, *reducers* and *styles*.
* The collection of all components within the *components/* directory.
* The *actions/* directory can store any global actions
* The *containers/* directory can store any global containers
* The *reducers/* directory contains a single file *index.js*, which combines reducers from the entire app. Global reducers can be added here as well.
* *app.js* is a container for the content of the app
* *index.js* wraps the app in the necessary *AppContainer* (for HMR) and the *Provider* (for Redux)
* *store.js* defines the store for the app
* *index.html* is our entry point for the app.  

## Environment Variables
The *dotenv-webpack* plugin has been included in the webpack.

Usage:
```
// .env file
API_KEY=supersecretkey
```
```
// file.js
console.log(process.env.API_KEY); //supersecretkey
```

## Todo
- [ ] Considering adding React Router into the template
- [ ] Considering using webpack-dev-middleware and webpack-hot-middleware over React Hot Loader for increased customizability
