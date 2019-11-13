const router = require("express").Router();
const axios = require("axios");
const key = require("../../config/keys");


router
	.get("/:address", function (req, res) {
		let apiKey = key.geocoder.apiKey;
		let query = req.params.address;
		console.log("GEOCODING address", query);
		console.log("GEOCODER API KEY", apiKey);
		axios.get("https://maps.googleapis.com/maps/api/geocode/json?key=" + apiKey + "&address=" + query)
			.then(response => {
				console.log("GEOCODER RES Data", response.data.results[0].geometry.location);
				let geoResults = response.data.results[0].geometry.location
				res.send(geoResults);
			})
			.catch(err => res.json(err))
	});

module.exports = router;