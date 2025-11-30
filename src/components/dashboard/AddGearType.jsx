import config from "@/config/config";
import React, { useEffect, useState } from "react";

export default function AddGearType() {
	const token = localStorage.getItem("authToken");

	const [gearType, setGearType] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.forEach((value, key) => {});
		try {
			const response = await fetch(`${config.apiEndpoint}/gear-type/`, {
				method: "POST",
				headers: {
					Authorization: `Token ${token}`,
				},
				body: formData,
			});
			if (response.ok) {
				const data = await response.json();
			} else {
				console.error("Failed to submit form data");
			}
		} catch (error) {
			console.error("Error submitting form data:", error);
		}
	};

	useEffect(() => {
		fetch(`${config.apiEndpoint}/gear-types/`)
			.then((res) => res.json())
			.then((result) => {
				setGearType(result.data);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="content-area">
						<main id="main" className="main-content">
							<div className="tfcl-dashboard flex">
								<div className="tfcl-add-listing car-details">
									<h3>Fuel details</h3>
									<form onSubmit={handleSubmit} className="form-group">
										<label htmlFor="listing_title">Listing Title *</label>
										<input
											type="text"
											className="form-control"
											name="title"
											placeholder="Enter title"
											defaultValue=""
										/>
										<div className="group-button-submit">
											<button type="submit" className="pre-btn">
												List Now
											</button>
										</div>
									</form>
									<div
										style={{
											border: "1px solid black",
											padding: "10px",
										}}
									>
										<h1 className="fs-3">All Gear Types</h1>
										{gearType.map((fuelType) => (
											<ol key={fuelType.id}>
												<li>{fuelType.title}</li>
											</ol>
										))}
									</div>
								</div>
							</div>
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}
