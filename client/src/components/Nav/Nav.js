import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import API from "../../utils/api";
import { logOutUser } from "../../redux/reducers/myReducer";
import "./Nav.css";

function mapStateToProps(state) {
  return {
    user: state
  };
}
function mapDispatchToProps(dispatch) {
  return {
    logOutUser: () => {
      dispatch(logOutUser());
    }
  };
}

class Nav extends Component {
  handleLogout = () => {
    API.logoutUser()
      .then(response => {
        console.log("Logged Out");
        this.props.logOutUser();
      })
      .catch(error => {
        console.log("Logout Error: ");
        console.log(error);
      });
  };

  burgerToggle = () => {
    let linksEl = document.querySelector(".narrowLinks");
    if (linksEl.style.display === "block") {
      linksEl.style.display = "none";
    } else {
      linksEl.style.display = "block";
    }
  };

  render() {
    return (
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo right">
            ALLEY ART
          </a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li>
              <Link to={"/home"}>Find Art</Link>
            </li>
            <li>
              <Link to={"/profile"}>Favorites</Link>
            </li>
            <li>
              {this.props.user.isArtist === true && (
                <Link to={"/image"}>Upload New Art</Link>
              )}{" "}
            </li>
            <li>
              <Link to={"/"} onClick={this.handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>

        {/* <div className="navNarrow">
          <i className="fa fa-bars fa-2x" onClick={this.burgerToggle} />
          <div className="narrowLinks">
            <Link to={"/home"} onClick={this.burgerToggle}>
              <i className="fas fa-search" />
            </Link>
            <Link to={"/profile"} onClick={this.burgerToggle}>
              <i className="fas fa-heart" />
            </Link>
            {this.props.user.isArtist === true && (
              <Link to={"/image"} onClick={this.burgerToggle}>
                <i className="fas fa-upload" />
              </Link>
            )}
            <Link
              to={"/"}
              onClick={this.burgerToggle}
              onClick={this.handleLogout}
            >
              <i className="fa fa-sign-out-alt" />
            </Link>
          </div>
        </div> */}
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
