'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ApiResponse2 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiResponse = function () {
    function ApiResponse(data, page, pageCount, limit, totalCount) {
        _classCallCheck(this, ApiResponse);

        this.links = {};

        this.data = data;
        this.page = page;
        this.pageCount = pageCount;
        this.limit = limit;
        this.totalCount = totalCount;
    }

    _createClass(ApiResponse, [{
        key: 'addSelfLink',
        value: function addSelfLink(req) {
            var appUrl = req.protocol + '://' + req.get('host') + _url2.default.parse(req.originalUrl).pathname;
            this.links.self = appUrl + "?page=" + this.page + "&limit=" + this.limit;
        }
    }, {
        key: 'addNextLink',
        value: function addNextLink(req) {
            var appUrl = req.protocol + '://' + req.get('host') + _url2.default.parse(req.originalUrl).pathname;
            var afterPage = this.page + 1;
            this.links.next = appUrl + "?page=" + afterPage + "&limit=" + this.limit;
            this.links.last = appUrl + "?page=" + this.pageCount + "&limit=" + this.limit;
        }
    }, {
        key: 'addPrevLink',
        value: function addPrevLink(req) {
            var appUrl = req.protocol + '://' + req.get('host') + _url2.default.parse(req.originalUrl).pathname;
            var prevPage = this.page - 1;
            this.links.first = appUrl + "?page=1" + "&limit=" + this.limit;
            this.links.prev = appUrl + "?page=" + prevPage + "&limit=" + this.limit;
        }
    }]);

    return ApiResponse;
}();

var ApiResponse2 = exports.ApiResponse2 = function () {
    function ApiResponse2(data, page, pageCount, limit, totalCount, req) {
        _classCallCheck(this, ApiResponse2);

        this.links = {};

        this.data = data;
        this.page = page;
        this.pageCount = pageCount;
        this.limit = limit;
        this.totalCount = totalCount;
        this.addSelfLink(req);
        if (page > 1) this.addNextLink(req);
        if (page < pageCount) this.addPrevLink(req);
    }

    _createClass(ApiResponse2, [{
        key: 'addSelfLink',
        value: function addSelfLink(req) {
            var appUrl = req.protocol + '://' + req.get('host') + _url2.default.parse(req.originalUrl).pathname;
            this.links.self = appUrl + "?page=" + this.page + "&limit=" + this.limit;
        }
    }, {
        key: 'addNextLink',
        value: function addNextLink(req) {
            var appUrl = req.protocol + '://' + req.get('host') + _url2.default.parse(req.originalUrl).pathname;
            var afterPage = this.page + 1;
            this.links.next = appUrl + "?page=" + afterPage + "&limit=" + this.limit;
            this.links.last = appUrl + "?page=" + this.pageCount + "&limit=" + this.limit;
        }
    }, {
        key: 'addPrevLink',
        value: function addPrevLink(req) {
            var appUrl = req.protocol + '://' + req.get('host') + _url2.default.parse(req.originalUrl).pathname;
            var prevPage = this.page - 1;
            this.links.first = appUrl + "?page=1" + "&limit=" + this.limit;
            this.links.prev = appUrl + "?page=" + prevPage + "&limit=" + this.limit;
        }
    }]);

    return ApiResponse2;
}();

exports.default = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map