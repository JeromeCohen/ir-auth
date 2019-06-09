const axios = require('axios');

module.exports = async function(context,req) {
    headers = {
        'Ocp-Apim-Subscription-Key': process.env['SUBSCRIPTION_KEY'],
        'content-type': 'application/x-www-form-urlencoded'
    }
    await axios.post(process.env['ENDPOINT'] + '/issueToken', {}, {headers: headers}).then((res) => {
      context.res = {
        status: 200,
        headers: {'Access-Control-Allow-Origin' : '*'},
        body: res.data
      }
    }).catch((err) => {
      context.res = {
        status: 500,
        body: 'error'
      }
    })
};
