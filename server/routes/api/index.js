const apiUrl = process.env.API_SERVICE
    || (process.env.NODE_ENV === 'development'
            ? 'http://localhost:8081'
            : 'http://api.sunshinedial.com/'
    );

module.exports = (app) => {
    app.get('/api/list', require('./list')(apiUrl));
    app.get('/api/count', require('./count')(apiUrl));
    app.get('/api/export', require('./export')(apiUrl));
};
