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
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    petcaretaker: { type: Schema.Types.ObjectId, ref: 'User' }
  	}, {
  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
