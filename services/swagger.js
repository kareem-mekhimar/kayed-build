'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _swaggerJsdoc = require('swagger-jsdoc');

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var swaggerDefinition = {
    info: {
        title: 'Kayed Api',
        version: '1.0.0',
        description: 'Kayed Rest Api'
    },
    host: 'kayed-api.herokuapp.com',
    basePath: '/api/v1',
    securityDefinitions: {
        JWT: {
            type: "apiKey",
            description: "Ex: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
            name: "Authorization",
            in: "header"
        }
    },
    security: [{
        "JWT": []
    }]

};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./src/routes/*.js']
};

var swaggerSpec = (0, _swaggerJsdoc2.default)(options);

exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map