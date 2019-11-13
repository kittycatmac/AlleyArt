const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artworkSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	artist: {
		type: String,
		required: true
	},
	artistID: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	address: {
		type: String,
		default: "Not Available"
	},
	city: {
		type: String,
		default: "Not Available"
	},
	state: {
		type: String,
		default: "Not Available"
	},
	zipCode: {
		type: String,
		default: "Not Available"
	},
	formattedAddy: {
		type: String,
		default: "Not Available"
	},
	lat: {
		type: Number,
		required: true
	},
	lng: {
		type: Number,
		required: true
	},
	description: {
		type: String
	},
	likes: {
		type: Number,
		default: 0
	},
	favoritedBy: [{
		type: Schema.Types.ObjectId,
		ref: "User"
	}]
});

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;