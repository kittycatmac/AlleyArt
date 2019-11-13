import React, { Component } from "react";
import Nav from "../../components/Nav";
import { Row, Container } from "../../components/Grid";
import Search from "../../components/Search";
import ArtCard from "../../components/artCard";
import "./home.css";
import API from "../../utils/api";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logInUser } from "../../redux/reducers/myReducer";
import MapModal from "../../components/Map/Modal/mapModal";

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			artistSearch: "",
			locationSearch: "",
			results: [],
			showMap: false,
			center: {
				lat: 0,
				lng: 0
			},
			title: " ",
			address: " ",
			city: " ",
		}
	}

	////SEARCH FORM FUNCTIONS/////////
	handleInputChange = event => {
		let { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleSearchArtist = (event) => {
		event.preventDefault();
		console.log("You Clicked Me!");
		console.log(this.state.artistSearch);
		API.searchArtist(this.state.artistSearch
		).then(art => {
			return (
				console.log("RESULTS", art.data),
				this.setState({ results: art.data, artistSearch: "", locationSearch: "" })
			)
		}
		).catch(error => {
			console.log("SEARCH ERROR: ");
			console.log(error);
		})
	}

	handleSearchCity = (event) => {
		event.preventDefault();
		console.log("You Clicked Me!");
		console.log(this.state.locationSearch);
		API.searchCity(this.state.locationSearch
		).then(art => {
			return (
				console.log("RESULTS", art.data),
				this.setState({ results: art.data, artistSearch: "", locationSearch: "" })
			)
		}
		).catch(error => {
			console.log("SEARCH ERROR: ");
			console.log(error);
		})
	}

	//////////GOOGLE MAP FUNCTIONS/////////////
	showMap = () => {
		this.setState({
			showMap: true
		})
	}

	hideMap = () => {
		this.setState({
			showMap: false
		})
	}

	mapArt = (id) => {
		console.log("Showing Art Location", id);
		API.getLatLng(id)
			.then(response => {
				console.log("Coordinates Returned: ", response.data);
				this.setState({
					center: {
						lat: response.data.lat,
						lng: response.data.lng
					},
					title: response.data.title,
					address: response.data.address,
					city: response.data.city
				});
			})
			.then(this.showMap())


			.catch(err => console.log(err));
	}

	render() {
		if (this.props.user.loggedIn === false) {
			return <Redirect to='/' />
		}

		return (
			<React.Fragment>
				<Nav></Nav>

				<Container fluid>

					<Row>
						<div className="row-container search-container z-depth-5">
							<h1 id="title">Discover</h1>
							<Search
								handleInputChange={this.handleInputChange}
								handleSearchArtist={this.handleSearchArtist}
								handleSearchCity={this.handleSearchCity}></Search>
						</div>
					</Row>

					{this.state.results.length ? (
						<React.Fragment>

							<div className="row text-center col s12 m6 l4">
								<h1 id="title-r">Street Art</h1>

								{this.state.results.map(art => (

									<ArtCard
										key={"card-" + art._id}
										id={art._id}
										fav={false}
										url={art.url}
										artistId={art.artistID}
										title={art.title}
										description={art.description}
										likes={art.likes}
										mapArt={this.mapArt}

									/>

								))}

							</div>
						</React.Fragment>
					) : (
							<h3 className="center-align noResults col s12 m6 l4">Search Again</h3>
						)}

					{this.state.showMap ?
						<MapModal
							show={this.state.showMap}
							handleClose={this.hideMap}
							center={this.state.center}
							title={this.state.title}
							address={this.state.address}
							city={this.state.city}
							mapAPI={this.props.user.mapAPI}
						/> : null
					}


				</Container>
			</React.Fragment>
		)
	}
}
function mapStateToProps(state) {
	return {
		user: state,
	}
}
function mapDispatchToProps(dispatch) {
	return {
		logInUser: () => { dispatch(logInUser()) },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);