"use strict";

const logger = require("../utils/logger");
const stationStore = require('../models/station-store.js');
const uuid = require('uuid');
//const station = require("./controllers/station.js");
const analytics =require("../utils/analytics.js");


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Weather-Top Dashboard",
      stations: stationStore.getAllStations(),
    };
    logger.info('about to render', stationStore.getAllStations());
    response.render("dashboard", viewData);
  },
  
   deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },
  
  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: [],
    };
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
