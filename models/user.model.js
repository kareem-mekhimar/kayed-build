"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: [true, "Duplicated Email"],
        validate: {
            validator: function validator(email) {
                return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                );
            },
            message: 'Invalid Email Syntax'
        },
        required: [true, "Email Required.."]
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
});

UserSchema.pre("save", function (next) {
    var account = this;

    _bcryptjs2.default.hash(account.password, 10).then(function (hash) {
        account.password = hash;
        next();
    }).catch(function (err) {
        return console.log(err);
    });
});

UserSchema.methods.isValidPassword = function (newPassword, callback) {
    var user = this;
    _bcryptjs2.default.compare(newPassword, user.password, function (err, isMatch) {
        if (err) return callback(err);

        callback(null, true);
    });
};

UserSchema.set('toJSON', {
    transform: function transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
    }
});

exports.default = _mongoose2.default.model("user", UserSchema);
//# sourceMappingURL=user.model.js.map