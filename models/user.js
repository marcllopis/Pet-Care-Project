const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  	name: String,
    surname: String,
  	email: String,
    password: String,
    profilePicture: String, //Need to check how to do it
    address: String,
    location: { type: { type: String }, coordinates: [Number] },
    phoneNumber: String,
    role: {
       type: String,
       enum : ['PETTAKER', 'OWNER','BOTH'],
       default : 'OWNER'
     },
    isPetTaker : { type: Boolean, default: false },
    //stuff needed for pet taker

    pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
    description: String,
    price: Number,
    slogan: String,
    status: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
    score: Array
	}, {

  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

userSchema.index({ location: '2dsphere' });

const User = mongoose.model("User", userSchema);

module.exports = User;
