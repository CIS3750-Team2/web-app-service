const Request = require('request');

const apiUrl = process.env.API_URL
    || (process.env.NODE_ENV === 'development'
        ? 'http://localhost:8081'
        : 'http://sunshinedial.com/api'
    );

module.exports = (app) => {
    app.get('/data', (req, res) => {
        req.pipe(Request(`${apiUrl}/sunshine`)).pipe(res);
    });
};
