var JSONPath = require('JSONPath');
var exports = module.exports = {};

exports.getValueFromJson = function getValueFromJson(json, xpath) {
  try {
      var jsonValue = JSON.parse(json);
      var values = JSONPath("", xpath, jsonValue, "");
      } catch (e) {
          var values = JSONPath("", xpath, json, "");
      }
  return values;
};

exports.getResponse = function getResponse(Service, url, method) {
  var r = Service.rawRequest({
    method: method,
    json: false,
    uri: url,
  });
  return r.data.body;
};
