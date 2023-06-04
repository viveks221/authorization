'use strict'
const utilites = require("../../utilities");
const logger = utilites.logger;

const log = logger('sanitize');
const functionName = "sanitize-middleware";

let sanitize = (req, res, next) => {
  const payload = req.body;
  const sanitized_payload = {};
  log.info(functionName, "Incoming Headers", JSON.stringify(req.headers));
  log.info(functionName, "Req Body", JSON.stringify(payload));

  //Sanitize input payload - Example
  if (payload.Source || payload.source || payload.source_name || payload.sourcename ) {
    sanitized_payload.Source = (payload.Source || payload.source || payload.source_name || payload.sourcename).toString().trim();
  }
  if (payload.appname || payload.app_name || payload.app|| payload.App) {
    sanitized_payload.App = (payload.App || payload.app_name || payload.app|| payload.appname).toString().trim();
  }

  req.payload = sanitized_payload;

  next();
}


module.exports = sanitize;