const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({

	username: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true
	},
	isArtist: {
		type: Boolean,
		required: true,
		default: false,
	},
	aboutArtist: {
		type: String,
	},
	okToContact: {
		type: Boolean,
		default: false,
	},
	googleId: {
		type: String
	},
	artwork: [{
		type: Schema.Types.ObjectId,
		ref: "Artwork"
	}]

});

////COMPARE and HASH Passwords///
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model("User", userSchema);

module.exports = User;