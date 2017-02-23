const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const petSchema = new Schema({
  	name: String,
    photo: String, // need to check how to do it
  	description: String,
    typeOfAnimal: String,
    age: String,
    gender: String,
    userRelated: String,
    healthInfo: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' }

	}, {
  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
