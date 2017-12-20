'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var BarterOfferNotificationSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    offerUser: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    relatedBarter: {
        type: Schema.Types.ObjectId,
        ref: "barter",
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    seen: {
        type: Boolean,
        default: false
    }
});

BarterOfferNotificationSchema.set('toJSON', {
    transform: function transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

exports.default = _mongoose2.default.model("barter-offer-notification", BarterOfferNotificationSchema);
//# sourceMappingURL=barter-offer-notification.model.js.map