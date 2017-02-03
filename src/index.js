import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer'
import {CampFilterAppContainer} from './CampFilterApp';
import './index.css';
var moment = require('moment');
import 'babel-polyfill'
import thunkMiddleware from 'redux-thunk'
import {fetchWeather} from './action_creators'

const store = createStore(reducer, applyMiddleware(
    thunkMiddleware
  ))


// convert json into dict for use by the React components
// add mapOn variable to indicate if the marker should be visible
// by default, set mapOn to false, filtering will indicate if it should be true
function get_campgrounds(features) {
  let campgrounds = []
  features.forEach(feature => {
    campgrounds.push({
      'title' : feature['properties']['title'],
      'description' : feature['properties']['description'],
      'position' : [feature['geometry']['coordinates'][1],
      feature['geometry']['coordinates'][0]],
      'properties': feature['properties'],
      'image': feature['properties']['image'],
      'url': feature['properties']['url'],
      'mapOn': true

    })
  });
  return campgrounds
}


let features = [{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-122.166149, 42.865508]
  },
  "properties": {
    "flush": true,
    "shower": true,
    "pets": true,
    "water": true,
    "description": "Flush toilet, Shower",
    "title": "Mazama",
    "image": "mazama.jpg",
    "url": "http://www.craterlakelodges.com/lodging/mazama-village-campground/",
    "marker-size": "small"
  }
}, {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-122.037881, 42.879145]
  },
  "properties": {
    "flush": true,
    "shower": false,
    "pets": false,
    "water":true,
    "description": "Flush toilet",
    "title": "Lost Creek",
    "url": "http://www.nps.gov/crla/planyourvisit/campgrounds.htm",
    "image": "lostcreek.jpg",
    "marker-size": "small"
  }
}, {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-122.337174, 42.877807]
  },
  "properties": {
    "flush": false,
    "shower": false,
    "pets": true,
    "water": false,
    "description": "Vault toilet",
    "title": "Huckleberry Mountain",
    "url": "https://www.fs.usda.gov/recarea/rogue-siskiyou/recreation/ohv/recarea/?recid=69764&actid=29",
    "image": "huckleberry.jpg",
    "marker-size": "small"
  }
}, {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-122.463867, 42.889648]
  },
  "properties": {
    "flush": false,
    "shower": false,
    "pets": true,
    "water": false,
    "description": "Vault toilet",
    "title": "Natural Bridge -USFS",
    "url": "https://www.fs.usda.gov/recarea/rogue-siskiyou/null/recarea/?recid=69828&actid=29",
    "image": "naturalbridge.jpg",
    "marker-size": "small"
  }
}, {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-121.924772, 42.884588]
  },
  "properties": {
    "flush": false,
    "shower": false,
    "pets": true,
    "water": true,
    "description": "Vault toilet",
    "title": "Scott Creek",
    "url": "https://www.fs.usda.gov/recarea/fremont-winema/recreation/recarea/?recid=59719&actid=31",
    "image": "scottcreek.jpg",
    "marker-size": "small"
  }
}, {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-122.45, 42.9102777778]
  },
  "properties": {
    "flush": false,
    "shower": false,
    "pets": true,
    "water": true,
    "description": "Vault toilet",
    "title": "Union Creek",
    "url": "https://www.fs.usda.gov/recarea/rogue-siskiyou/recarea/?recid=69922",
    "image": "unioncreek.jpg",
    "marker-size": "small"
  }
}, {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-122.4353305556, 42.9162388889]
  },
  "properties": {
    "flush": false,
    "shower": false,
    "pets": false,
    "water": true,
    "description": "",
    "title": "Farewell Bend Campground",
    "url": "https://www.fs.usda.gov/recarea/rogue-siskiyou/null/recarea/?recid=69720&actid=29",
    "image": "farewellbend.jpg",
    "marker-size": "small"
  }
}]

set_state(get_campgrounds(features))

function set_state(campgrounds) {
  let today = moment()

  store.dispatch ({
  type: 'SET_STATE',
  state: {
    filters: [
      {id: 'shower', inuse: false },
      {id: 'pets', inuse: false },
      {id: 'flush', inuse: false },
      {id: 'water', inuse: false }
    ],
    markers: campgrounds,
    gmapMarkers: [],
    showingInfoWindow: false,
    activeMarker: null,
    selectedTitle: "",
    currentDate: today,
    weatherSummary: "",
    currentLat: 42.9456,
    currentLong: -122.2,
    selectedDate: undefined
    }
 })
}

ReactDOM.render(
  <Provider store={store}>
  <CampFilterAppContainer />
</Provider>,
  document.getElementById('root')
);
