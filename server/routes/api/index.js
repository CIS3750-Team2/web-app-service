const apiUrl = process.env.API_URL
    || (process.env.NODE_ENV === 'development'
            ? 'http://localhost:8081'
            : 'http://api.sunshinedial.com/'
    );

module.exports = (app) => {
    app.get('/api/list', require('./list')(apiUrl));
};
