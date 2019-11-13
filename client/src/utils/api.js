import axios from 'axios';

export default {
	registerUser: function (userInfo) {
		return axios.post("/api/database/register/", userInfo);
	},
	loginUser: function (loginInfo) {
		return axios.post("/api/auth/login", loginInfo);
	},
	logoutUser: function () {
		return axios.get("/api/auth/logout");
	},
	uploadImage: function (data) {
		console.log(data);
		return axios.post("/api/file/image-upload", data, {
			headers: { contentType: "application/x-www-form-urlencoded" }
		});
	},
	submitArt: function (data) {
		console.log(data);
		return axios.post('/api/database/new-art', data);
	},
	removeArt: function (_id) {
		return axios.delete('/api/database/remove/' + _id)
	},
	searchArtist: function (search) {
		return axios.get("/api/database/search/artist/" + search);
	},
	searchCity: function (search) {
		return axios.get("/api/database/search/city/" + search);
	},
	updateLikes: function (_id) {
		return axios.put("/api/database/" + _id);
	},
	addFavorites: function (artID) {
		return axios.post("/api/database/favorites/" + artID);
	},
	getFavorites: function () {
		return axios.get("/api/database/favorites");
	},
	removeFavorite: function (_id) {
		return axios.put("/api/database/favorites/" + _id)
	},
	getGeocode: function (address) {
		console.log("GEOCODE API REQUEST ", address);
		return axios.get("api/geocode/" + address)
	},
	artistProfile: function (artistID) {
		return axios.get("api/database/profile/" + artistID)
	},
	getLatLng: function (_id) {
		return axios.get("api/database/location/" + _id)
	},
};

