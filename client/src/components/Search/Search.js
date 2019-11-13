import React from "react";
import "./search.css";

const Search = ({ handleInputChange, handleSearchArtist, handleSearchCity }) => (
	<div className="row">
		<form className="col s12">
			<div className="row">
				<div className="input-field col s8">
					<input placeholder="Artist" id="input-text" data-length="120" name="artistSearch" onChange={handleInputChange}></input>
					<label htmlFor="input_text"></label>
				</div>

				<div className="col s10">
					<button className="waves-effect grey darken-3 btn button-search" onClick={handleSearchArtist}>Search By Artist</button>
				</div>

			</div>
			<div className="row">
				<div className="input-field col s8">
					<input placeholder="Location" id="input-text" data-length="120" name="locationSearch" onChange={handleInputChange}></input>
					<label htmlFor="input_text"></label>

				</div>
				<div className="col s10">
					<button className="waves-effect grey darken-3 btn button-search" onClick={handleSearchCity}>Search By City</button>
				</div>
			</div>
		</form>
	</div>
);

export default Search;