import config from "@/config/config";
import React, { useEffect, useState } from "react";

export default function AddCarType() {
	const [title, setTitle] = useState("");
	const [car_types, setCarTypes] = useState([]);
	const token = localStorage.getItem("authToken");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		try {
			const response = await fetch(`${config.apiEndpoint}/car-type/`, {
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
		fetch(`${config.apiEndpoint}/car-types/`)
			.then((res) => res.json())
			.then((result) => {
				setCarTypes(result.data);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="content-area">
						<main id="main" className="main-content">
							<div className="tfcl-dashboard">
								<div className="flex-container">
									<div className="tfcl-add-listing car-details">
										<h3>Car details</h3>
										<form onSubmit={handleSubmit} className="grid-md-12">
											<div className="form-group grid-md-8">
												<label htmlFor="listing_title">Car Type Title *</label>
												<input
													type="text"
													className="form-control"
													name="name"
													placeholder="Enter title"
													//value={title}
													//onChange={(e) => setTitle(e.target.value)}
												/>
											</div>
											<div className="group-button-submit grid-md-4">
												<button type="submit" className="pre-btn">
													List Now
												</button>
											</div>
										</form>
									</div>
									<div className="car-types-list">
										<h3>Car Types</h3>
										<ul
											style={{
												border: "1px solid black",
												padding: "10px",
											}}
										>
											{car_types.map((car_type) => (
												<li key={car_type.id}>{car_type.name}</li>
											))}
										</ul>
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
