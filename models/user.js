const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
 surname: String,
   email: String,
 password: String,
 profilePicture: String, //Need to check how to do it
 address: {
   streetName: String,
   number: String,
   zipCode: String,
   city: String,
   Country: String
 },
 phoneNumber: String,
  	role: {
    	type: String,
    	enum : ['EDITOR', 'ADMIN'],
    	default : 'ADMIN'
  	}
	},
  {
  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
