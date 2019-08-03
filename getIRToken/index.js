const axios = require('axios');
const querystring = require('querystring');

module.exports = async function (context, req) {
        headers = {
                'content-type': 'application/x-www-form-urlencoded'
        }

        const requestBody = {
                grant_type: 'client_credentials',
                client_id: process.env['CLIENT_ID'],
                client_secret: process.env['CLIENT_SECRET'],
                resource: 'https://cognitiveservices.azure.com/'
        }
        await axios.post(`https://login.windows.net/${process.env['TENANT_ID']}/oauth2/token`, querystring.stringify(requestBody), { headers: headers }).then((res) => {
                context.res = {
                        status: 200,
                        headers: { 'Access-Control-Allow-Origin': '*' },
                        body: res.data
                }
        }).catch((err) => {
                context.res = {
                        status: 500,
                        body: err
                }
        })
};
