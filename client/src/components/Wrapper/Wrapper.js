import React from "react";
import "./Wrapper.css";

const Wrapper = props => <div className="wrapper">{props.children}
	<hr/>
</div>;

export default Wrapper;
