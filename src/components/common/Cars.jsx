import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "@/providers/ApiProvider";
import StarRating from "./StarRating";
import CarReviewModal from "./CarReviewModal";

export default function Cars({ parentClass = "tf-section" }) {
	const { carListings, bodyTypes } = useApi();
	const { data } = carListings;
	const { data: bodyTypeData } = bodyTypes;

	const [selectedType, setSelectedType] = useState("All");
	const [filtered, setFiltered] = useState([]);
	const [selectedCarForReview, setSelectedCarForReview] = useState(null);

	useEffect(() => {
		if (!data || !Array.isArray(data)) return;

		const mappedData = data
			.filter((item) => item.status === "On Sale")
			.map(
				(item) =>
					console.log("filterred item", item) || {
						id: item.id || "",
						imgSrc: item.featured_image?.image_url || "",
						title: item.title || "",
						type: item.body_type?.title || "",
						model: item.slug || "",
						km: item.mileage || 0,
						fuelType: item.fuel_type?.title || "",
						transmission: item.gear_type?.title || "",
						price: item.selling_price || "0.00",
						year: item.model_year?.year || "",
						totalImage: item.total_images || 0,
						carStatus: item.status || "Featured",
						rating: item.average_rating || 4.2, // Mock data - replace with actual
						totalReviews: item.total_reviews || 0, // Mock data - replace with actual
					}
			);
		setFiltered(mappedData);
	}, [data]);

	// Filter by selected car type
	useEffect(() => {
		if (!data || !Array.isArray(data)) return;

		const newData = data.filter((item) => item.status === "On Sale");
		console.log("newData", newData);
		const filteredData =
			selectedType === "All"
				? newData
				: newData.filter((item) => item.body_type?.title === selectedType);
		console.log("filteredData", filteredData);
		const mappedFiltered = filteredData.map((item) => ({
			id: item.id || "",
			imgSrc: item.featured_image?.image_url || "",
			title: item.title || "",
			type: item.body_type?.title || "",
			model: item.slug || "",
			km: item.mileage || 0,
			fuelType: item.fuel_type?.title || "",
			transmission: item.gear_type?.title || "",
			price: item.selling_price || "0.00",
			year: item.model_year?.year || "",
			totalImage: item.total_images || 0,
			carStatus: item.status || "Featured",
			rating: item.average_rating || 4.2, // Mock data - replace with actual
			totalReviews: item.total_reviews || 0, // Mock data - replace with actual
		}));
		setFiltered(mappedFiltered);
	}, [selectedType, data]);

	return (
		<section className={parentClass}>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="flex justify-space px-4">
							<h2
								className="wow fadeInUpSmall"
								data-wow-delay="0.2s"
								data-wow-duration="1000ms"
							>
								Cars By Body Type{" "}
								<span className="badge badge-primary ms-2">On Sale</span>
							</h2>
							<div className="flex-six gap-20 flex-wrap">
								<a
									href="car-list/?status=On Sale"
									className="tf-btn-arrow wow fadeInUpSmall"
									data-wow-delay="0.4s"
									data-wow-duration="1000ms"
								>
									View all
									<i className="icon-autodeal-btn-right" />
								</a>
							</div>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="flat-tabs">
							<ul className="tab-title style my-5 d-flex justify-content-center">
								<li
									onClick={() => setSelectedType("All")}
									className={`item-title ${
										selectedType === "All" ? "active" : ""
									}`}
								>
									<h5 className="inner">All</h5>
								</li>
								{bodyTypeData?.slice(0, 8)?.map((car, index) => (
									<>
										<li
											key={index}
											onClick={() => setSelectedType(car.title)}
											className={`item-title ${
												selectedType === car.title ? "active" : ""
											}`}
										>
											<h5 className="inner">{car.title}</h5>
										</li>
									</>
								))}
							</ul>
							<div className="content-tab">
								<div className="content-inner tab-content">
									<div className="list-car-grid-4 gap-30">
										{filtered.length === 0 && (
											<div className="text-center">
												<p className="text-color-3">
													No cars found for this body type.
												</p>
											</div>
										)}
										{filtered.length > 0 &&
											filtered.slice(0, 8).map((car, index) => (
												<div key={index} className="box-car-list hv-one">
													<div className="image-group relative">
														<div className="top flex-two">
															<ul className="d-flex gap-8">
																<li className="flag-tag success">
																	{car.carStatus}
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
																	{car.totalImage}
																</li>
															</ul>
															<div className="year flag-tag">{car.year}</div>
														</div>

														<div className="img-style">
															<img
																className="lazyload"
																alt="image"
																src={car.imgSrc}
															/>
														</div>
													</div>
													<div className="content">
														<div className="text-address">
															<p className="text-color-3 font">{car.type}</p>
														</div>
														<h5 className="link-style-1">
															<Link to={`/car-details/${car.model}`}>
																{car.title}
															</Link>
														</h5>

														{/* Star Rating */}
														<div className="my-2">
															<StarRating
																rating={car.rating}
																showRating={true}
																totalReviews={car.totalReviews}
																size={14}
															/>
														</div>

														<div className="icon-box flex flex-wrap">
															<div className="icons flex-three">
																<i className="icon-autodeal-km1" />
																<span>{car.km} kms</span>
															</div>
															<div className="icons flex-three">
																<i className="icon-autodeal-diesel" />
																<span>{car.fuelType}</span>
															</div>
															<div className="icons flex-three">
																<i className="icon-autodeal-automatic" />
																<span>{car.transmission}</span>
															</div>
														</div>

														<div className="d-flex justify-content-between align-items-center mt-3">
															<div className="money fs-20 fw-5 lh-25 text-color-3">
																${car.price}
															</div>
															<button
																className="btn btn-sm btn-outline-primary"
																data-bs-toggle="modal"
																data-bs-target={`#reviewModal-${car.id}`}
																onClick={() => setSelectedCarForReview(car)}
															>
																<i className="fas fa-star me-1"></i>
																Rate
															</button>
														</div>
													</div>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Review Modal */}
			{selectedCarForReview && (
				<CarReviewModal
					carId={selectedCarForReview.id}
					carTitle={selectedCarForReview.title}
					onReviewSubmitted={() => {
						// Optionally refresh reviews here
						console.log("Review submitted for:", selectedCarForReview.title);
					}}
				/>
			)}
		</section>
	);
}
