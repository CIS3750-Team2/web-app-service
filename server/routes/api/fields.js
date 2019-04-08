const Request = require('request');

module.exports = (apiUrl) => (req, res) => {
    req.pipe(Request(`${apiUrl}/sunshine/fields`)).pipe(res);
};
