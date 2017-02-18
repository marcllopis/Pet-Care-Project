const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const requestSchema = new Schema({
  	status: Boolean, //this means if the request is accepted or denied
    amountPayed: Number
    //we may need to add more stuff here
  	}, {
  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
