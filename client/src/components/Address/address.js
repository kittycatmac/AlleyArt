import React from "react";
import "./address.css";

const AddressForm = ({
  show,
  userAddressInput,
  userAddressClose,
  userAddressSubmitForm
}) => {
  return (
    <div
      className={`${
        show ? "modal display-block address" : "modal display-none"
      } modal`}
    >
      <form className="col s12">
        <div
          href=""
          onClick={userAddressClose}
          className="modal-close btn-floating btn-small waves-effect waves-light red right"
        >
          {" "}
          <i className="material-icons">close</i>
        </div>

        <h1 className="addressTitle">Enter The Address</h1>
        <div className="row">
          <div className="modal-content">
            <input
              placeholder="Enter The Address"
              id="address"
              type="text"
              name="address"
              onChange={userAddressInput}
            />
            <label className="label">Address</label>
          </div>
        </div>

        <div className="row">
          <div className="modal-content col s6">
            <input
              placeholder="Enter City Name"
              id="city"
              type="text"
              name="cityName"
              onChange={userAddressInput}
            />
            <label className="label">City</label>
          </div>

          <div className="modal-content col s2">
            <input
              placeholder="State"
              id="state"
              type="text"
              name="state"
              onChange={userAddressInput}
            />
            <label className="label">State</label>
          </div>

          <div className="modal-content col s4">
            <input
              placeholder="Zip"
              id="zip"
              type="text"
              name="zipCode"
              onChange={userAddressInput}
            />
            <label className="label">Zip</label>
          </div>
          <button
            className="submit btn"
            type="submit"
            onClick={userAddressSubmitForm}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
