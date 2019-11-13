import React, { Component } from "react";
import { Container } from "../../components/Grid";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LoginModal, UserTypeModal } from "../../components/Modal";
import { logInUser } from "../../redux/reducers/myReducer";
import "./landing.css";
import API from "../../utils/api";

class Landing extends Component {
  state = {
    username: " ",
    password: " ",
    toHome: false,
    showLogin: false,
    showRegister: false,
    toArtistReg: false,
    toUserReg: false
  };

  showLogin = () => {
    this.setState({ showLogin: true });
  };

  hideLogin = () => {
    this.setState({ showLogin: false });
  };

  handleInputChange = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleLogin = event => {
    event.preventDefault();
    console.log("You Clicked Me!");
    API.loginUser({
      email: this.state.username,
      password: this.state.password
    })
      .then(response => {
        if (response.status === 200) {
          let name = response.data.username;
          let userId = response.data.userId;
          let isArtist = response.data.isArtist;
          let mapAPI = response.data.mapAPI;
          console.log("LOGIN Username", name);
          console.log("LOGIN User ID", userId);
          console.log("LOGIN is Artist", isArtist);
          let user = {
            mapAPI: mapAPI,
            username: name,
            userId: userId,
            isArtist: isArtist,
            loggedIn: true
          };
          this.props.logInUser(user);
          this.setState({ toHome: true });
        }
      })
      .catch(error => {
        console.log("LOGIN ERROR: ");
        console.log(error);
      });
  };

  handleArtist = () => {
    this.setState({ toArtistReg: true });
  };

  handleUser = () => {
    this.setState({ toUserReg: true });
  };

  showRegister = () => {
    this.setState({ showRegister: true });
  };

  hideRegister = () => {
    this.setState({ showRegister: false });
  };

  render() {
    // console.log(this.props);
    // if (this.state.toHome === true) {
    //   return <Redirect to="/home" />;
    // }
    // if (this.state.toUserReg === true) {
    //   return <Redirect to="/register/user" />;
    // }
    // if (this.state.toArtistReg === true) {
    //   return <Redirect to="/register/artist" />;
    // }

    let imgURL =
      "https://slack-imgs.com/?c=1&url=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2018%2F01%2F05%2F03%2F14%2Fgraffiti-3062069_640.jpg";

    return (
      <React.Fragment>
        <div
          style={{
            backgroundImage: "url(" + imgURL + ")",
            backgroundSize: "cover",
            minHeight: "650px",
            backgroundRepeat: "no-repeat"
          }}
        >
          <Container>
            <div className="landing-background">
              <div className="landing center-align card-panel">
                <h1 id="alley-art">ALLEY ART</h1>
                <p>
                  Beyond this is a street art community. Create a profile and
                  contribute to the international art collections. If your
                  looking for a discovery find the location and go see for
                  yourself.
                </p>
                <div className="row">
                  <div className="button-box">
                    <button
                      className="landing-button waves-effect darken-3 btn"
                      type="button"
                      onClick={this.showLogin}
                    >
                      LOGIN
                    </button>

                    <button
                      className="landing-button waves-effect darken-3 btn"
                      type="button"
                      onClick={this.showRegister}
                    >
                      REGISTER{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <LoginModal
              show={this.state.showLogin}
              handleClose={this.hideLogin}
              handleLogin={this.handleLogin}
              handleInputChange={this.handleInputChange}
            />

            <UserTypeModal
              show={this.state.showRegister}
              handleClose={this.hideRegister}
              handleUser={this.handleUser}
              handleArtist={this.handleArtist}
            />
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logInUser: user => {
      dispatch(logInUser(user));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
