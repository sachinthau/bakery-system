const { v4: uuidv4 } = require('uuid');

/**
 * Generate UUIDs
 */
exports.uuidGenerator = () => {
    return uuidv4();
}

exports.generateResponse = (message = "Server error.") => {
    return { message: message };
}

/**
 * 
 * @param {Number} status 
 * @param {String} message 
 * @returns 
 */
exports.generateCustomResponse = (message, status = 0) => {
    // status = 0 {success}, 10 {show message for user}
    return {
        message: message,
        status: status
    };
}
