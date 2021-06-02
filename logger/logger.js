const {
    createLogger,
    transports,
    format,
  } = require('winston');
  
  /**
   * @description   : here we are creating logs for info and error to get the logs
   * 
   * @method        : createLogger to create logs
  */
  const logger = createLogger({
    transports: [
      new transports.File({
        filename: './logger/info.log',
        level: 'info',
        format: format.combine(format.timestamp(), format.json()),
      }),
      new transports.File({
        filename: './logger/error.log',
        level: 'error',
        format: format.combine(format.timestamp(), format.json()),
      }),
    ],
  });

  module.exports = logger;
