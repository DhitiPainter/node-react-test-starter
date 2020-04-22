const { createLogger, transports } = require('winston');

const logger = createLogger({
    level: 'error',
    transports: [
        new transports.File({
            filename: 'error.log',
            level: 'error'
        })
    ]
});

exports.logError = (message, err, req) => {
    logger.error(new Date().toISOString());
    logger.error(req.path);
    logger.error(message);
    logger.error(err);
}