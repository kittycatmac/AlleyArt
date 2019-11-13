import React from "react";
import "./Modal.css";

export const UserTypeModal = ({
  show,
  handleClose,
  handleUser,
  handleArtist
}) => {
  return (
    <div
      className={`${show ? "modal display-block" : "modal display-none"} modal`}
    >
      <form>
        <button onClick={handleClose} className="modal-close right green-text">
          <i className="material-icons small">X</i>
        </button>
        <br />
        <div className="center-align">
          <h4 className="center">Select Your Profile!</h4>
          <button
            className="waves-effect orange darken-3 btn center-align"
            onClick={handleUser}
          >
            USER
          </button>
          <p className="select">
            To to find, view, and favorite on amazing street art!
          </p>
          <br />
          <button
            className="waves-effect orange darken-3 btn center-align"
            onClick={handleArtist}
          >
            ARTIST
          </button>
          <p className="select">
            With additional features to contribute your individual work(s).
          </p>
        </div>
      </form>
    </div>
  );
};
