import React from "react";

export const Col = ({ size, children }) => (
	<div className={`col ${size}`}>
		{children}
	</div>
);
