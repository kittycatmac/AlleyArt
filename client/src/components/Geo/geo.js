import React from "react";

const Gps = ({ gpsInit }) => {

	return (
		<button
			type="button"
			className="waves-effect waves-light btn blue darken-4"
			style={{width: "100%"}}
			onClick={gpsInit}
		>
			GPS<i className="large material-icons right">location_on</i>
		</button>
	);
}


export default Gps;
