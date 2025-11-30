import React, { useEffect } from 'react';

const GoogleReviewsWidget = () => {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://static.elfsight.com/platform/platform.js";
		script.async = true;
		script.onload = () => {
			if (window.Elfsight) {
				window.Elfsight.load();
			}
		};
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script); // Cleanup script on unmount
		};
	}, []);

	return (
		<div className="my-3 mt-3">
			<div
				className="elfsight-app-224f4f55-3e9c-489c-b126-cc9ec0a85336"
				data-elfsight-app-lazy
			></div>
		</div>
	);
};

export default GoogleReviewsWidget;