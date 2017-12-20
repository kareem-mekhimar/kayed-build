'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var BarterOfferSchema = new Schema({
    relatedBarter: {
        type: Schema.Types.ObjectId,
        ref: 'barter',
        required: [true, 'Id of barter is required']
    },
    relatedUser: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Id of user is required']
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    offeredProduct: {
        type: String,
        required: [true, 'offeredProduct is required']
    },
    imgs: {
        type: [String],
        required: [true, 'IMGS of barterOffer is required']
    },
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'DONE'],
        default: 'PENDING'
    }
});

BarterOfferSchema.set('toJSON', {
    transform: function transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

exports.default = _mongoose2.default.model("barterOffer", BarterOfferSchema);
//# sourceMappingURL=barter-offer.model.js.map