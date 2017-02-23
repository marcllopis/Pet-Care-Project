const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const ratingSchema = new Schema({
  	stars: Number,
  	evaluation: String,
    date: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    petcaretaker: { type: Schema.Types.ObjectId, ref: 'User' }
	}, {
  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
