"use strict";

const logger = require("../utils/logger");
const stationStore = require('../models/station-store.js');
const uuid = require('uuid');
const conversion = require('../utils/conversion.js');


const analytics = {
  
     updateWeather: function (station) {
    
    if (station.readings.length > 0) {
      let lastReading = station.readings[station.readings.length -1];
      station.code = lastReading.code;
      station.weatherCode = conversion.weatherCode(lastReading.code);
      
      station.tempC = lastReading.temperature;
      station.tempF = conversion.tempF(lastReading.temperature);
     
      station.windSpeed = lastReading.windSpeed
      station.windBft = conversion.beaufort(lastReading.windSpeed);
      station.windChill = analytics.windChill(lastReading.temperature, lastReading.windSpeed);
      station.windCompass = conversion.degreesToCompass(lastReading.windDirection);
     
      
      station.pressure = lastReading.pressure;
    }
    },
  
  windChill(temp, windspeed) {
    return 13.12 + 0.6215 * temp -  11.37 * (Math.pow(windspeed, 0.16)) + 0.3965 * temp * (Math.pow(windspeed, 0.16));
  },

      
    };

module.exports = analytics