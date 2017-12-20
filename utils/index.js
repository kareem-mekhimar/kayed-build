"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeBase64AndReturnUrl = writeBase64AndReturnUrl;
exports.handleImgs = handleImgs;
exports.isValidImgUrl = isValidImgUrl;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeBase64AndReturnUrl(base64String, name, req) {

  var mimeType = base64MimeType(base64String);
  var extension = mimeType.split("/")[1];

  var base64Data = base64String.split(';base64,').pop();

  var appUrl = req.protocol + '://' + req.get('host');
  var fileName = name + "." + extension;

  _fs2.default.writeFile(__dirname + "/../uploads/" + fileName, base64Data, { encoding: 'base64' }, function (err) {
    console.log('File created ' + err);
  });

  return appUrl + "/uploads/" + fileName;
}
function handleImgs(imgs) {
  var folderName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var relatedId = arguments[2];
  var req = arguments[3];

  var imgsUrls = [];
  folderName = folderName ? folderName + "/" : "";
  for (var i = 0; i < imgs.length; i++) {
    imgsUrls.push(writeBase64AndReturnUrl(imgs[i], folderName + relatedId + i, req));
  }
  return imgsUrls;
}

function isValidImgUrl(url) {
  return url.match(/\.(jpeg|jpg|png)$/) != null;
}

function base64MimeType(encoded) {
  var result = null;

  if (typeof encoded !== 'string') {
    return result;
  }

  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}

/*
  {
"fullName": "miso",
"email": "misho@misho.com",
"password": "1234",
"address": "1234",
"phone": "1234566",
"country": "string",
"img":"data:image/jpeg;base64,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"
}
*/
//# sourceMappingURL=index.js.map