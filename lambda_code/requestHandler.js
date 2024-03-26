const request = require('request')

module.exports = {
    MustRequest(options) {
    return new Promise((res, rej) => {
      request(options, function (error, response, body) {
        if (error) {
          rej(error);
        }
        try {
          let data = JSON.parse(body);
          res(data);
        } catch (err) {
          rej(new Error(`JSON parse Error because of request result is ${body}`));
        }
      });
    });
  },
}