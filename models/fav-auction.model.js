'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var FavAuctionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Id of user is required']
    },
    auction: {
        type: Schema.Types.ObjectId,
        ref: 'auction',
        required: [true, 'Id of auction is required']
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
}, { strict: false });

FavAuctionSchema.set('toJSON', {
    transform: function transform(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
    }
});

exports.default = _mongoose2.default.model("fav-auction", FavAuctionSchema);
//# sourceMappingURL=fav-auction.model.js.map