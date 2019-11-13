import React, { Component } from "react";
import Nav from "../../components/Nav";
import { Container } from "../../components/Grid";
import ArtCard from "../../components/artCard";
import API from "../../utils/api";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./artistProfile.css";

class Artist extends Component {

	state = {
		artistName: " ",
		aboutArtist: " ",
		okToContact: false,
		artistEmail: " ",
		artistWorks: [],
		onProfile: true,
	}

	componentDidMount() {
		this.getProfile();
	}

	getProfile = () => {
		API.artistProfile(this.props.user.artistId)
			.then(artist => {
				this.setState({
					artistName: artist.data.username,
					aboutArtist: artist.data.aboutArtist,
					okToContact: artist.data.contactArtist,
					artistEmail: artist.data.artistEmail,
					artistWorks: artist.data.artistWorks
				});
				console.log("ARTIST PROFILE RESPONSE", this.state);
			})
			.catch(err => console.log(err));
	}

	removeArt = (id) => {
		API.removeArt(id)
			.then(response => {
				console.log("Remove Artwork RESPONSE: ", response);
			})
			.then(this.getProfile())
			.catch(err => console.log("Remove Artwork Error: ", err));
	}

	render() {

		//////////////WE MAY NEED TO UNCOMMENT UNTIL FINISHED W/ PAGE SETUP BUT- DO NOT REMOVE//////
		if (this.props.user.loggedIn === false) {
			return <Redirect to='/' />
		}

		return (
			<React.Fragment>
				<Nav></Nav>
				<div className="artistProfile">
					<Container fluid>

						<h1 id="title-a">ARTIST: {this.state.artistName}</h1>

						<h6>ABOUT THE ARTIST</h6>
						<div className="info-about valign-wrapper">
							<p id="PP">{this.state.aboutArtist}</p>
						</div>
						<h6>CONTACT: </h6>
						<div className="info-contact">
							{this.state.okToContact === true && <p id="PP">OK to contact</p>}
							{this.state.okToContact === false && <p id="PP">Unable to contact </p>}
						</div>
						<h6>EMAIL: </h6>
						<div className="info-email">
							<p id="PP">{this.state.artistEmail}</p>
						</div>

						<h6>ALL ARTWORK: </h6>

						{this.state.artistWorks.length ? (
							<React.Fragment>

								<div className="row text-center results col s12 m6 l4">

									{this.state.artistWorks.map(art => (

										<ArtCard
											key={"card-" + art._id}
											id={art._id}
											fav={false}
											url={art.url}
											artistId={art.artistID}
											title={art.title}
											description={art.description}
											likes={art.likes}
											onProfile={this.state.onProfile}
											removeArt={this.removeArt}
										/>

									))}

								</div>
							</React.Fragment>
						) : (
								<h3 className="center noResults col s12 m6 l4">No Results to Display</h3>
							)}

					</Container>
				</div>
			</React.Fragment>
		)
	}
}
function mapStateToProps(state) {
	return {
		user: state,
	}
}

export default connect(mapStateToProps)(Artist);