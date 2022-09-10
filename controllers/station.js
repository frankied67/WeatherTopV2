'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const uuid = require('uuid');
const analytics = require('../utils/analytics.js');
const conversion = require('../utils/conversion.js');


const station = {
  index(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    logger.info('Station id = ', stationId);
    analytics.updateWeather(station);
   
    const viewData = {
      name: 'Station',
      station: stationStore.getStation(stationId),
    };
    response.render('station', viewData);
  },
  
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  },
  
   addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
      date: request.body.date,
    };
    stationStore.addReading(stationId, newReading);
    //analytics.updateWeather(station);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;