const Request = require('request');

module.exports = (apiUrl) => (req, res) => {
    req.pipe(Request(`${apiUrl}/sunshine/count?${req.url.split('?')[1] || ''}`)).pipe(res);
};
