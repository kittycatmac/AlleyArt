import React from "react";
import "./mapModal.css";
import MyMapContainer from "../google";


export const MapModal = ({ show, handleClose, center, title, address, city, mapAPI }) => {
	return (
		<div className={`${show ? "modal display-block" : "modal display-none"} modal mapModal`}>

			<button onClick={handleClose} className='modal-close right green-text'><i className='material-icons small'>X</i></button>
			<MyMapContainer
				center={center}
				zoom={9}
				title={title}
				address={address}
				city={city}
				mapAPI={mapAPI}
			/>


		</div>
	);
};

export default MapModal;