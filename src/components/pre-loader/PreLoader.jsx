import React from "react";
import "./PreLoader.css"; // Import the CSS file

const PreLoader = () => {
    return (
			<div className="preloader">
				<div className="spinner flex">
					<img src="/public/assets/images/logo/preload.png" alt="Loading..." />
					<h1 className="fw-20 fs-10 mx-2">Isam Auto</h1>
				</div>
			</div>
		);
};

export default PreLoader;