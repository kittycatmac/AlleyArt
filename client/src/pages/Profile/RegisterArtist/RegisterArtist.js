import React, { Component } from "react";
import { Container } from "../../../components/Grid";
import "./register.css";
import API from "../../../utils/api";
import { Redirect } from "react-router-dom";
import Nav from "../../../components/Nav";

class RegisterArtist extends Component {
	state = {
		artistName: "",
		artistEmail: "",
		artistPassword: "",
		artistEmailError: "",
		artistPasswordError: "",
		aboutArtist: "",
		okToContact: false,
		toSignIn: false
	};

	handleInputChange = event => {
		let { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleRegUser = event => {
		event.preventDefault();
		console.log("You Clicked Me!");
		console.log(this.state);
		API.registerUser({
			isArtist: true,
			username: this.state.artistName,
			email: this.state.artistEmail,
			password: this.state.artistPassword,
			aboutArtist: this.state.aboutArtist,
			okToContact: this.state.okToContact
		})
			.then(response => {
				console.log(response);
				this.setState({
					artistName: "",
					artistEmail: "",
					artistPassword: "",
					aboutArtist: "",
					okToContact: false,
					toSignIn: true
				});
			})
			.catch(error => {
				console.log("ARTIST REGISTRATION ERROR: ");
				console.log(error);
			});
	};

	// ---------------------------------------------
	switchStatus = () => {
		this.setState({
			okToContact: true
		});
	};


	render() {
		// if (this.state.toSignIn === true) {
		// 	return <Redirect to="/" />;
		// }

		return (
			<React.Fragment>
				<Nav />
				<div className="userform cyan darken-2">
					<Container>
						<div className="row">
							<form className="register">
								<h1 className="title-register">ARTIST REGISTRATION</h1>

								<div className="row">
									<div className="input-field col s12">
										<i className="material-icons prefix">wc</i>
										<input
											id="input-text"
											type="text"
											className="validate"
											name="artistName"
											onChange={this.handleInputChange}
										/>
										<label htmlFor="input-text">Artist Name</label>
									</div>

									<div className="input-field col s12">
										<i className="material-icons prefix">email</i>
										<input
											id="email"
											type="email"
											className="validate"
											name="artistEmail"
											onChange={this.handleInputChange}
											floatinglabeltext="Name"
										/>
										<label htmlFor="email">Email</label>
										<span
											className="helper-text"
											data-success=""

										/>

									</div>
									<div className="input-field col s12">
										<i className="material-icons prefix">lock</i>
										<input
											id="input_text"
											type="password"
											className="validate"
											name="artistPassword"
											onChange={this.handleInputChange}
										/>
										{/* pattern=".{6,}" required title=" characters minimum" */}
										<label htmlFor="input_text">Password</label>
										<span
											className="helper-text"
											data-success=""
										/>
									</div>

									<div className="input-field commentBox col s12">
										<i className="tiny material-icons prefix">comment</i>
										<textarea
											id="textarea2"
											type="text"
											className="materialize-textarea"
											name="aboutArtist"
											onChange={this.handleInputChange}
										/>
										<label
											htmlFor="textarea2"
										>
											About You As An Artist...
                    </label>
									</div>
									<div className="col s12">
										<h3 className="white-text contact-q">Do you want to be contacted?</h3>
										<div className="switch">
											<label className="white-text">
												No
                        <input
													type="checkbox"
													defaultValue={this.state.okToContact}
													onChange={this.switchStatus}
												/>
												<span className="lever green darken-2" />
												Yes
                      </label>
										</div>
									</div>
									<div className="col s12">
										<div className="center-align">
											<button
												className="register-submit btn waves-effect waves-light green darken-2"
												type="submit"
												name="action"
												onClick={this.handleRegUser}
											>
												Register
                      </button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</Container>
				</div>

			</React.Fragment>
		);
	}

};





export default RegisterArtist;
