const Request = require('request');

module.exports = (apiUrl) => (req, res) => {
    const {xField, yField, yMethod} = req.params;
    let url = `${apiUrl}/sunshine/plot/${yField}/${yMethod}/vs/${xField}?${req.url.split('?')[1] || ''}`;
    req.pipe(Request(url)).pipe(res);
};
