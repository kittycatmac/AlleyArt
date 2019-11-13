import React, { Component } from "react";
import { Container } from "../../../components/Grid";
import "./register.css";
import API from "../../../utils/api";
import { Redirect } from "react-router-dom";
import Nav from "../../../components/Nav";

class RegisterUser extends Component {

	state = {
		userName: "",
		userEmail: "",
		userPassword: "",
		toSignIn: false,
	}

	handleInputChange = event => {
		let { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleRegUser = (event) => {
		event.preventDefault();
		console.log("You Clicked Me!");
		console.log(this.state);
		API.registerUser({
			username: this.state.userName,
			email: this.state.userEmail,
			password: this.state.userPassword
		}).then(response => {
			console.log(response);
			this.setState({
				userName: "",
				userEmail: "",
				userPassword: "",
				toSignIn: true
			})

		}).catch(error => {
			console.log("USER REGISTRATION ERROR: ");
			console.log(error);
		})
	}

	render() {
		if (this.state.toSignIn === true) {
			return <Redirect to='/' />
		}

		return (
			<React.Fragment>
				<Nav></Nav>
				<Container>
					<h1 className="title">Register USER Profile</h1>
					<div className="userform cyan darken-2">
						<div className="row">
							<form className="col s12">
								<div className="row">
									<div className="input-field col s12">
										<input id="name" type="text" className="validate" name="userName" onChange={this.handleInputChange}></input>
										<label htmlFor="name" className="black-text">Name</label>
									</div>
									<div className="input-field col s12">
										<input id="email" type="text" className="validate" name="userEmail" onChange={this.handleInputChange}></input>
										<label htmlFor="email" className="black-text">Email</label>
									</div>
									<div className="input-field col s12">
										<input id="input_text" type="password" name="userPassword"
										 onChange={this.handleInputChange}></input>
										<label htmlFor="input_text" className="black-text">Password</label>
									</div>
									<div className="col s12">
										<div className="center-align">
											<button className="btn waves-effect waves-light green darken-2" type="submit" name="action" onClick={this.handleRegUser}>Submit
  									</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</Container>
			</React.Fragment>
		)

	}
}
export default RegisterUser;
