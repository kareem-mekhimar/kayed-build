"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var AuctionOfferSchema = new Schema({

    bidder: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    relatedAuction: {
        type: Schema.Types.ObjectId,
        ref: "auction",
        required: true
    },
    winned: {
        type: Boolean,
        default: false
    }

});

AuctionOfferSchema.set('toJSON', {
    transform: function transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

exports.default = _mongoose2.default.model("auction-offer", AuctionOfferSchema);
//# sourceMappingURL=auction-offer.model.js.map