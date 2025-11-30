import React, { useState } from "react";
import DropdownSelect from "../common/DropDownSelect";
import ContactMap from "./Map";
import config from "@/config/config";

export default function AddBodyType() {
	const token = localStorage.getItem("authToken");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		try {
			const response = await fetch(`${config.apiEndpoint}/car-body-type/`, {
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

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="content-area">
						<main id="main" className="main-content">
							<div className="tfcl-dashboard">
								<h1 className="admin-title mb-3">Add Body Types</h1>

								<div className="tfcl-add-listing car-details">
									<h3>Car details</h3>
									<form onSubmit={handleSubmit} className="form-group">
										<label htmlFor="listing_title">Listing Title *</label>
										<input
											type="text"
											className="form-control"
											name="name"
											placeholder="Enter title"
											defaultValue=""
										/>
										<div className="group-button-submit">
											<button type="submit" className="pre-btn">
												List Now
											</button>
										</div>
									</form>
								</div>
							</div>
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}
