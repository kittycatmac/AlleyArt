const router = require("express").Router();
const passport = require('passport');
const key = require("../../config/keys");
//create an authcheck to confirm user is logged in on certain pages. If not, return to home page

//////////AUTH w/ LOCAL Strategy////////
router
	.post('/login',
		passport.authenticate('local'), function (req, res) {
			let mapAPI = key.google.mapAPI;
			console.log("MAP API", mapAPI);
			var userInfo = {
				username: req.user.username,
				userId: req.user.id,
				isArtist: req.user.isArtist,
				mapAPI: mapAPI
			}
			if (res.statusCode === 200) {
				console.log('LOGIN STATUS CODE: ', res.statusCode);
				res.send(userInfo).status(200);
			}
			else {
				console.log('LOGIN STATUS CODE: ', res.statusCode);
				res.send().status(req.statusCode);
			}
		}
	);

////////////log user out and close cookie/session////////////
router
	.get('/logout', function (req, res) {
		req.logout();
		console.log("USER LOGGED OUT");
		res.redirect('/');
	});

module.exports = router;