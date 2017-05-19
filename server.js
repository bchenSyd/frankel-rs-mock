'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mockSchema = require('./dist/mockSchema');

var _mockSchema2 = _interopRequireDefault(_mockSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Expose a GraphQL endpoint
var graphQLServer = (0, _express2.default)();
graphQLServer.use((0, _cors2.default)({
    origin: 'http://localhost:3002',
    credentials: true
}));
graphQLServer.use('/', (0, _expressGraphql2.default)({ schema: _mockSchema2.default, graphiql: true, pretty: true }));

var GRAPHQL_PORT = process.env.port || 8000;
graphQLServer.listen(GRAPHQL_PORT, 'localhost', function () {
    return console.log('GraphQL Server is now running on http://localhost:' + GRAPHQL_PORT);
});

//# sourceMappingURL=server.js.map