const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const keys = require('../config/keys');

const callbackURL = process.env.callbackURL || 'http://localhost:3000/callback';

module.exports = function (app) {
	// Middleware
	app.use(passport.initialize());
	app.use(passport.session());

	////// Cookies//////
	//get id from current/new user
	passport.serializeUser(function (user, done) {
		console.log('USER ID: ', user.id);
		done(null, user.id);
	});
	//find the user based on the id (step above)
	passport.deserializeUser(function (id, done) {
		db.User.findById(id)
			.then(function (user) {
				done(null, user);
			});
	});

	//////////Passport setup for Local Strategy////////////
	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			session: false,
			passReqToCallback: true
		},
		function (req, email, password, done) {
			console.log("PASSWORD HIT line 36 auth func", req.body);
			var password = req.body.password;
			var email = req.body.email;
			db.User.findOne({
					email: email
				}
				// , (error, currentUser) => {
				// 	if (error) {
				// 		return done(error);
				// 	}
				// 	if (!currentUser) {
				// 		return done(null, false, {
				// 			message: "Incorrect username"
				// 		})
				// 	}
				// 	if (!currentUser.checkPassword(password)) {
				// 		return done(null, false, {
				// 			message: "Incorrect password"
				// 		})
				// 	}
				// }
				)
				.then(function (currentUser) {
					if (currentUser) {
						//user already exists
						console.log('Current User Is: ', currentUser);
						//user passed into cookie/serializer
						done(null, currentUser);
					} else {
						console.log("EXISTING USER NOT FOUND");
						// create user in db
						// db.User.create({
						// 	password: password,
						// 	email: email
						// }).then(function (newUser) {
						// 	console.log(newUser, ' created NEW USER');
						// 	//user passed into cookie/serializer
						// 	done(null, newUser);
						// });
					}
				});
		}));
};