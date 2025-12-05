import { useEffect, useRef, useState } from "react";
import { useApi } from "@/providers/ApiProvider";
import { useNavigate } from "react-router-dom";
import CarSearchbyTitle from "../carSearchbyTitle/carSearchbyTitle";

export default function FlatFilter({
	styleClass = "",
	justifyClass = "",
	tabStyle = "",
}) {
	const toggleBtn = useRef();
	const advanceSearch = useRef();

	const toggleSearchOpen = () => {
		toggleBtn.current.classList.toggle("active");
		advanceSearch.current.classList.toggle("show");
	};

	////////////////////// Initialize the API data ////////////////////////////

	const { modelYears, models, carBrands, bodyTypes, carTypes } = useApi();

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				toggleBtn.current &&
				!toggleBtn.current.contains(e.target) &&
				advanceSearch.current &&
				!advanceSearch.current.contains(e.target)
			) {
				toggleBtn.current.classList.remove("active");
				advanceSearch.current.classList.remove("show");
			}
		};
		// Add the event listener when the component mounts
		document.addEventListener("click", handleClickOutside);

		// Clean up the event listener when the component unmounts
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const [activeIndex, setActiveIndex] = useState("All"); // Initially "All Car" is active

	const handleClick = (id) => {
		setActiveIndex(id); // Update the active index when clicked
	};

	const navigate = useNavigate();

	const handle_Submit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		let data = Object.fromEntries(formData.entries());
		// Filter out fields where the value is "none"
		data = Object.fromEntries(
			Object.entries(data).filter(([key, value]) => value !== "none")
		);
		// Only add car_type if a specific car type is selected
		if (activeIndex !== "All") {
			const selectedCarType = carTypes.data.find(
				(car) => car.id === activeIndex
			);
			if (selectedCarType) {
				data.car_type = selectedCarType.id;
			}
		}
		// Convert data to query parameters
		const queryParams = new URLSearchParams(data).toString();
		// Navigate to the listing page with query parameters
		navigate(`/car-list?${queryParams}`);
	};

	const [priceRange, setPriceRange] = useState([60000, 90000]);
	const [km, setkm] = useState([60000, 90000]);

	return (
		<>
			<div className="box-tab center">
				<ul className="tab-title style d-flex">
					{/* All Cars: no index prop, onClick passes null */}
					<li
						key="all-cars"
						value="none"
						className={`item-title style ${
							activeIndex == "All" ? "active" : ""
						}`}
						onClick={() => handleClick("All")}
					>
						<span className="inner fs-16 fw-5 lh-20">All Cars</span>
					</li>
					{/* Dynamic tabs: id is the car-type id */}
					{carTypes.data?.map((car) => (
						<li
							key={car.id}
							className={`item-title style ${
								activeIndex === car.id ? "active" : ""
							}`}
							onClick={() => handleClick(car.id)}
						>
							<span className="inner fs-16 fw-5 lh-20">{car.name}</span>
						</li>
					))}
				</ul>
			</div>

			<div className={`content-tab ${tabStyle}`}>
				<div className="content-inner tab-content">
					<div className="form-sl">
						<form onSubmit={handle_Submit}>
							<div className="wd-find-select flex">
								<div className="inner-group select-style">
									<div className="form-group-1">
										<label>Year</label>
										<div className="group-select tf-select">
											<select className="nice-select" name="model_year">
												<option value="none">Select</option>
												{modelYears?.data?.map((yearObj, index) => (
													<option key={index} value={yearObj.id}>
														{yearObj.year}
													</option>
												))}
											</select>
										</div>
									</div>
									<div className="form-group-1">
										<label>Make</label>
										<div className="group-select tf-select">
											<select className="nice-select" name="car_brand">
												<option value="none">Select</option>
												{
													carBrands?.data?.map((yearObj, index) => (
														<option key={index} value={yearObj.id}>
															{yearObj.title}
														</option>
													)) /* Map through fuels data to create options */
												}
											</select>
										</div>
									</div>
									<div className="form-group-1">
										<label>Model</label>
										<div className="group-select tf-select">
											<select className="nice-select" name="car_model">
												<option value="none">Select</option>
												{models?.data?.map((modelObj, index) => (
													<option key={index} value={modelObj.id}>
														{modelObj.title}
													</option>
												))}
											</select>
										</div>
									</div>
									<div className="form-group-1">
										<label>Body Type</label>
										<div className="group-select tf-select">
											<select className="nice-select" name="body_type">
												<option value="none">Select</option>
												{bodyTypes?.data?.map((bodyObj, index) => (
													<option key={index} value={bodyObj.id}>
														{bodyObj.title}
													</option>
												))}
												<option value={2024}>2024</option>
											</select>
										</div>
									</div>
								</div>

								<div className="button-search sc-btn-top">
									<button type="submit" className="sc-button">
										<span className="text-nowrap">Find cars</span>
										<i className="icon-autodeal-search text-color-1" />
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
