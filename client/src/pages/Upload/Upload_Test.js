import React, { Component } from "react";
import { Container } from "../../components/Grid";
import "./upload_test.css";
import Gps from "../../components/Geo";
import AddressForm from "../../components/Address";
import UploadModal from "../../components/Modal/UploadModal";
import { connect } from "react-redux";
import API from "../../utils/api";
import { Redirect } from "react-router-dom";
import Nav from "../../components/Nav";
import MyMapContainer from "../../components/Map/google";

const uploadStyle = {
  border: "3px solid black",
  width: "400px",
  height: "420px"
};

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: " ",
      cityName: "  ",
      state: " ",
      zipCode: " ",
      formattedAddy: " ",
      center: {
        lat: 0,
        lng: 0
      },
      showMap: false,
      showAddress: false,
      userAddressInfo: false,
      showUpload: false,
      artTitle: "",
      description: " ",
      backToHome: false
    };
  }

  //////////////////MODAL SHOW OR HIDE FUNCTIONS///////////////
  showAddress = () => {
    this.setState({ showAddress: true });
  };

  hideAddress = () => {
    this.setState({ showAddress: false });
  };

  showUpload = () => {
    this.setState({ showUpload: true });
  };

  hideUpload = e => {
    e.preventDefault();
    this.setState({ showUpload: false });
  };

  ///////////////ADDRESS INPUT FUNCTIONS- ////////////////

  showMap = () => {
    this.setState({
      showMap: true
    });
  };

  userAddressSubmitForm = event => {
    event.preventDefault();
    let fullAddress =
      this.state.address +
      " " +
      this.state.cityName +
      " " +
      this.state.state +
      " " +
      this.state.zipCode;
    console.log("Full Address", fullAddress);
    let formattedAddress = fullAddress.split(" ").join("+");
    this.setState({
      formattedAddy: formattedAddress
    });
    console.log(formattedAddress);
    API.getGeocode(formattedAddress)
      .then(location => {
        return (
          console.log("RESULTS", location.data),
          this.setState({
            showAddress: false,
            // lat: location.data.lat,
            // lng: location.data.lng,
            center: {
              lat: location.data.lat,
              lng: location.data.lng
            }
          })
        );
      })
      .then(this.showMap())
      .catch(error => {
        console.log("GEOCODE ERROR: ");
        console.log(error);
      });
  };

  //////////////////////////GEO LOCATION FUNCTIONS///////////////
  //will locate your current position
  gpsInit = () => {
    this.userGps = navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoError
    );
  };

  geoSuccess = position => {
    alert(
      "Obtained Geolocation!\n\n" +
        "Latitude: " +
        position.coords.latitude +
        "\n" +
        "Longitude: " +
        position.coords.longitude
    );
    console.log("Lat: ", position.coords.latitude);
    console.log("Long: ", position.coords.longitude);
    this.setState({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
    console.log("GEO SUCCESS, ", this.state);
    this.showMap();
  };

  geoError = () => {
    alert("No GPS available");
  };

  ///////////////////SUBMIT UPLOAD FORM//////////////////
  handleInputChange = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitForm = e => {
    e.preventDefault();
    let imageUrl = this.props.user.image;
    let userName = this.props.user.username;
    let userId = this.props.user.userId;
    console.log("ON SUBMIT PROPS STATE: ", this.props);
    console.log("ON SUBMIT IMAGE: ", imageUrl);
    console.log("LOGGED IN USER", userName);
    console.log("LOGGED IN USER ID", userId);
    API.submitArt({
      artist: userName,
      artistID: userId,
      title: this.state.artTitle,
      url: imageUrl,
      address: this.state.address,
      city: this.state.cityName,
      state: this.state.state,
      zipCode: this.state.zipCode,
      lat: this.state.center.lat,
      lng: this.state.center.lng,
      formattedAddy: this.state.formattedAddy,
      description: this.state.description
    })
      .then(response => {
        console.log(response);
        this.setState({
          title: " ",
          url: " ",
          address: " ",
          city: " ",
          state: " ",
          zipCode: " ",
          description: " ",
          formattedAddy: " ",
          backToHome: true
        });
      })
      .catch(error => {
        console.log("ARTWORK SUBMISSION ERROR: ");
        console.log(error);
      });
  };

  render() {
    ////////////WE MAY NEED TO UNCOMMENT UNTIL FINISHED W/ PAGE SETUP BUT- DO NOT REMOVE//////
    if (
      this.props.user.loggedIn === false ||
      this.props.user.isArtist === false
    ) {
      return <Redirect to="/" />;
    }

    if (this.state.backToHome === true) {
      return <Redirect to="/home" />;
    }

    return (
      <React.Fragment>
        <Nav />
        <div className="uploadForm">
          <Container>
            <h1 className="title title-upload">Upload New Image</h1>
            <div className="row">
              <div className="col s12 m6">
                <div className="card card-frame blue-grey darken-1">
                  <div className="card-content white-text">
                    <form>
                      <button
                        className="waves-effect waves-light btn blue darken-4 uploadBtn"
                        type="button"
                        onClick={this.showUpload}
                      >
                        Find Image
                        <i className="large material-icons right">
                          file_upload
                        </i>
                      </button>

                      <Gps gpsInit={this.gpsInit} />

                      <button
                        id="addAddress"
                        type="button"
                        className="waves-effect waves-light btn blue darken-4 uploadBtn"
                        onClick={this.showAddress}
                      >
                        Address
                        <i className="large material-icons right">home</i>
                      </button>
                      <label>Title</label>
                      <input
                        id="input_text"
                        type="text"
                        name="artTitle"
                        onChange={this.handleInputChange}
                      />
                      <label>Description</label>
                      <textarea
                        id="textarea1"
                        className="materialize-textarea"
                        name="description"
                        onChange={this.handleInputChange}
                      />
                      <button
                        id="submit"
                        className="waves-effect waves-light btn green darken-2 uploadBtn"
                        onClick={e => {
                          this.submitForm(e);
                        }}
                      >
                        SAVE
                        <i className="large material-icons right">send</i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col s12 m6 l6">
                {this.state.showMap === true && (
                  <MyMapContainer
                    center={this.state.center}
                    zoom={9}
                    style={uploadStyle}
                    mapAPI={this.props.user.mapAPI}
                  />
                )}
              </div>
            </div>
          </Container>
        </div>

        <AddressForm
          show={this.state.showAddress}
          userAddressClose={this.hideAddress}
          userAddressSubmitForm={this.userAddressSubmitForm}
          userAddressInput={this.handleInputChange}
        />

        <UploadModal
          show={this.state.showUpload}
          handleClose={this.hideUpload}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state
  };
}

export default connect(mapStateToProps)(Upload);
