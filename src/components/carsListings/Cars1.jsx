import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DropdownSelect from "../common/DropDownSelect";
import Pagination from "../common/Pagination";
import { useApi } from "@/providers/ApiProvider";
import config from "@/config/config";

export default function Cars1() {
	const {
		carTypes,
		carBrands,
		bodyTypes,
		fuelTypes,
		driveTypes,
		gearTypes,
		ownerTypes,
		carModels,
		modelYears,
		carDealers,
		carListings,
		loading,
	} = useApi();

	const ParamLocation = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(ParamLocation.search);

	const [filteredCars, setFilteredCars] = useState([]);
	const [carsLoading, setCarsLoading] = useState(false);

	const getOptions = (apiObj, anyLabel, key = "name") => {
		if (!apiObj || !apiObj.data) return [{ label: anyLabel, id: "" }];
		return [
			{ label: anyLabel, id: "" },
			...apiObj.data.map((item) => ({
				label:
					key === "year"
						? String(item.year)
						: key === "dealer_name"
						? item.dealer_name
						: item[key] || item.name || item.title,
				id: item.id,
			})),
		];
	};

	const statusOptions = [
		{ label: "Status", id: "" },
		{ label: "Pending", id: "Pending" },
		{ label: "On Sale", id: "On Sale" },
		{ label: "Featured", id: "Featured" },
		{ label: "Sold Car", id: "Sold Car" },
	];

	const [carType, setCarType] = useState(getOptions(carTypes, "Car Type")[0]);
	const [make, setMake] = useState(getOptions(carBrands, "Car Brand")[0]);
	const [body, setBody] = useState(getOptions(bodyTypes, "Body Type")[0]);
	const [fuel, setFuel] = useState(getOptions(fuelTypes, "Fuel Type")[0]);
	const [driveType, setDriveType] = useState(
		getOptions(driveTypes, "Drive Type")[0]
	);
	const [gearType, setGearType] = useState(
		getOptions(gearTypes, "Gear Type")[0]
	);
	const [ownerType, setOwnerType] = useState(
		getOptions(ownerTypes, "Owner Type")[0]
	);
	const [model, setModel] = useState(getOptions(carModels, "Car Model")[0]);
	const [modelYear, setModelYear] = useState(
		getOptions(modelYears, "Model Year", "year")[0]
	);
	const [dealer, setDealer] = useState(
		getOptions(carDealers, "Dealer", "dealer_name")[0]
	);
	const [status, setStatus] = useState(statusOptions[0]);

	const [features, setFeatures] = useState([]);
	const [sortingOption, setSortingOption] = useState("Sort by (Default)");
	const [itemPerPage, setItemPerPage] = useState(6);
	const [currentPage, setCurrentPage] = useState(1);

	const carListRef = useRef(null);

	// Scroll to car list when page changes
	useEffect(() => {
		if (carListRef.current) {
			carListRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}, [currentPage]);

	const updateQueryParam = (key, value) => {
		const params = new URLSearchParams(ParamLocation.search);
		if (value && value !== "") {
			params.set(key, value);
		} else {
			params.delete(key);
		}
		navigate({ search: params.toString() });
	};

	const handleDropdownChange = (setter, key) => (option) => {
		setter(option);
		updateQueryParam(key, option.id);
	};

	const clearFilter = () => {
		setCarType(getOptions(carTypes, "Car Type")[0]);
		setMake(getOptions(carBrands, "Car Brand")[0]);
		setBody(getOptions(bodyTypes, "Body Type")[0]);
		setFuel(getOptions(fuelTypes, "Fuel Type")[0]);
		setDriveType(getOptions(driveTypes, "Drive Type")[0]);
		setGearType(getOptions(gearTypes, "Gear Type")[0]);
		setOwnerType(getOptions(ownerTypes, "Owner Type")[0]);
		setModel(getOptions(carModels, "Car Model")[0]);
		setModelYear(getOptions(modelYears, "Model Year", "year")[0]);
		setDealer(getOptions(carDealers, "Dealer", "dealer_name")[0]);
		setStatus(statusOptions[0]);
		setFeatures([]);
		navigate({ search: "" });
	};

	useEffect(() => {
		const bodyType = queryParams.get("body_type");
		const carTypesParam = queryParams.get("car_type");
		const modelYearParam = queryParams.get("model_year");
		const car_brand = queryParams.get("car_brand");
		const carModel = queryParams.get("car_model");
		const fuelType = queryParams.get("fuel_type");
		const driveTypeParam = queryParams.get("drive_type");
		const gearTypeParam = queryParams.get("gear_type");
		const ownerTypeParam = queryParams.get("owner_type");
		const dealerParam = queryParams.get("dealer");
		const statusParam = queryParams.get("status");

		const params = new URLSearchParams({
			...(bodyType && { body_type: bodyType }),
			...(carTypesParam && { car_type: carTypesParam }),
			...(modelYearParam && { model_year: modelYearParam }),
			...(carModel && { car_model: carModel }),
			...(car_brand && { car_brand }),
			...(fuelType && { fuel_type: fuelType }),
			...(driveTypeParam && { drive_type: driveTypeParam }),
			...(gearTypeParam && { gear_type: gearTypeParam }),
			...(ownerTypeParam && { owner_type: ownerTypeParam }),
			...(dealerParam && { dealer: dealerParam }),
			...(statusParam && { status: statusParam }),
		}).toString();

		const fetchCars = async () => {
			const url = `${config.apiEndpoint}/car-listings/?${params}`;
			setCarsLoading(true);
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("Failed to fetch car listings");
				}
				const data = await response.json();
				setFilteredCars(data.data);
			} catch (error) {
				console.error("Error fetching car listings:", error);
				setFilteredCars([]);
			} finally {
				setCarsLoading(false);
			}
		};

		const findOption = (options, id) =>
			options.find((o) => String(o.id) === String(id)) || options[0];

		// Update dropdowns to match params
		setCarType(findOption(getOptions(carTypes, "Car Type"), carTypesParam));
		setMake(findOption(getOptions(carBrands, "Car Brand"), car_brand));
		setBody(findOption(getOptions(bodyTypes, "Body Type"), bodyType));
		setFuel(findOption(getOptions(fuelTypes, "Fuel Type"), fuelType));
		setDriveType(
			findOption(getOptions(driveTypes, "Drive Type"), driveTypeParam)
		);
		setGearType(findOption(getOptions(gearTypes, "Gear Type"), gearTypeParam));
		setOwnerType(
			findOption(getOptions(ownerTypes, "Owner Type"), ownerTypeParam)
		);
		setModel(findOption(getOptions(carModels, "Car Model"), carModel));
		setModelYear(
			findOption(getOptions(modelYears, "Model Year", "year"), modelYearParam)
		);
		setDealer(
			findOption(getOptions(carDealers, "Dealer", "dealer_name"), dealerParam)
		);
		setStatus(findOption(statusOptions, statusParam));

		fetchCars();
	}, [ParamLocation.search]);

	// Reset to first page when filters or itemPerPage changes
	useEffect(() => {
		setCurrentPage(1);
	}, [itemPerPage, sortingOption, filteredCars]);

	const sorted = React.useMemo(() => {
		if (sortingOption === "Price Ascending") {
			return [...filteredCars].sort(
				(a, b) => a.selling_price - b.selling_price
			);
		}
		if (sortingOption === "Price Descending") {
			return [...filteredCars].sort(
				(a, b) => b.selling_price - a.selling_price
			);
		}
		return filteredCars;
	}, [filteredCars, sortingOption]);

	const pagedCars = sorted.slice(
		(currentPage - 1) * itemPerPage,
		currentPage * itemPerPage
	);

	return (
		<>
			<section className="listing-grid tf-section3 mb-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 flex gap-30 text-start">
							<div className="sidebar-right-listing style-2">
								<div className="sidebar-title flex-two flex-wrap">
									<h4>Filters and Sort</h4>
									<a
										className="fw-5 font claer text-color-2"
										onClick={clearFilter}
									>
										<i className="icon-autodeal-plus" />
										Clear
									</a>
								</div>
								<div className="form-filter-siderbar">
									<form onSubmit={(e) => e.preventDefault()}>
										<div className="wd-find-select">
											<div
												className={`form-group${carType.id ? " selected" : ""}`}
											>
												<DropdownSelect
													selectedValue={carType.label}
													onChange={(label) => {
														const option = getOptions(
															carTypes,
															"Car Type"
														).find((o) => o.label === label);
														handleDropdownChange(
															setCarType,
															"car_type"
														)(option);
													}}
													options={getOptions(carTypes, "Car Type").map(
														(o) => o.label
													)}
												/>
											</div>
											<div
												className={`form-group${make.id ? " selected" : ""}`}
											>
												<DropdownSelect
													selectedValue={make.label}
													onChange={(label) => {
														const option = getOptions(
															carBrands,
															"Car Brand"
														).find((o) => o.label === label);
														handleDropdownChange(setMake, "car_brand")(option);
													}}
													options={getOptions(carBrands, "Car Brand").map(
														(o) => o.label
													)}
												/>
											</div>
											<div
												className={`form-group${body.id ? " selected" : ""}`}
											>
												<DropdownSelect
													selectedValue={body.label}
													onChange={(label) => {
														const option = getOptions(
															bodyTypes,
															"Body Type"
														).find((o) => o.label === label);
														handleDropdownChange(setBody, "body_type")(option);
													}}
													options={getOptions(bodyTypes, "Body Type").map(
														(o) => o.label
													)}
												/>
											</div>
											<div
												className={`form-group${fuel.id ? " selected" : ""}`}
											>
												<DropdownSelect
													selectedValue={fuel.label}
													onChange={(label) => {
														const option = getOptions(
															fuelTypes,
															"Fuel Type"
														).find((o) => o.label === label);
														handleDropdownChange(setFuel, "fuel_type")(option);
													}}
													options={getOptions(fuelTypes, "Fuel Type").map(
														(o) => o.label
													)}
												/>
											</div>
											<div
												className={`form-group${
													driveType.id ? " selected" : ""
												}`}
											>
												<DropdownSelect
													selectedValue={driveType.label}
													onChange={(label) => {
														const option = getOptions(
															driveTypes,
															"Drive Type"
														).find((o) => o.label === label);
														handleDropdownChange(
															setDriveType,
															"drive_type"
														)(option);
													}}
													options={getOptions(driveTypes, "Drive Type").map(
														(o) => o.label
													)}
												/>
											</div>
											<div
												className={`form-group${
													gearType.id ? " selected" : ""
												}`}
											>
												<DropdownSelect
													selectedValue={gearType.label}
													onChange={(label) => {
														const option = getOptions(
															gearTypes,
															"Gear Type"
														).find((o) => o.label === label);
														handleDropdownChange(
															setGearType,
															"gear_type"
														)(option);
													}}
													options={getOptions(gearTypes, "Gear Type").map(
														(o) => o.label
													)}
												/>
											</div>
											<div
												className={`form-group${
													ownerType.id ? " selected" : ""
												}`}
											>
												<DropdownSelect
													selectedValue={ownerType.label}
													onChange={(label) => {
														const option = getOptions(
															ownerTypes,
															"Owner Type"
														).find((o) => o.label === label);
														handleDropdownChange(
															setOwnerType,
															"owner_type"
														)(option);
													}}
													options={getOptions(ownerTypes, "Owner Type").map(
														(o) => o.label
													)}
												/>
											</div>
											<div
												className={`form-group${model.id ? " selected" : ""}`}
											>
												<DropdownSelect
													selectedValue={model.label}
													onChange={(label) => {
														const option = getOptions(
															carModels,
															"Car Model"
														).find((o) => o.label === label);
														handleDropdownChange(setModel, "car_model")(option);
													}}
													options={getOptions(carModels, "Car Model").map(
														(o) => o.label
													)}
												/>
											</div>
											<div
												className={`form-group${
													modelYear.id ? " selected" : ""
												}`}
											>
												<DropdownSelect
													selectedValue={modelYear.label}
													onChange={(label) => {
														const option = getOptions(
															modelYears,
															"Model Year",
															"year"
														).find((o) => o.label === label);
														handleDropdownChange(
															setModelYear,
															"model_year"
														)(option);
													}}
													options={getOptions(
														modelYears,
														"Model Year",
														"year"
													).map((o) => o.label)}
												/>
											</div>
											<div
												className={`form-group${dealer.id ? " selected" : ""}`}
											>
												<DropdownSelect
													selectedValue={dealer.label}
													onChange={(label) => {
														const option = getOptions(
															carDealers,
															"Dealer",
															"name"
														).find((o) => o.label === label);
														handleDropdownChange(setDealer, "dealer")(option);
													}}
													options={getOptions(carDealers, "Dealer", "name").map(
														(o) => o.label
													)}
												/>
											</div>
											<div
												className={`form-group${status.id ? " selected" : ""}`}
											>
												<DropdownSelect
													selectedValue={status.label}
													onChange={(label) => {
														const option = statusOptions.find(
															(o) => o.label === label
														);
														handleDropdownChange(setStatus, "status")(option);
													}}
													options={statusOptions.map((o) => o.label)}
												/>
											</div>
										</div>
									</form>
								</div>
							</div>
							<div className="sidebar-left-listing">
								<div className="row">
									<div className="col-lg-12 listing-list-car-wrap">
										<div className="category-filter flex justify-space align-center mb-30 flex-wrap gap-8">
											<div className="box-1 flex align-center flex-wrap gap-8">
												<p className="">
													{" "}
													{sorted.length ? (
														<>
															Showing {(currentPage - 1) * itemPerPage + 1} -{" "}
															{Math.min(
																currentPage * itemPerPage,
																sorted.length
															)}{" "}
															Of {sorted.length} results{" "}
														</>
													) : (
														"No results found. Please try another filter"
													)}
												</p>
												<div className="filter-mobie">
													<a
														data-bs-toggle="offcanvas"
														data-bs-target="#offcanvasRight"
														aria-controls="offcanvasRight"
														className="filter"
													>
														Filter
														<i className="icon-autodeal-filter" />
													</a>
												</div>
											</div>
											<div className="box-2 flex flex-wrap gap-8">
												<div className="wd-find-select flex gap-8">
													<div className="group-select">
														<DropdownSelect
															selectedValue={`Show: ${itemPerPage}`}
															onChange={(value) => {
																const match = value.match(/\d+/);
																if (match) {
																	setItemPerPage(parseInt(match[0], 10));
																}
															}}
															addtionalParentClass="list-page"
															options={["Show: 6", "Show: 9", "Show: 12"]}
														/>
													</div>
													<div className="group-select">
														<DropdownSelect
															selectedValue={sortingOption}
															onChange={setSortingOption}
															addtionalParentClass="list-sort"
															options={[
																"Sort by (Default)",
																"Price Ascending",
																"Price Descending",
															]}
														/>
													</div>
												</div>
											</div>
										</div>

										<div className="content-tab">
											<div className="content-inner tab-content">
												<div
													ref={carListRef}
													className="list-car-grid-4-2 gap-30"
												>
													{carsLoading ? (
														<div
															className="d-flex justify-content-center align-items-center"
															style={{ minHeight: 200 }}
														>
															<span>Loading cars...</span>
														</div>
													) : (
														pagedCars.map((car, index) => {
															const getStatusFlag = (status) => {
																switch (status) {
																	case "Sold Car":
																		return "flag-tag-success";
																	case "Pending":
																		return "flag-tag-warning";
																	case "Featured":
																		return "flag-tag-featured";
																	case "On Sale":
																		return "flag-tag success";
																	default:
																		return "flag-tag success";
																}
															};
															const statusFlag = getStatusFlag(car.status);

															return (
																<div
																	key={index}
																	className="box-car-list hv-one"
																>
																	<div className="image-group relative">
																		<div className="top flex-two">
																			<ul className="d-flex gap-8">
																				<li className={statusFlag}>
																					{car?.status}
																				</li>
																				<li className="flag-tag style-1">
																					<div className="icon">
																						<svg
																							width={16}
																							height={13}
																							viewBox="0 0 16 13"
																							fill="none"
																							xmlns="http://www.w3.org/2000/svg"
																						>
																							<path
																								d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
																								stroke="white"
																								strokeWidth="1.5"
																								strokeLinecap="round"
																								strokeLinejoin="round"
																							/>
																						</svg>
																					</div>
																					{car?.total_images}
																				</li>
																			</ul>
																			<div className={statusFlag}>
																				{car?.model_year?.year}
																			</div>
																		</div>

																		<div className="img-style">
																			<img
																				className="lazyload"
																				alt="image"
																				src={car?.featured_image?.image_url}
																			/>
																		</div>
																	</div>
																	<div className="content">
																		<div className="text-address">
																			<p className="text-color-3 font">
																				{car?.body_type?.title}
																			</p>
																		</div>
																		<h5 className="link-style-1">
																			<Link to={`/car-details/${car?.slug}`}>
																				{car?.title}
																			</Link>
																		</h5>
																		<div className="icon-box flex flex-wrap">
																			<div className="icons flex-three">
																				<i className="icon-autodeal-km1" />
																				<span>{car.mileage} kms</span>
																			</div>
																			<div className="icons flex-three">
																				<i className="icon-autodeal-diesel" />
																				<span>{car?.fuel_type?.title}</span>
																			</div>
																			<div className="icons flex-three">
																				<i className="icon-autodeal-automatic" />
																				<span>{car?.gear_type?.title}</span>
																			</div>
																		</div>
																		<div className="money fs-20 fw-5 lh-25 text-color-3">
																			$
																			{parseFloat(
																				car.selling_price
																			).toLocaleString()}
																		</div>
																	</div>
																</div>
															);
														})
													)}
												</div>
											</div>
										</div>
										<div className="d-flex justify-content-center my-4">
											<div className="themesflat-pagination clearfix mt-40">
												<ul>
													<Pagination
														currentPage={currentPage}
														setPage={setCurrentPage}
														itemLength={sorted.length}
														itemPerPage={itemPerPage}
													/>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
