const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const ratingSchema = new Schema({
  	stars: String,
    numberOfEvaluations: Number,
  	evaluation: String,
    date: Date,
    userRelated: String, //This is the user who is writing the evaluation
    userEvaluated: String //This is the user who receives the evaluation
	}, {
  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
