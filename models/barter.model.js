"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require("./user.model");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var BarterSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title of barter is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'description of barter is required']
    },
    neededProduct: {
        type: String,
        required: [true, 'neededProduct of barter is required']
    },
    relatedUser: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Id of user is required']
    },
    relatedCategory: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'Id of category is required']
    },
    type: {
        type: String,
        enum: ['TEMP', 'PERM'],
        default: 'TEMP'
    },
    imgs: {
        type: [String]
    },
    finished: {
        type: Boolean,
        default: false
    },
    barterOffer: {
        type: Schema.Types.ObjectId,
        ref: 'barterOffer'
    },
    favUsers: {
        type: [Schema.Types.ObjectId],
        ref: 'user'
    },
    offerUsers: {
        type: [Schema.Types.ObjectId],
        ref: 'user'
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});
BarterSchema.index({ title: 'text', description: 'text' });

BarterSchema.set('toJSON', {
    transform: function transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.favUsers;
        delete ret.offerUsers;
    }
});

// BarterSchema.pre("init", function (next, req, callback) {
//     const barter = this;    
//     if(barter.offerUsers.indexOf(req.user.id) > -1)
//     barter.inMyOffers = true;
//     else this.barter.inMyOffers = false;
// });


// BarterSchema.virtual('inMyOffers').get(function () {
//     console.log("offerUsers: " , this.offerUsers)
//     console.log("USER: " , req.user.id)    
//   return this.offerUsers.indexOf(req.user.id) > -1;
// })

// BarterSchema.pre('find', function (next) {
//     // let barter = this;    
//     // console.log("UserID: ", this.options.userId);
//     // if(.offerUsers.indexOf(this.options.userId) > -1)
//     //     barter.inMyOffers = true;
//     // else barter.inMyOffers = false;
//     // next();
// });

// .set(function (setFullNameTo) {
//   var split = setFullNameTo.split(' ')
//     , firstName = split[0]
//     , lastName = split[1];

//   this.set('name.first', firstName);
//   this.set('name.last', lastName);
// });
var Barter = _mongoose2.default.model('barter', BarterSchema);

exports.default = Barter;
//# sourceMappingURL=barter.model.js.map