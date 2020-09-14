/**
 * log module
 *
 * This module performs debug logging
 *
 * @module lib/log
 */

 /**
 * Log a message
 * 
 * @param {String} message the message to log to the console
 */
module.exports = function(message) {
    if('DEBUG' in process.env && process.env.DEBUG == 'console') {
        console.log(message);
    }
};
