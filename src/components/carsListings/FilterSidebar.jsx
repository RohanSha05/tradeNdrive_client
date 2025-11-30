// src/components/carsListings/FilterSidebar.jsx
import React from "react";
import DropdownSelect from "../common/DropDownSelect";
import { featureOptions } from "@/data/filterOptions";

export default function FilterSidebar({ allProps = {}, clearFilter }) {
	// ডিফল্ট মান সহ ডেসট্রাকচারিং
	const {
		make = "Any Make",
		setMake = () => {},
		model = "Any Model",
		setModel = () => {},
		body = "Any Body",
		setBody = () => {},
		fuel = "Any Fuel",
		setFuel = () => {},
		transmission = "Any Gear Type",
		setTransmission = () => {},
		features = [],
		setFeatures = () => {},
	} = allProps;

	return (
		<div className="sidebar-right-listing style-2">
			<div className="sidebar-title flex-two flex-wrap">
				<h4>Filters and Sort</h4>
				<button className="fw-5 font claer text-color-2" onClick={clearFilter}>
					<i className="icon-autodeal-plus" /> Clear
				</button>
			</div>
			<div className="form-filter-siderbar">
				<form onSubmit={(e) => e.preventDefault()}>
					<div className="wd-find-select">
						{/* Make */}
						<div className="form-group mb-3">
							<DropdownSelect
								selectedValue={make}
								onChange={setMake}
								options={["Any Make", "Audi", "Dongfeng", "BMW"]}
							/>
						</div>

						{/* Model */}
						<div className="form-group mb-3">
							<DropdownSelect
								selectedValue={model}
								onChange={setModel}
								options={["Any Model", "A4", "Almera", "Carnival"]}
							/>
						</div>

						{/* Body Type */}
						<div className="form-group mb-3">
							<DropdownSelect
								selectedValue={body}
								onChange={setBody}
								options={["Any Body", "Convertible", "Coupe", "Crossover"]}
							/>
						</div>

						{/* Fuel */}
						<div className="form-group mb-3">
							<DropdownSelect
								selectedValue={fuel}
								onChange={setFuel}
								options={["Any Fuel", "Diesel", "Petrol"]}
							/>
						</div>

						{/* Transmission */}
						<div className="form-group mb-3">
							<DropdownSelect
								selectedValue={transmission}
								onChange={setTransmission}
								options={["Any Gear Type", "Automatic", "Manual"]}
							/>
						</div>

						{/* Feature Checkboxes */}
						<div className="features-wrap mb-4">
							<h4>Featured</h4>
							<div className="tf-amenities bg-white">
								{featureOptions.map((feat, idx) => (
									<label className="flex-three form-check" key={idx}>
										<input
											className="form-check-input"
											type="checkbox"
											checked={features.includes(feat)}
											onChange={() => setFeatures(feat)}
										/>
										<span className="btn-checkbox" />
										<span className="text-color-2 font-2">{feat}</span>
									</label>
								))}
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
