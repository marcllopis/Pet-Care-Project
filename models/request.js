
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const requestSchema = new Schema({
    start: Date,
    end:   Date,
    starttime: String,
    endtime: String,
    hours: Number,
    numberofdays: Number,
    comment: String,
    service: String,
    accepted: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    petcaretaker: { type: Schema.Types.ObjectId, ref: 'User' },
    pet: [{ type: Schema.Types.ObjectId, ref: 'Pet' }]
  	}, {
  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
