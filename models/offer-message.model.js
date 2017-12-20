'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var OfferMessageSchema = new Schema({

    relatedUser: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    relatedBarterOffer: {
        type: Schema.Types.ObjectId,
        ref: 'barterOffer',
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

OfferMessageSchema.set('toJSON', {
    transform: function transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

exports.default = _mongoose2.default.model("offer-message", OfferMessageSchema);
//# sourceMappingURL=offer-message.model.js.map