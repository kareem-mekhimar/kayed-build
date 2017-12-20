'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var PushNotificationsSchema = new Schema({
  relatedUser: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  endpoint: String,
  keys: {
    p256dh: String,
    auth: String
  }
});

PushNotificationsSchema.set('toJSON', {
  transform: function transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

exports.default = _mongoose2.default.model("push-notifications", PushNotificationsSchema);
//# sourceMappingURL=push.model.js.map